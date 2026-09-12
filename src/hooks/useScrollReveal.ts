import { useEffect, useRef } from "react";

const revealSelector = ".content-fade-in, .hero-title-animation, .eyebrow-fade-in";

function useScrollReveal<T extends HTMLElement>() {
    const containerRef = useRef<T>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const elements = container.querySelectorAll<HTMLElement>(revealSelector);

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.15,
            },
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    return containerRef;
}

export default useScrollReveal;
