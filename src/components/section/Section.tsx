import { stagger } from "@/lib/framer-motion";
import { motion } from "framer-motion";

export default function Section({ children, ...rest }: React.ComponentProps<typeof motion.section>) {
    return (
        <motion.section
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            {...rest}
        >
            {children}
        </motion.section>
    );
}
