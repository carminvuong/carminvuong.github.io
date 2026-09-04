---
title: Foo Food Fighters
stack: [TypeScript, Flask, TensorFlow]
order: 2
year: "2025"
summary: >
  A TensorFlow MobileNet model served behind a Flask API that classifies food from a
  photograph and estimates its nutritional values. The vision path runs fast enough for
  live recognition, so the camera feed itself becomes the input — point it at a plate and
  get an answer back.
repo: https://github.com/YOUR-GITHUB-USERNAME/foo-food-fighters
---

## The idea

Logging what you eat is tedious enough that most people stop. The friction isn't the
tracking, it's the typing — searching a database for "medium banana" every time. If a
camera can name the food, the entry cost drops to pointing at it.

## How it works

A TensorFlow MobileNet model handles classification, chosen for the reason MobileNet
usually is: it is small and fast enough to keep latency low without a GPU behind it. The
model is served through a Flask API, which takes an image, returns a predicted food class,
and maps that class to estimated nutritional values.

The TypeScript front end passes frames to the API continuously rather than making the user
take and confirm a photo, so recognition happens live — the label updates as you move the
camera.

## What I took from it

Most of the work was not the model. It was the boundary around it: keeping request sizes
small enough that continuous inference stayed responsive, and deciding what the interface
should do when the classifier is uncertain — because a confident wrong label is worse than
an honest "not sure."
