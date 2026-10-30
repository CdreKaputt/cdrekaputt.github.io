---
title: Building a Notifier
excerpt: I didn’t make as much progress last week as I did the week before, but I was able to get the basic notifications package implemented. For now...
date: 2026-10-29
author: aaron
tags: [overview]
---
## What did I do last week?
I didn’t make as much progress last week as I did the week before, but I was able to get the basic notifications package implemented. For now it only collects pending notifications and sends an “email,” which is really just a message written with the existing logger. It’s working well so far, and I’m happy with the way the service is structured and how this package fits into it.

Rather than having a single process collect form submissions, commit them to the database, generate notifications, and send them all in one go, I opted to have two workers, the “consumer” and the “notifier,” running concurrently inside the service.

### The Consumer
The consumer pulls pending form submissions from the Cloudflare queue (or from the devqueue during testing), adds each entry to the database, and then “acks” (acknowledges) it so the queue knows it’s been handled. If it runs into an issue during that process, it marks the message for retry and the queue delivers it again later. Each submission carries an idempotency key that prevents the consumer from adding duplicate entries. This matters because the service can store a submission but then fail to acknowledge it. When that happens, Cloudflare delivers the same submission again, and without the key that would lead to duplicate entries and duplicate notifications. In the same database transaction as the entry, the consumer also adds a notification for each address registered to receive notifications for that site and form. The consumer doesn’t actually send the notifications. It just adds them to the database with status = “pending”.

### The Notifier
Meanwhile, the notifier checks the database every few seconds for pending notifications. For each one it finds, it builds an email, sends it using the “sender” interface, and marks the notification as sent. If a send fails, the notification stays pending and the notifier tries it again on the next pass. By using an interface here, I can easily define different notification methods. For example, sending emails through Cloudflare requires a different API than sending emails through SendGrid. I can also use the interface to create a fake sender for simple unit tests, or a stand-in sender that just logs notifications instead of sending an email, which is what I’m using right now. This is similar to the “queue” interface defined by the consumer, which let me swap in the devqueue in place of the actual Cloudflare queue while I focus on testing.

### The Transactional Outbox Pattern
The main reason to split this process into two workers is that both sides of this service include steps that could fail and require retries. If everything were done in one long process, the logic needed to cover all the edge cases would become quite cumbersome. Imagine a single process that receives a form entry, validates it, stores the entry in the database, then attempts to send notifications to three people. Everything goes smoothly until it’s time to send the emails. Emails 1 and 2 are processed just fine, but email 3 gets stuck. Maybe the Cloudflare email API is timing out or returning a 500 error. What do you do with the last email? Do you start the whole process over? You could, but the entry has already been added to the database, and you’d need to remember that two of the three emails were already sent so you don’t send duplicates. And what if the email keeps failing? Things get pretty complicated really fast.

Instead, we can keep track of everything by using the database as the single source of truth and running two workers that each handle one half of the process. The consumer just adds entries and pending notifications to the database, and the notifier just focuses on sending notifications one at a time. In the example above, email 3 would stay pending until the notifier is able to send it, and emails 1 and 2 would already be marked as sent. It’s a new pattern for me (usually called the “transactional outbox” pattern), but it’s one that pops up a lot in microservices and other backend applications where one request triggers side effects, like sending an email, that can fail on their own.

## My plan for this week
This week, I’m planning to build a more fleshed-out notifier that sends real emails to the Mailpit server running locally in a Docker container. That will let me test email formatting, error handling, and delivery all in one place. Once that’s done, I can turn my attention to building out a simple API. The API will let me add and remove sites, check notifications, and check basic metrics remotely. It will also let any future admin dashboard collect and display form submission and email notification data, should I later decide to build a full UI. The focus there will be security and user auth, since the API is the primary attack surface for this application. 

## Impediments and blockers
I shouldn’t have any major blockers this week. I’ll have more time to work on the project than I did last week, so I should be able to make a lot of progress.
