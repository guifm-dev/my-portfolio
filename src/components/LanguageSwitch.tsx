import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function LanguageSwitch() {

    const { i18n, t } = useTranslation();
    const current = i18n.resolvedLanguage === "en-US" ? "en-US" : "pt-BR";
    const next = current === "pt-BR" ? "en-US" : "pt-BR";

    const toggle = () => i18n.changeLanguage(next);

    return (
        <button
        onClick={toggle}
        aria-label={t("lang.switchTo")}
        className="relative inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
        >
            <span className={current === "pt-BR" ? "text-foreground" : ""}>PT</span>

            <span aria-hidden className="text-muted-foreground/50">/</span>

            <span className={current === "en-US" ? "text-foreground" : ""}>EN</span>
            
            <motion.span
            layoutId="lang-underline"
            className="absolute -bottom-1 h-px bg-foreground"
            style={{
                left: current === "pt-BR" ? 0 : "auto",
                right: current === "en-US" ? 0 : "auto",
                width: "1.25rem",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
        </button>
    )
}
