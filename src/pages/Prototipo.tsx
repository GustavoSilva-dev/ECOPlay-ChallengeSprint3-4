import Footer from "../components/Footer";
import Header from "../components/Header";

function Prototipo() {
    return (
        <div className="flex min-h-screen flex-col bg-[#D9D9D9] font-['Montserrat',sans-serif] text-[#2C3952]">
            <Header activePage="Protótipo" />

            <main className="flex flex-1 justify-center px-5 pb-15 pt-35 min-[769px]:pb-20 min-[769px]:pt-40">
                <div className="flex w-full max-w-225 flex-col items-center gap-10 text-center">
                    <section className="content-fade-in flex max-w-187.5 flex-col items-center gap-5">
                        <h1 className="shadow-animate font-['Nico_Moji',sans-serif] text-[3.75rem] font-normal text-[#2C3952] max-[480px]:text-[3rem]">
                            ECOPlay
                        </h1>
                        <p className="max-w-175 text-[1rem] leading-[1.7] min-[769px]:text-[1.1rem]">
                            Aventure-se pelo protótipo da ECOPlay e descubra como a
                            plataforma transforma ações sustentáveis em uma jornada
                            gamificada.
                        </p>
                    </section>

                    <section
                        className="content-fade-in w-full rounded-2xl bg-white p-7.5 text-left shadow-[0_8px_20px_rgba(0,0,0,0.08)] min-[481px]:p-10"
                    >
                        <h2
                            id="prototype-information-title"
                            className="mb-3 text-center text-[1.35rem] font-bold"
                        >
                            Informações do protótipo
                        </h2>
                        <p className="text-center text-[0.95rem] leading-[1.7]">
                            Este espaço será utilizado para apresentar as informações,
                            funcionalidades e orientações do protótipo da ECOPlay.
                        </p>
                    </section>

                    <section
                        aria-labelledby="prototype-title"
                        className="content-fade-in flex min-h-100 w-full items-center justify-center rounded-2xl border-4 border-[#6B46C1] bg-white/40 p-8.5 min-[481px]:min-h-125 min-[481px]:p-10"
                    >
                        <h2
                            id="prototype-title"
                            className="text-lg font-semibold text-[#6B46C1]"
                        >
                            Área reservada para o protótipo
                        </h2>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Prototipo;