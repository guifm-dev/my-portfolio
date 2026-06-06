import { fadeUp } from "@/lib/framer-motion";
import { motion } from "framer-motion";

export default function Tag({ children }: { children: React.ReactNode}) {
    return (
        <motion.span
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 700, damping: 50 }}
            className="inline-block border border-border px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground"
        >
            {children}
        </motion.span>
    );
}
