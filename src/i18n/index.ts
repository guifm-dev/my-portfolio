import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { pt } from "./locales/pt";
import { en } from "./locales/en";

if (!i18n.isInitialized) {

    const isBrowser = typeof window !== "undefined";
    const chain = i18n.use(initReactI18next);

    if (isBrowser) chain.use(LanguageDetector);

    chain.init({
        resources: {
            "pt-BR": { translation: pt },
            "en-US": { translation: en }
        },
        fallbackLng: "pt-BR",
        lng: isBrowser ? undefined : "pt-BR",
        supportedLngs: ["pt-BR", "en-US"],
        load: "currentOnly",
        interpolation: { escapeValue: false },
        detection: {
            order: ["localStorage", "cookie", "navigator"],
            caches: ["localStorage", "cookie"],
            lookupLocalStorage: "lang",
            lookupCookie: "lang",
            convertDetectedLanguage: (lng: string) => 
                lng.toLowerCase().startsWith("pt") ? "pt-BR" : "en-US",
        },
    })
}

export default i18n;
