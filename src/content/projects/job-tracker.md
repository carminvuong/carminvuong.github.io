---
title: Job Tracker
stack: [TypeScript, Next.js, PostgreSQL, Drizzle ORM, Tailwind]
order: 2
year: "2026"
featured: false
summary: >
  A minimal application tracker I built because I was losing track of what I had applied
  for, and every free tool I tried had too much going on. Paste a job posting link and it
  reads the page's structured data to fill in the company, role and location; the rest is
  a status pipeline and deadlines that turn colour before they bite.
repo: https://github.com/carminvuong/job_tracker
demo: https://job-tracker-demo-rho.vercel.app/
---

## Why

I was applying to enough internships that I stopped being able to answer basic questions
about my own applications — which ones had an OA waiting, what I had already heard back
on, which deadline was closest. The free trackers I tried all solved that by adding
features, which is the opposite of what I wanted from something I would open ten times a
week.

So the design constraint was subtraction: one table, one row per application, and nothing
on screen that I would not read.

## URL autofill

Typing out company, role and location for every application is the friction that makes
people stop using a tracker. The fix is that most job boards already publish the data.

Greenhouse, Lever, Workday and the rest embed a JSON-LD `JobPosting` block in the page —
a schema.org structure with the company, title and location already parsed. So pasting a
link fetches the posting, reads that block, and fills the row in.

Not every posting has one, so there is a fallback: if the structured data is missing or
malformed, it parses what it can from the page title rather than failing and handing back
an empty form. A tracker that occasionally guesses wrong is still faster than one that
makes you type.

## Status and deadlines

Applications move through Applied → OA → OA Done → Interview → Interview Done → Offer or
Rejected, changed inline from the table rather than through a detail page.

Deadlines only attach at the stages where they actually exist — an OA or an interview —
and they are colour-coded: amber within three days, red once overdue. That is the whole
feature, and it is the one that has saved me. A date in a table is easy to skim past; a
red date is not.

Search runs across company, role, location and notes together, with a status filter on
top of it.

## Stack

Next.js on the App Router with TypeScript, Drizzle ORM against a Neon Postgres database,
Tailwind and shadcn/ui for the interface, deployed on Vercel.

The [live demo](https://job-tracker-demo-rho.vercel.app/) needs no login. It is seeded
with sample data and read-only — edits, adds and deletes show a toast instead of writing
anything — so the demo cannot be filled with junk by whoever finds it.
