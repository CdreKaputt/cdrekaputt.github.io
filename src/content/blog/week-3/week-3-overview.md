---
title: New Project Plans and Direction
excerpt: Last week I was unable to work on my project proposal or site much due to a work emergency that went on for a few days...
date: 2026-09-14
author: aaron
tags: [overview]
---
## What did I do last week?
Last week I was unable to work on my project proposal or site much due to a work emergency that went on for a few days, but the bright side is that it gave me some really good ideas for what I want to do for this project. At my job, I'm responsible for hosting over 200 old WordPress sites and most of them have contact forms that use a service called SendGrid for SMTP (Simple Mail Transfer Protocol). One of those sites was hacked last week (admin account logins where leaked and a bot gained access, installed a hidden plugin, and pulled database data) and the sites SendGrid API key was exposed. They used that key to send 3,000 spam emails in 1 hour before our account was preemptively suspended. What resulted was 5 days of constant back and forth with support and manually swapping out dozens of keys all while clients waited for leads. 

### Motivation
I've never been a fan of how we managed site access and form handling, but this was the last straw for me. I won't be able to convince my boss it's worth reworking the system, but I've started my own freelance hosting and web development on the side and I think this project would be a good excuse to build a more secure and maintainable form handling service. 

## New Plan
I will have more details in my full proposal, but the idea is to build a form service that takes incoming submissions from all sites that I host via a Cloudflare worker. The Cloudflare worker is a serverless instance that has it's own endpoint on the websites domain. Something like example.biz/api/contact. It can enforce CORS and ensure submissions come from the proper client, apply a Cloudflare Turnstile CAPTCHA for bot detection, and provide a spam score based on the form contents. Assuming it's not flagged as spam, the form is passed on to the centralized form handling service along with a unique key - this key is not set by the clients or tied to the site in any way; hacking the site, or it's repo will not provide hackers access to this key. This service will be a Go REST API server that will take the incoming forms and store them in a database. It will also send the notification emails to clients through a type of subscriber pattern, using Cloudflare for email handling and SMTP. The form service will also expose an API endpoint that I (and clients who have access to some future hosting dashboard) can view submission metrics and pull/update/delete form entries as needed. 

## My plan for this week
This week, I will submit my updated proposal, finish getting the initial site up and running, and plan out the project in more detail. 

## Impediments and blockers
I don't have any major blockers other than making time given the work situation. I'll keep this project limited in scope to start and add to it progressively once the proof of concept is in place.