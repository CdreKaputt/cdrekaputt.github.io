---
title: Mailpit Testing and Email Templates
excerpt: I didn’t make as much progress last week as I did the week before, but I was able to get the basic notifications package implemented. For now...
date: 2026-11-12
author: aaron
tags: [overview]
---
## What did I do last week?
Last week, I continued troubleshooting the issues I was having with SMTP and was able to work out the issues I had with Mailpit, thanks in no small part to Dr. Guinn's comment on last week's post. I was using the "--smtp-require-tls" flag since that was what the recommended in their docs, but did not realise it was related to the issues I was having with STARTTLS testing. Since Cloudflare does not use STARTTLS, it isn't really an issue for my intended use case, but it's good to know and would likely come up if I ever need to send emails through another service other than Cloudflare. With that worked out, I continued work on the email template that will be used when sending notifications to clients. That's now working and I'm able to send fully formatted emails with all submission data included using Mailpit.

## My plan for this week
This week, I will start working on the final Cloudflare integration built to satisfy the sender interface. I'm hoping that all goes smoothly since it will be the last major step in this process. Once that is completed, the entire system will be fully functional, and I can start working on a small demo for the final report.

## Impediments and blockers
I don't have any big blockers this week and I don't anticipate any blockers for the last few steps this month. It should be smooth sailing from here.

## Reflection
Reflecting back on the last few weeks, the work I've done on the SMTP integration has been the most documentation and research heavy stage of this whole project, and I definitely noticed my motivation waning throughout that time. I've been combating that by switching over to other small projects from time to time to keep things interesting, before jumping back to the slower work of research and troubleshooting. SMTP can be a bit of a confusing protocol to understand so it's been quite a learning process.
