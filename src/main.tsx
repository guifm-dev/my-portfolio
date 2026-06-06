import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { Cursor } from "./components/Cursor";
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css'
import "@/i18n";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ReactLenis 
      root
      options={{
        autoRaf: true,
        anchors: true,
        duration: 2.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
      />
    <Cursor />
    <App />
  </StrictMode>
);
