---
title: Website Deployment & Tests
excerpt: Last week I worked on my site, got it rendering my weekly updates as posts, and filled out a bit of additional information about myself...
date: 2026-10-01
author: aaron
tags: [overview]
---
## What did I do last week?
Last week I worked on my site, got it rendering my weekly updates as posts, and filled out a bit of additional information about myself. I would like to eventually use this present this site as a portfolio and example project, but it still has a long way to go before it's really presentable. I'm happy with how the blog posts render on the home page, and I have a working post template so each post can be opened and read on it's own page, but the blog page itself and about pages are incomplete and return 404s when visited. The goal is to have a full list of posts on the blog page with filtering and categories, but for now all the posts are visible on the home page. I've spent enough time on the site (much more than I should have) so it's time to move on to the actual primary project, building a form submission and notification service. This site will act as the "client" side of this system.

## My plan for this week
This week, I will start work on the server side form handler that takes forms submitted from the client side, validates them, and checks for spam content (I wont flesh that feature out too much but I have ideas for it in the future). That system will run as the "backend" of the site using Astro server actions. If I have time, I will also start work on the central form submission and notification system. The sites backend will send validated form submissions to this service where they will be saved to a database, and then a notification email will be sent to everyone subscribed to notifications to that site. That will likely also be built and hosted as a Cloudflare worker so they can connect using a "service binding" which is much more secure than an API exposed to the wider web. 

## Impediments and blockers
Currently, I do not have any major blockers except for working with limited time available. I already have a lot of the groundwork laid out for the new Cloudflare workers, and deploying the site to Cloudflare was a great way to learn about how that system works. I'm ready to move on to the core project.