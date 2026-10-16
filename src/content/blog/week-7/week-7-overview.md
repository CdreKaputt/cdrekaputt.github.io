---
title: Mid-semester Project Update
excerpt: My project is a centralized form submission and email notification service. On the WordPress sites I manage at work...
date: 2026-10-15
author: aaron
tags: [update]
---

## Original Project and Goals

My project is a centralized form submission and email notification service. On the WordPress sites I manage at work, each site handles its own forms and stores its own SMTP credentials, which spreads those credentials across a lot of places and has already caused exposure problems. My goal was to move that responsibility into one service. In the original plan, each site sends form submissions through a Cloudflare Worker that checks the origin and validates a Turnstile token, then forwards the submission over REST to a central service written in Go. The Go service saves each submission as an entry in PostgreSQL and emails a notification to the inboxes subscribed to that site. My stretch goals were a Cloudflare Queue between the Worker and the Go service, an admin API, and a user dashboard. I chose to write the central service in Go and host it myself, rather than building everything as Workers, mostly because I wanted more experience with Go, backend services, and networking.

## Changes Since the Proposal

The main change is that I moved the Cloudflare Queue from a stretch goal into the main plan, replacing the direct REST ingest. With a queue, the Go service pulls submissions instead of receiving them, which changes how the service is structured. If I had built around REST and switched later, I would probably have had to rework a large part of the Go service, so it made more sense to design around the queue now. I also dropped the idea of adding spam scoring with Cloudflare's AI tools on top of Turnstile. That might be interesting later, but it isn't really relevant to this project. The admin API and dashboard are still stretch goals. I plan to host the Go service on a DigitalOcean droplet I already have and send notification emails through Cloudflare's email sending.

## Accomplishments So Far

I've used about 19 of my 45 hours. The test form on my Astro project site is live with Turnstile, and its server action runs as a Cloudflare Worker in production. I've tested both and they work as expected, which covers the site-facing half of the pipeline in about 4 hours. I've spent the other 15 or so hours on the Go service. The database tables and main queries are written, using pgx and sqlc to generate Go code from hand-written SQL, along with migrations and a Docker Compose setup for running PostgreSQL locally. I also finished the accept method, which takes an incoming submission and stores it as an entry. Since the queue isn't built yet, it's currently tested with unit tests against mock data.

## Reflection and Path to Completion

The client-facing side went much faster than I expected. I had set aside a lot more of my time for the server action and for getting Turnstile working on a deployed site, and both turned out to be fairly simple. The harder part was setting up PostgreSQL with Go. I hadn't used pgx before, and the way Go structs and methods get built from hand-written SQL queries took some time to understand. With the schema and queries in place, I'm back to the core service logic, which is more familiar ground for me. The biggest open item is the queue integration, since the Go side has only run against mock data so far. My next steps are:

1. Write a seed script for test sites and site configs, along with more unit tests.
2. Implement email notifications and connect that to Cloudflare's SMTP service.
3. Set up the Cloudflare Queue, with the Worker enqueuing submissions and the Go service pulling from it.
4. Add email notifications through Cloudflare.
5. Deploy the Go service to my droplet and test the full pipeline end to end.

I'll consider the project done when someone can submit the test form on my project site, get the correct success message, and have the submission pass through the queue to the Go service, get saved as an entry, and trigger an email notification. For the final submission I plan to have a working demo, a write-up, and flowcharts of the pipeline. I still need to work out how to show the email side in the demo, since the notification doesn't appear on the form page. If I get to the admin API, I might use it to show a submission's progress through the system, including whether it sent an email, but that will depend on how much of my remaining time the main pipeline takes.
