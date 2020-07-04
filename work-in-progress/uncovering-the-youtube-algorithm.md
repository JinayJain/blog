---
title: Uncovering the YouTube Algorithm
author: Jinay Jain
description: A review of the 2016 paper "Deep Neural Networks for YouTube Recommendations."
date: 1592426364
---

# TODO https://www.youtube.com/watch?v=WK_Nr4tUtl8

It seems that every day YouTubers are seen employing new methods to push
their videos to new audiences and beat this elusive "YouTube algorithm."
Common strategies include clickbait titles, obnoxious thumbnails, longer
videos, and other ventures into the dark arts---each a new attempt to get
their video into the "Recommended" section of the site. While content
creators chase the algorithm, the algorithm chases the users, leaving very
few satisfied in their pursuit of YouTube glory. [This video from the channel
Veritasium](https://www.youtube.com/watch?v=fHsa9DqmId8) dives deeper into
this vicious cycle, explaining why many creators lose sight of their
audiences and "burnout."

From an AI perspective, the YouTube ecosystem demonstrates a classic problem
in [online machine
learning](https://en.wikipedia.org/wiki/Online_machine_learning): how can a
model be trained to fit an unstable dataset? Furthermore, how can content
creators optimize their performance on the ever-changing YouTube algorithm?
Though it is impossible to understand the specifics of the algorithm before
solving the black-box problem of neural networks, I believe knowing at least
a few key aspects of how the algorithm was designed can go a long way in
maximizing success on the platform.

In this post, I hope to unpack the 2016 paper that outlined YouTube's
strategy for a large-scale recommendation system, "Deep Neural Networks for
YouTube Recommendations." I encourage you to at least skim some of the key
sections of the paper to give context to the rest of this post in the
authors' own words.

You can find the paper in PDF form
[here](https://research.google/pubs/pub45530/).

# Recommender Systems

Recommender systems, even without the convenience of neural networks, are powerful tools for increasing user engagement in highly personalized applications.
