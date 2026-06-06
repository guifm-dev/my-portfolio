import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
    const [enabled, setEnabled] = useState(false);
    const [hovering, setHovering] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);

    const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

    useEffect(() => {

        if (typeof window !== "undefined") {
            const isFine = window.matchMedia("(pointer: fine)").matches;
            if (!isFine) return;

            setEnabled(true);

            const move = (e: MouseEvent) => {
                x.set(e.clientX)
                y.set(e.clientY);
            }

            const over = (e: MouseEvent) => {
                const t = e.target as HTMLElement;
                setHovering(!!t.closest("a, button, [role='button']"));
            }

            window.addEventListener("mousemove", move);
            window.addEventListener("mouseover", over);

            return () => {
                window.removeEventListener("mousemove", move);
                window.removeEventListener("mouseover", over);
            };
            
        }

    }, [x, y]);

    if (!enabled) return null;

    return (
        <>
            <motion.div
                aria-hidden
                style={{ x: sx, y: sy }}
                className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
            >
                <motion.div
                    animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.15 : 0.35 }}
                    transition={{ type: "spring", stiffness: 300, damping: 35 }}
                    className="h-8 w-8 rounded-full border border-foreground"
                />
            </motion.div>

            <motion.div
                aria-hidden
                style={{ x, y }}
                className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2">
                <div className="h-1 w-1 rounded-full bg-foreground" />
            </motion.div>

            <style>{`@media (pointer: fine) { html, body, a, button { cursor: none !important; } }`}</style>
        </>
    )

}
