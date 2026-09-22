# 🛡️ ClauseGuard — Don't Get Screwed by the Fine Print

**ClauseGuard** is a Gen-Z styled AI legal contract analyzer designed to help freelancers, contractors, and creators audit agreement PDFs in seconds. Powered by Large Language Models via Groq, ClauseGuard instantly flags predatory terms, highlights missing legal protections, and generates downloadable, counter-amended contract reports.

LiveDemo: https://clauseguard-frontend-theta.vercel.app/

---

🔗 **Live App:** [https://frontend-bistrobyte.vercel.app](https://frontend-bistrobyte.vercel.app)  
📡 **Backend API:** [https://clause-guard-backend.onrender.com](https://clause-guard-backend.onrender.com)

---

## ✨ Features

- 📄 **PDF Agreement Parsing:** Drag-and-drop contract upload with instant text extraction.
- ⚡ **AI Risk Scoring:** Gets a real-time Threat Score (1–10) classifying contracts as Safe, Moderate, or High Risk.
- 🔍 **Predatory Clause Flagging:** Detects hidden non-competes, aggressive IP assignment, unfair liability caps, and termination traps.
- 🛡️ **Missing Protections Alert:** Highlights critical missing safeguards (e.g., Late Fee Clauses, IP Retention, Mutual NDA).
- ✏️ **AI Counter-Edits:** Generates legally balanced, copy-pasteable replacement text for every flagged issue.
- 📥 **Automated PDF Export:** One-click download of a formatted **Fixed Contract Report** comparing original problematic clauses side-by-side with AI amendments.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **UI/UX Aesthetics:** Glassmorphism, Custom Bento Grid Layout
- **Animations & Icons:** Framer Motion, Lucide React, Canvas Confetti
- **Document Export:** jsPDF, jsPDF-AutoTable

### **Backend**
- **Framework:** Python FastAPI
- **LLM Engine:** Groq API (`gpt-oss-120b`)
- **PDF Extraction:** PyPDF2 / pdfplumber
- **Validation:** Pydantic

---

## 🚀 Getting Started Locally

### **Prerequisites**
- Node.js (v18+)
- Python (v3.10+)
- A valid **Groq API Key**

---

### **1. Clone the Repository**
```bash
git clone [https://github.com/Archee01pal/Clause-Guard.git](https://github.com/Archee01pal/Clause-Guard.git)
cd Clause-Guard
