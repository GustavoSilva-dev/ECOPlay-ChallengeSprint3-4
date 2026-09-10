import backgroundImage from '../assets/imagens/background.gif'

interface HeroProps {
    title?: string
    subtitle?: string
    backgroundImage?: string
}

function Hero({
    title = 'ECOPlay',
    subtitle = 'Gamificando ações sustentáveis',
    backgroundImage: heroBackground = backgroundImage,
}: HeroProps) {
    return (
        <section
            className="relative flex h-125 min-h-125 flex-col items-center justify-center overflow-hidden bg-cover bg-center px-5 py-15 text-center text-white min-[769px]:h-150 min-[769px]:min-h-150 min-[769px]:px-30"
            style={{ backgroundImage: `url(${heroBackground})` }}
            aria-labelledby="hero-title"
        >
            <div
                className="absolute inset-0 animate-[hero-gradient_2s_ease-in-out_infinite] bg-linear-to-br from-[#5361ff]/90 to-[#6b46c1]/90"
                aria-hidden="true"
            />
            <div className="relative z-10 mt-12.5">
                <h1
                    id="hero-title"
                    className="hero-title-animation m-0 font-['Nico_Moji',sans-serif] text-[4rem] leading-tight tracking-[2px] min-[769px]:text-[7rem]"
                >
                    {title}
                </h1>
                <p className="content-fade-in text-[1.2rem] min-[769px]:text-[1.7rem]">
                    {subtitle}
                </p>
            </div>
        </section>
    )
}

export default Hero;