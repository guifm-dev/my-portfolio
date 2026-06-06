import { useCallback, useEffect, useState, type PointerEvent } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const TRACK_MARGIN = 16;
const MIN_THUMB_HEIGHT = 48;

type ScrollbarMetrics = {
    hidden: boolean;
    scrollableTrack: number;
    thumbHeight: number;
};

function getScrollbarMetrics(): ScrollbarMetrics {
    const viewportHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const trackHeight = Math.max(viewportHeight - TRACK_MARGIN * 2, 0);
    const hidden = scrollHeight <= viewportHeight + 1;
    const thumbHeight = hidden
        ? 0
        : Math.min(
            trackHeight,
            Math.max(MIN_THUMB_HEIGHT, trackHeight * (viewportHeight / scrollHeight))
        );

    return {
        hidden,
        thumbHeight,
        scrollableTrack: Math.max(trackHeight - thumbHeight, 0),
    };
}

export function Scrollbar() {
    const [metrics, setMetrics] = useState<ScrollbarMetrics>({
        hidden: true,
        scrollableTrack: 0,
        thumbHeight: 0,
    });

    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 180,
        damping: 28,
        mass: 0.2,
    });
    const thumbY = useTransform(smoothProgress, (value) => value * metrics.scrollableTrack);

    const updateMetrics = useCallback(() => {
        setMetrics(getScrollbarMetrics());
    }, []);

    const scrollToPointer = useCallback((clientY: number) => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const usableTrack = Math.max(metrics.scrollableTrack, 1);
        const pointerOffset = clientY - TRACK_MARGIN - metrics.thumbHeight / 2;
        const nextProgress = Math.min(1, Math.max(0, pointerOffset / usableTrack));

        window.scrollTo({
            top: maxScroll * nextProgress,
            behavior: "auto",
        });
    }, [metrics.scrollableTrack, metrics.thumbHeight]);

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        scrollToPointer(event.clientY);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (event.buttons !== 1) return;
        scrollToPointer(event.clientY);
    };

    useEffect(() => {

        if (typeof window !== "undefined") {

            updateMetrics();

            const resizeObserver = new ResizeObserver(updateMetrics);

            resizeObserver.observe(document.documentElement);
            resizeObserver.observe(document.body);
            window.addEventListener("resize", updateMetrics);
            window.addEventListener("load", updateMetrics);

            return () => {
                resizeObserver.disconnect();
                window.removeEventListener("resize", updateMetrics);
                window.removeEventListener("load", updateMetrics);
            };

        }
        
    }, [updateMetrics]);

    if (metrics.hidden) return null;

    return (
        <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            className="fixed bottom-4 right-3 top-4 z-[90] hidden w-3 touch-none select-none sm:block"
        >
            <div className="absolute left-1/2 top-0 h-full w-[4px] -translate-x-1/2 bg-foreground/10" />

            <motion.div
                style={{ y: thumbY, height: metrics.thumbHeight, width: "4px" }}
                whileHover={{ width: 6, opacity: 0.95 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-foreground/70"
            />
        </motion.div>
    );
}
