# CSAT Campaign Builder

An interactive, real-time Customer Satisfaction (CSAT) survey builder with a simplified split-screen dashboard and a live mobile simulator.

---

## 🚀 Live Demo & Deployment Link

* **Live Deployment URL:** [https://csat-campaign-builder.vercel.app](https://csat-campaign-builder.vercel.app) *(Replace with your live production URL on Vercel/Netlify)*

---

## 🛠️ Tech Stack

* **Frontend Library:** [React.js](https://react.dev/) (v19)
* **Build Tool:** [Vite](https://vitejs.dev/) (v8)
* **Styling & CSS:** [Tailwind CSS](https://tailwindcss.com/) (v4 with `@tailwindcss/vite`)
* **Icons:** [Lucide React](https://lucide.dev/)

---

## 📂 Folder Structure

```text
Task/
├── public/                     # Static public assets
├── src/
│   ├── components/             # Modular React components
│   │   ├── ContentTab.jsx      # Content configuration (text, rating type, chips, media)
│   │   ├── StylingTab.jsx      # Styling configuration (colors, font sizes, dimensions)
│   │   └── MobilePreview.jsx   # Sticky mobile frame with interactive survey/thank-you screens
│   ├── App.css                 # Application-level styling
│   ├── App.jsx                 # Root component holding unified config state & split layout
│   ├── index.css               # Global styles & Tailwind CSS import
│   └── main.jsx                # React DOM entry point
├── index.html                  # HTML template
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration with React & Tailwind plugins
└── README.md                   # Project documentation & setup instructions
```

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally on your machine:

### 1. Prerequisites
* **Node.js** (v18.x or later recommended)
* **npm** (v9.x or later) or **yarn** / **pnpm**

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/csat-campaign-builder.git
cd csat-campaign-builder
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Build for Production
To create an optimized production build:
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

---

## ✨ Key Features & Flow

1. **Split-Screen Dashboard**:
   * **Left Panel (60%)**: Easy-to-use configuration interface with **Content** and **Styling** tabs.
   * **Right Panel (40%)**: Sticky phone mockup with real-time reactive updates.

2. **Unified State & Minimal Props**:
   * All configuration lives in a centralized `config` object (`content` + `styling`).
   * Clean component signatures: `<ContentTab config={config} updateConfig={updateConfig} />`.

3. **Content Customization**:
   * Custom Survey Title & Subtitle.
   * Rating Type toggle: **Stars (1–5)** vs **Numbers (1–5)**.
   * Dynamic Feedback Category Chips (add/delete tags on the fly).
   * Optional open-ended comment textarea toggle.
   * Media upload with instant local preview (`URL.createObjectURL`) for the Thank You screen.

4. **Visual Styling Controls**:
   * Native color pickers for background, title, subtitle, ratings, and buttons.
   * Fine-grained sliders for font size, font weight, border radius, button width, and button height.

5. **Two-Screen Interactive User Journey**:
   * **Screen 1 (Survey)**: Interactively select ratings, toggle reason chips, and enter comments.
   * **Screen 2 (Thank You)**: Displays uploaded media banner/icon, thank you message, and a reset button to test the flow again.

---

## 🚢 Deployment Guide

### Deploying on Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Select your repository, leave default build settings (`npm run build`, output: `dist`), and click **Deploy**.
