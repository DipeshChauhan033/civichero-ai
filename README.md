<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d1684ebf-08b7-43c2-b36e-6504dd2fcd29

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

# CivicHero AI

An AI-powered Civic Issue Reporting and Management Platform that enables citizens to report public issues, upload supporting evidence, track complaint status, and receive AI-assisted guidance through an intuitive web application.

---

## 🚀 Features

- 🏙️ Report civic issues online
- 🤖 AI-powered assistant for user guidance
- 📍 Location-based complaint submission
- 📷 Upload images as evidence
- 📊 Track complaint progress
- 🔍 View complaint history
- 📱 Fully responsive interface
- ☁️ Cloud deployed on Google Cloud Run

---

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js / Express (if applicable)

### AI
- Google Gemini API / AI Integration

### Database
- Firebase / PostgreSQL / MongoDB (Update accordingly)

### Cloud
- Google Cloud Run

---

## Project Structure

```
src/
│── components/
│── pages/
│── hooks/
│── services/
│── assets/
│── App.tsx
│── main.tsx
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/yourusername/civichero-ai.git
```

Navigate to the project

```bash
cd civichero-ai
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

---

## Deployment

The application is deployed on **Google Cloud Run**.

Live Demo:

https://civichero-ai-1038857217845.asia-southeast1.run.app

---

## Key Functionalities

- Register and log in securely
- Report civic problems
- Upload supporting photos
- AI-powered assistance
- Complaint tracking
- Responsive design
- Fast cloud deployment

---

## Future Enhancements

- Mobile application
- GIS mapping integration
- Government dashboard
- Push notifications
- Role-based access control
- Analytics dashboard
- Multi-language support

---

## Screenshots

Add screenshots here.

```
screenshots/
├── home.png
├── dashboard.png
├── report-issue.png
├── ai-chat.png
└── tracking.png
```

---

## Author

**Dipesh Chauhan**

---

## License

This project is licensed under the MIT License.
