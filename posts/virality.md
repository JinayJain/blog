---
title: How My Toy Project Turned Into a Viral Challenge
description: Scaling a toy project about time perception from 0 to 80k requests in a day.
author: Jinay Jain
date: 1637703320
hidden: true
---

If you're curious to see how well you can estimate a minute, try out [Just a Minute](https://jinay.dev/just-a-minute/) for yourself.

Late last year, I was brainstorming ideas with my team for a hackathon project that could be made in less than 24 hours. One such idea I had was to build a web experiment that tests how people perceive time. In hindsight, the idea was so simple that it would be overkill to use a team of 4 people to build it in 24 hours. We ended up pursuing a different, more technically complex project, but I still kept my original idea in mind.

A few weeks later, I had some spare time and wanted to build a quick weekend project, so I went back to that hackathon idea and built a simple page that asked users to estimate how long a minute is. I deployed it to GitHub Pages and shared it with a few close friends to try out. All in all, the implementation took less than a day to complete.

And that was it---I left the website up and moved on to my next project.

# The Revival

After a year of no updates, I decided to revisit the site and add another feature: a live histogram of estimates as they came in. To avoid the hassle of setting up my own backend server, I used the [Firebase Realtime Database](https://firebase.google.com/docs/database) as a quick solution to store the data. This would allow me to do simple reads and writes to the database without having to write a custom server API. The per-GB pricing for Firebase was comparatively expensive to other options---but I was never going to exceed the free tier limits, right?

Every time someone completed an attempt, I would write a new entry with their time to the database. The database would return **all times** back to the client, which I then used to build a histogram with the [Chart.js](https://www.chartjs.org/) library. Computing the histogram values was all done on the client, so the database's only responsibility was to store the data and return it to the client.

## False Starts

With this new feature implemented, I had to find people to populate the histogram with their own attempts. I enlisted the help of other computer science majors at my university, who provided a good initial dataset. I also received some help from a more experienced Firebase user, who helped me establish a ruleset that was more strict than the very dangerous default:

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

All in all, this beta test with fellow students was a successful test of the new feature. People seemed to enjoy it and I was able to get a good idea of how the data would look. Then, I turned to Hacker News to reach a larger audience (and hopefully reach the front page). I [posted](https://news.ycombinator.com/item?id=29288785) the project as a Show HN, but it didn't achieve the success I had hoped for. What I did learn, however, was the importance of supporting mobile devices, since 3 of the 5 comments complained about the lack of mobile support. Up until now, I was satisfied with the 100 or so data points I was able to collect.

# r/InternetIsBeautiful
