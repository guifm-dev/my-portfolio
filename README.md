# My Portfolio v2

Personal portfolio for Guilherme Fortunato Machado, built as a modern single-page application to present professional background, experience, projects, education, and contact channels.

## Overview

Version 2.0 focuses on a minimalist, responsive, and performant interface, with clear reading flow, simple navigation, and smooth microinteractions. The content is available in Portuguese and English, with browser language detection and manual language switching in the UI.

## Key Features

- SPA built with Vite 7, React 19, and TypeScript
- Styling with Tailwind CSS 4, shadcn, and theme tokens
- Animations and transitions with Framer Motion
- Smooth scrolling with Lenis
- Internationalization with i18next and react-i18next
- Icons with Lucide React and custom components
- Public SEO and sharing assets, including favicon, Open Graph image, sitemap, and robots.txt

## Structure

```text
src/
  components/      UI components, sections, cursor, scrollbar, and language switcher
  i18n/            Language setup and pt-BR/en-US translations
  lib/             Portfolio data, utilities, and animation presets
  styles/          Global CSS, Tailwind, and theme tokens
  App.tsx          Main page structure
  main.tsx         Application entry point

public/
  assets/          Images used by the interface
  favicon.*        Favicons
  open-graph.webp  Social sharing image
  robots.txt       Indexing rules
  sitemap.xml      Site map
```

## Technologies

- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis
- i18next
- Lucide React
- Radix UI / shadcn

## Getting Started

This project uses Yarn 1.22.22 as its primary package manager. With Node.js installed, run:

```bash
yarn
yarn dev
```

The local development server will be available at:

```bash
http://localhost:5173
```

To create a production build:

```bash
yarn build
```

To preview the production build locally:

```bash
yarn preview
```

You can also use npm:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## License

This project is licensed under the MIT License.
