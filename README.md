# AI Journal Application

## Overview

This project is an AI-powered journaling application where users can write journal entries and analyze their emotions using an LLM.

The application allows users to:

* Write and save journal entries
* Analyze emotional tone using an AI model
* Extract keywords and generate summaries
* View analyzed journals in a list with insights

---

## Features

* Write journal entries
* Save entries to database
* AI-based emotion detection
* Keyword extraction
* Automatic summary generation
* Journal list with analysis results
* Insights updates when new entries are added

---

## Tech Stack

Frontend:

* Next.js

Backend:

* Next.js API Routes

Database:

* MongoDB

AI Integration:

* OpenRouter API
* DeepSeek LLM

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Levarcof/myJournal.git
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open in browser:

http://localhost:3000

---

Live Demo:
https://my-journal-gilt.vercel.app/login

## Project Workflow

User writes journal text
↓
Entry saved in database
↓
Analyze button triggers AI analysis
↓
LLM returns emotion, keywords, summary
↓
Database updated with analysis
↓
Journal appears in list with insights

---

## API Endpoints

### Save Journal

POST /api/journal

### Analyze Journal

POST /api/journal/analyze

---

## Future Improvements

* Mood tracking charts
* Weekly emotion insights
* Search functionality
* User authentication
* Data encryption for privacy
