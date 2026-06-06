import { fadeUp, ease } from "@/lib/framer-motion";
import { motion } from "framer-motion";


export default function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={fadeUp}
            className="mb-12 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
            <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 1, ease }}
                className="h-px w-8 origin-left bg-foreground"
            />
            {children}
        </motion.div>
    );
}
