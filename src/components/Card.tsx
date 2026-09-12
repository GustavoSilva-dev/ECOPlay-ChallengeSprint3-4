import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type CardVariant = "blue" | "purple";

interface CardProps extends HTMLAttributes<HTMLElement> {
    title?: string;
    children?: ReactNode;
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
    blue: "bg-linear-to-br from-[#5360FF] to-[#5A56E4] min-[769px]:self-start",
    purple: "bg-linear-to-br from-[#6B46C1] to-[#51329B] min-[769px]:self-end",
};

function Card({
    title,
    children,
    width,
    height,
    variant = "blue",
    className = "",
    style,
    ...props
}: CardProps) {
    return (
        <article
            {...props}
            className={`content-fade-in w-full max-w-full self-center rounded-xl p-6.25 text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all min-[769px]:max-w-[85%] min-[769px]:p-7.5 ${variantClasses[variant]} ${className}`}
            style={{ ...(width !== undefined ? { width } : {}), ...(height !== undefined ? { height } : {}), ...style }}
        >
            {title && (
                <h2 className="mb-5 text-[1.1rem] font-bold leading-tight min-[769px]:text-[1.3rem]">
                    {title}
                </h2>
            )}
            <div className="text-[0.95rem] leading-[1.6] min-[769px]:text-[1.05rem]">
                {children}
            </div>
        </article>
    );
}

export type { CardProps, CardVariant };
export default Card;