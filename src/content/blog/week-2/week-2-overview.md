---
title: Getting Started and Project Ideas
excerpt: This week I reviewed the course requirements, took a look at the previous student examples that were provided...
date: 2026-09-10
author: aaron
tags: [overview]
---
## What did I do last week? 
This week I reviewed the course requirements, took a look at the previous student examples that were provided, and thought about options for my own personal project for this course. I feel like I have a good idea of the type of project I'd like to make but I'm still undecided on the exact form it will take.

## My plan for this week
Since I'm planning to target a career in full-stack and/or backend web development (I will most likely start in full-stack then move to backend development as I build a more specialised skill set) it makes sense to build a full stack web app and pay special attention to the backend systems used to run it. I'd like to explore web-sockets and real time communication so some kind of messaging app would make sense. I liked Prof. Quinn's recommendation to build a Slack like application, although it's use case may deviate away from business communications to something a bit more casual and fun like an app meant for language and cultural exchange, for example. For my purposes, the use case is probably not as important as the underlying systems used to support it. I already know that I will make use of web-sockets to facilitate real time communication between clients, but I'd also like to explore microservice architecture. I might create one microservice to handle user authentication and another to handle the actual client connections via web-sockets. Perhaps the two services will communicate via webhooks or even gRPC. The frontend will be a simple React SPA and I can host it along with the backend(s) and database myself. I already have experience with both Flask and Express.js backend, but I'd really like to try building the backend for this project in Golang. It's a language that has really grown on me and I'd like to try building everything using the standard library rather than external libraries, possibly with the exception of the websocket library itself. 

## Impediments and blockers
In terms of impediments and blockers, the biggest issues will be scope creep and time management. An app like the one I'm proposing has the potential to grow quickly. I want to make sure I have a working demo completed by the end of the semester, so I'll focus on the core functionality first. That means the basic websocket and client/client communication comes first. The frontend only needs to work well enough to send chats, see their delivery status, and receive responses. I'll leave complex user auth and user connection work for later. The appearance and usability of the frontend beyond those basic requirements will be the lowest priority. 

## Reflection and planning
This weekend, I plan to get my site up and running on Github pages, and finalize me proposal.