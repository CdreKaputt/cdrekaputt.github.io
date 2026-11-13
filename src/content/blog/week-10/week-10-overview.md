---
title: Implementing SMTP
excerpt: Last week I continued work on the notifier package of my Go service, specifically the SMTP protocol layer, but I ran into some significant issues with the implementation side...
date: 2026-11-05
author: aaron
tags: [overview]
---
## What did I do last week?
Last week I continued work on the notifier package of my Go service, specifically the SMTP protocol layer, but I ran into some significant issues with the implementation side, specifically with the use of Mailpit for testing. Most modern SMTP services require TLS level encryption on all email requests, but I've had trouble configuring that to work with both Mailpit and Cloudflare SMTP service. Originally I wanted to stick to using only Go's own internal libraries for this project, but I found that the SMTP protocol implementation work is still a bit over my head and probably a rabbit hole that I won't have time to go down if I still want to get this project done in time. Instead, I opted to use a third party library for email handling called "go-mail." While it's not part of the standard library, it's pretty popular and actively maintained, so I felt that it was a good alternative option to my original plan. I was able to get that implemented and working with Mailpit, and I can now send extremely basic test emails.

## My plan for this week
Next week, I plan to further expand on the email templates and SMTP options so that I can generate and send fully formatted and styled email notifications. Once that's complete, I will move on to implementing the Cloudflare email service on top of the notifier interface and see if I can get the entire system running from incoming form submission all the way to successful email notifications.

## Impediments and blockers
Now that the SMTP library issues have been sorted out, I don't have an really blockers in my way that would prevent me from finishing the notifier portion of this project. That said, I have a big project milestone due this week in another class and some personal freelance work that I need to wrap up, so I may not have as much time this week. Since we're getting close to the end of the semester, I'll have to make up for that lost time next week.
