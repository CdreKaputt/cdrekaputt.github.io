---
title: Cloudflare Serverless Workers
excerpt: Last week I created my own personal Cloudflare account and get started working on some basic workers just to get an idea...
date: 2026-09-24
author: aaron
tags: [overview]
---
## What did I do last week?
Last week I created my own personal Cloudflare account and get started working on some basic workers just to get an idea for how that's all setup. I've worked with Cloudflare before through my work, but never had much reason to mess with there serverless features until now. I tried out their D1 serverless SQL database and their workers persistent key/value caching. I believe I will need both features for what I'm trying to do. 

## My plan for this week
This week I started more in-depth work on my website and would like to have the up and running using Astro this weekend. I want to use my site as a testbed for the client side form handling and validation, and also to test out Astro's server actions. When deployed on Cloudflare, the entire Astro runtime is actually run as a worker, and any server actions I create use the Cloudflare worker API. Because of this, my plan is to move the site from GitHub pages to Cloudflare and use my own domain name. I will let you know what the domain ends up being but I think I will just use the personal one I've had for a while.

## Impediments and blockers
My only major blocker right now is the site itself. I need to get it live and working both as a blog for these posts, and as a platform for submitting forms. I think I can get both up and running this weekend. I'm actually really looking forward to it as Astro is the framework I'm hoping to build future sites on for freelance clients.