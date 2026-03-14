# Architecture Design – AI Journal Application

## System Overview

The AI Journal application allows users to write personal journal entries and analyze their emotional tone using a Large Language Model (LLM).

The system follows a simple client–server architecture.

Flow:

User → Frontend (Next.js) → Backend API → LLM API → Database

### Components

Frontend
Built with Next.js. It allows users to write journal entries, save them, and trigger AI analysis.

Backend
Next.js API routes handle saving journals and sending journal text to the LLM for analysis.

Database
MongoDB stores journal entries and their analysis results (emotion, keywords, summary).

LLM Service
OpenRouter API with DeepSeek model is used to analyze journal text.

---

## Data Flow

1. User writes a journal entry.
2. User clicks **Save Entry**.
3. The backend saves the journal text in the database.
4. The frontend receives the documentId.
5. User clicks **Analyze**.
6. Backend sends the journal text to the LLM.
7. LLM returns emotion, keywords, and summary.
8. Backend updates the same document with analysis results.
9. The journal appears in the list with analysis information.

---

## 1. How would you scale this to 100k users?

To scale the application for 100k users:

• Use cloud hosting platforms such as Vercel or AWS.
• Deploy multiple backend instances behind a load balancer.
• Use database indexing to speed up queries.
• Implement caching for frequently requested data.
• Use background job queues for AI analysis tasks.
• Store static assets using a CDN.

These strategies ensure the application remains responsive even with large traffic.

---

## 2. How would you reduce LLM cost?

LLM usage can be expensive, so several strategies can reduce cost:

• Analyze each journal entry only once.
• Store analysis results in the database.
• Avoid sending repeated requests for the same text.
• Limit maximum text length sent to the LLM.
• Use smaller or cheaper models when possible.

This ensures minimal API usage while still providing useful insights.

---

## 3. How would you cache repeated analysis?

If the same journal text is analyzed multiple times, caching can prevent repeated LLM calls.

Approach:

• Generate a hash of the journal text.
• Store the analysis result in a cache system such as Redis.
• Before calling the LLM, check if the hash already exists in cache.

Flow:

User text → Generate hash → Check cache
If found → return cached result
If not found → call LLM and store result in cache

This reduces API cost and improves response time.

---

## 4. How would you protect sensitive journal data?

Journal entries may contain personal and sensitive information, so security is important.

Security measures include:

• Using HTTPS for all network communication.
• Encrypting sensitive data in the database.
• Implementing authentication and authorization.
• Restricting database access using secure credentials.
• Avoiding logging sensitive journal text in server logs.
• Using environment variables for API keys.

These practices help protect user privacy and maintain data security.

---

## Future Improvements

• Emotion trend analysis
• Weekly mood insights
• Journal search functionality
• User authentication system
• End-to-end encryption for journal data
