---
title: Tennis Versus
stack: [Python, Next.js, scikit-learn, XGBoost, FastAPI, pandas]
order: 1
year: "2026"
featured: true
summary: >
  An end-to-end pipeline that predicts cross-era ATP tennis match outcomes. I collected and cleaned the
  TennisMyLife archive (~35 years of matches, more than 50k entries) then
  engineered surface-specific win rates, recent form and ELO into an
  XGBoost classifier.
repo: https://github.com/carminvuong/tennis_versus
demo: https://tennis-versus.vercel.app/
metrics:
  - value: "63"
    unit: "%"
    label: Wimbledon 2026 accuracy
    # note: Level with IBM SlamTracker
  - value: "71"
    unit: "%"
    label: General ATP matches
    # note: Across held-out seasons
  - value: "50k"
    unit: "+"
    label: Matches in training set
    # note: Three and a half decades
  - value: "10"
    unit: "+"
    label: Features engineered
    # note: Surface, form, Elo
---

## Why?

Man, I love tennis. It all started when I was curious one day and decided to 
read the Wikipedia on [the Big Three](https://en.wikipedia.org/wiki/Big_Three_(tennis)) consisting of Novak Djokovic, Roger Federer, and Rafael Nadal. These 3 dominated tennis for the better part of 20 years, which is crazy. Now, as they have gotten older, we have a new generation of tennis players, with players like Carlos Alcaraz and Jannik Sinner leading the way. Ok, back to the
project itself, I was going to get too carried away...

This initially started as just a way to predict Wimbledon 2026 matches. But, like all other fans, I wanted to find out what would happen if two players in different eras (ex. [Federer 2006](https://en.wikipedia.org/wiki/2006_Roger_Federer_tennis_season) vs. [Sinner 2024](https://en.wikipedia.org/wiki/2024_Jannik_Sinner_tennis_season)) faced off. Now, obviously, this question is impossible to answer. I've already detailed this in a disclaimer on the actual web page. But still, it'd be fun to see.


Tennis is both quite easy and quite difficult to predict. On one hand, if you choose the higher ranked player, you'd already be right ~63% of the time. On the other hand, tennis is a sport full of upsets - one bad day, and the world number 1 can lose to the number 200.

## Goal

Ranking alone is a weak signal: the ATP ranking is a rolling 52-week points total, not a strength
estimate, and it says nothing about whether a player's points were earned on the surface
they are about to play on.

The goal was a model that beats naive ranking difference as a baseline, and holds up against a
public benchmark: the IBM SlamTracker, which publishes win probabilities during Wimbledon.

After that, it's more exploratory. Use the same model but expand the capabilities to be able to take in 2 players from different eras.

## Data

Everything comes from the [TennisMyLife](https://stats.tennismylife.org/tennis-match-database) archives. I love them. They have records of matches dating back to 1969, and it's still being updated with tournaments today. 

For this project, I used matches from __1991 - Current__, because matches before 1991 simply had no shot-level statistics (serve, break points, etc.)
Raw match records need cleaning before they are usable: some tournaments have null records, retirements and walkovers have to be separated from
completed matches, and tournament surface labels are inconsistent across decades.

## Features

I engineered more than ten features, built to capture more than a ranking.
Here are some:

- **Surface-specific win rates.** A player's record on grass is a d ifferent quantity from
  their record on clay or their record overall. Surface matters a lot.
- **Recent form.** Rolling win rates over last 10 matches. Players get hot sometimes, and that matters. Momentum is a huge thing in tennis.

<aside class="sidenote">Elo was originally designed for chess, but I am stealing it to use for tennis. It works remarkably well!</aside>

- **[Elo](https://en.wikipedia.org/wiki/Elo_rating_system).** The feature that proved to be the biggest factor. A rating that changes after every result, so beating someone strong is worth more
  than beating someone weak. A strength estimate rather than a points total. Everyone
  starts at 1500, and I keep a separate rating per surface. It updates match by match, which means I can keep track what a
  player's Elo was on any date, not just currently (very interesting to look at!).

## Training

My exploration happened in Jupyter notebooks — I documented my whole process in separate notebooks. Logistic regression first, and then XGBoost, and the
finding that Elo pretty much trumped everything else I threw at it.

The window is deliberately narrow: it fits on matches from 2023 onward, with Elo burn-in
from 2017. The burn-in is the part that matters. Everyone starts at 1500, and a rating
needs matches behind it before it means anything. Training the model on ratings that haven't converged yet is just a recipe for disaster.



## Validation

It's important to prevent data leakage. A standard shuffling of the matches, split
randomly, and you end up training on 2023 to predict 2021. The model accessed future information to predict past matches. Uh oh!

So every step is chronological. The model trains on matches strictly before the validation
window and is tested forward in time.

The database is also built to the same rule. Every row in the ratings table holds a player's
stats immediately before a given match and never the result of it, so a point-in-time
query cannot accidentally see the outcome it is being asked to predict.

## Results

<aside class="sidenote">I actually sifted through every single Wimbldedon 2026 match, to find out the IBM SlamTracker prediction, so I could compare that with my model.</aside>

**63% on Wimbledon 2026**, level with IBM SlamTracker's published predictions for the same
draw.


**71% across general ATP matches**. I guess Wimbledon just had a lot of upsets.

## The app

The model sits behind a web app: pick two players, optionally a date for each, pick a
surface, and get a win probability for both sides.

The dates are the part worth playing with. Player stats live in a point-in-time snapshot
table: one row per player per tracked match, 1991 to now. 

For example, ask for peak
Federer against current Sinner and the backend takes each side's Elo, recent form and
break-point pressure as of the date you named, then builds the feature vector from those.
Leave the dates off and you get today's version (or most recent version) of both players.

<aside class="sidenote">Djokovic 2015-2016 had the highest overall peak ELO, at 2577 (holding all 4 majors and multiple Master 1000s). Nadal's clay Elo peaked in 2009, at 2516 (riding a 4 year winning streak at Roland Garros).</aside>

There's also a page that plots a player's Elo across their whole tracked career, overall and split by
surface, with each series' peak marked. This is purely just for fun. I just wanted to see when a player peaked in their career, and how did that compare with other player's peaks.

FastAPI on Render serves the model (sometimes takes a while to boot up), a Supabase Postgres database holds the ratings
history, and the frontend is Next.js.
