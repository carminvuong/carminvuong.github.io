---
title: Tennis Versus
stack: [Python, Next.js, scikit-learn, XGBoost, FastAPI, pandas]
order: 1
year: "2026"
featured: true
summary: >
  An end-to-end pipeline that predicts cross-era ATP match outcomes. I collected and cleaned the
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

## The problem

Tennis is a good prediction target and a hard one. Every match is a clean binary outcome
with no draws, and the tour produces thousands of labelled examples a year. But ranking
alone is a weak signal — the ATP ranking is a rolling 52-week points total, not a strength
estimate, and it says nothing about whether a player's points were earned on the surface
they are about to play on.

The goal was a model that beats ranking-difference as a baseline, and holds up against a
public benchmark: IBM SlamTracker, which publishes win probabilities during Wimbledon.

## Data

The training set is the TennisMyLife archive — over 50,000 ATP matches spanning more than
thirty-five years. Raw match records need real cleaning before they are usable: player names
change transliteration between eras, retirements and walkovers have to be separated from
completed matches, and tournament surface labels are inconsistent across decades.

## Features

I engineered more than ten features, built to capture the things a ranking number throws
away:

- **Surface-specific win rates.** A player's record on grass is a different quantity from
  their record overall, and Wimbledon is the only grass major.
- **Recent form.** Rolling win rates over recent windows, so a player mid-hot-streak is
  distinguishable from one coasting on last season's points.
- **Head-to-head history.** Some matchups are stylistically lopsided in ways neither
  player's general record reflects.

## Validation

The failure mode that quietly ruins sports models is leakage: shuffle the matches, split
randomly, and you train on 2024 to predict 2019. The model looks excellent and is worth
nothing.

So every fold is chronological. The model trains on matches strictly before the validation
window and is tested forward in time, which is the only split that matches how the model
would actually be used — you never know the future when the match starts.

## Results

**63% on Wimbledon 2026**, level with IBM SlamTracker's published predictions for the same
draw, and **71% across general ATP matches**. The gap between the two is the interesting
part: Wimbledon is harder than the tour average, because a Grand Slam draw concentrates
evenly-matched players and best-of-five reduces the variance that helps an underdog steal
a short match.

## The app

The model sits behind a web app: pick two players, optionally a date for each, pick a
surface, and get a win probability for both sides.

The dates are the part worth playing with. Player stats live in a point-in-time snapshot
table — one row per player per tracked match, 1991 to now — so a player isn't one thing to
the model, they're a different feature vector on every date they played. Ask for peak
Federer against current Sinner and the backend resolves each side's Elo, recent form and
break-point pressure as of the date you named, then builds the feature vector from those.
Leave the dates off and you get today's version of both players.

A second page plots a player's Elo across their whole tracked career, overall and split by
surface, with each series' peak marked. It is the honest view of what the model is working
from — you can see a player's grass rating peak two years off their hard-court peak, which
is exactly the kind of thing a single ranking number hides.

FastAPI on Render serves the model, a Supabase Postgres database holds the ratings
history, and the frontend is Next.js.
