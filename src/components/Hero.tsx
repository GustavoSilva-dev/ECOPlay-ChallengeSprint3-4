import backgroundImage from '../assets/imagens/background.gif'

interface HeroProps {
    title?: string
    subtitle?: string
    eyebrow?: string
    layout?: 'home' | 'inner'
    backgroundImage?: string
}

function Hero({
    title = 'ECOPlay',
    subtitle = 'Gamificando ações sustentáveis',
    eyebrow,
    layout = 'home',
    backgroundImage: heroBackground = backgroundImage,
}: HeroProps) {
    const isInnerLayout = layout === 'inner'

    return (
        <section
            className={`relative flex ${isInnerLayout ? 'h-100 min-h-100' : 'h-125 min-h-125 min-[769px]:h-150 min-[769px]:min-h-150'} flex-col items-center justify-center overflow-hidden bg-cover bg-center px-5 py-15 text-center text-white min-[769px]:px-30`}
            style={{ backgroundImage: `url(${heroBackground})` }}
            aria-labelledby="hero-title"
        >
            <div
                className="absolute inset-0 animate-[hero-gradient_2s_ease-in-out_infinite] bg-linear-to-br from-[#5361ff]/90 to-[#6b46c1]/90"
                aria-hidden="true"
            />
            <div className={`relative z-10 ${isInnerLayout ? 'mt-16' : 'mt-12.5'}`}>
                {eyebrow && (
                    <p className="eyebrow-fade-in mb-2.5 font-['Nico_Moji',sans-serif] text-[1.5rem] tracking-[1px]">
                        {eyebrow}
                    </p>
                )}
                <h1
                    id="hero-title"
                    className={`${isInnerLayout ? 'content-fade-in text-[1.9rem] font-bold leading-tight min-[769px]:text-[3.5rem]' : 'hero-title-animation font-[\'Nico_Moji\',sans-serif] text-[4rem] leading-tight tracking-[2px] min-[769px]:text-[7rem]'} m-0`}
                >
                    {title}
                </h1>
                <p className={`${isInnerLayout ? 'content-fade-in text-[1.9rem] font-bold leading-tight min-[769px]:text-[3.5rem]' : 'content-fade-in text-[1.2rem] min-[769px]:text-[1.7rem]'}`}>
                    {subtitle}
                </p>
            </div>
        </section>
    )
}

export default Hero;