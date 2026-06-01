import { motion } from "framer-motion";

export default function Section({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            // variants={fadeUp}
            className="mb-12 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
            <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, /*ease*/ }}
                className="h-px w-8 origin-left bg-foreground"
            />
            {children}
        </motion.div>
    );
}
