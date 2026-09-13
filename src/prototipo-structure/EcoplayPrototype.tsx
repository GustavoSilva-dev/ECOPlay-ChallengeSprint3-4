import { useState } from "react";

type Screen = "home" | "missoes" | "mapa" | "guildas" | "recompensas";
type LootboxRank = "comum" | "raro" | "lendario";
type NoteStatus = "ok" | "concept" | "mixed";

interface Mission {
    icon: string;
    title: string;
    points: string;
    tag: string;
    action: string;
}

interface Note {
    status: NoteStatus;
    label: string;
    title: string;
    text: string;
}

interface RewardOutcome {
    rarity: string;
    color: string;
    text: string;
}

const missions: Mission[] = [
    { icon: "🌱", title: "Plante ou cuide de uma muda no seu quintal", points: "+60 pontos", tag: "Foto · verificação do EcoBot", action: "Enviar prova" },
    { icon: "🚶", title: "Caminhe 2km ao ar livre", points: "+40 pontos", tag: "Trajeto", action: "Registrar caminhada" },
    { icon: "♻️", title: "Separe seu lixo reciclável hoje", points: "+30 pontos", tag: "Foto · verificação do EcoBot", action: "Enviar prova" },
    { icon: "🥖", title: "Visite um comércio parceiro", points: "+25 pontos", tag: "Check-in no mapa", action: "Ver no mapa" },
];

const notes: Record<Screen | "onboarding", Note> = {
    onboarding: {
        status: "ok",
        label: "✅ Dá pra construir de verdade",
        title: "Onboarding",
        text: "Tela de entrada. Escolhe se quem acessa é jogador ou comerciante — o protótipo segue pela jornada do jogador.",
    },
    home: {
        status: "ok",
        label: "✅ Dá pra construir de verdade",
        title: "Home",
        text: "Painel principal com pontos, missão em destaque e resumo da guilda. É o hub de engajamento diário e reaproveita Usuario, Inventario e LootBox.",
    },
    missoes: {
        status: "ok",
        label: "✅ Dá pra construir (com ajuste)",
        title: "Missões",
        text: "A verificação de fraude nessa tela é simulada. A IA da sprint é o chatbot Watson, que pode fazer essa verificação como uma conversa guiada.",
    },
    mapa: {
        status: "concept",
        label: "💡 Mostrar como conceito",
        title: "Mapa de comércios",
        text: "Uma lista fixa de lugares, sem GPS de verdade, já vira um MVP viável. A geolocalização real fica para a visão de produto.",
    },
    guildas: {
        status: "concept",
        label: "💡 Mostrar como conceito",
        title: "Guildas",
        text: "MVP realista com uma guilda por usuário e ranking simples somando pontos. Temporadas automáticas e distribuição de prêmios ficam como visão.",
    },
    recompensas: {
        status: "mixed",
        label: "⚖️ Base real + 1 aposta em validação",
        title: "Recompensas",
        text: "O catálogo com benefícios da SoulUp é direto. O card da Prospera está marcado como conceito para validação com os mentores.",
    },
};

const rewardOutcomes: Record<LootboxRank, RewardOutcome[]> = {
    comum: [
        { rarity: "Incomum", color: "#38A169", text: "+25 pontos extras na sua conta" },
        { rarity: "Incomum", color: "#38A169", text: "10% de cupom em comércio parceiro" },
        { rarity: "Épico", color: "#5B3A9C", text: "+50 pontos extras" },
    ],
    raro: [
        { rarity: "Épico", color: "#5B3A9C", text: "20% de cupom em comércio parceiro" },
        { rarity: "Épico", color: "#5B3A9C", text: "15% de desconto na conta de luz por 1 mês" },
        { rarity: "Lendário", color: "#B9832A", text: "25% na conta de luz + 100 pontos bônus" },
    ],
    lendario: [
        { rarity: "Lendário", color: "#B9832A", text: "30% na conta de luz por 1 mês + 150 pontos" },
        { rarity: "Lendário", color: "#B9832A", text: "Selo Guardião ECOPlay + cupom 50% em parceiros" },
        { rarity: "Mítico", color: "linear-gradient(135deg, #8B3A62, #E3A83B)", text: "30% na conta de luz + selo especial + 200 pontos" },
    ],
};

const navItems: Array<{ screen: Screen; icon: string; label: string }> = [
    { screen: "home", icon: "🏠", label: "Home" },
    { screen: "missoes", icon: "🌱", label: "Missões" },
    { screen: "mapa", icon: "🗺️", label: "Mapa" },
    { screen: "guildas", icon: "🛡️", label: "Guildas" },
    { screen: "recompensas", icon: "🎁", label: "Prêmios" },
];

function EcoplayPrototype() {
    const [activeScreen, setActiveScreen] = useState<Screen | "onboarding">("onboarding");
    const [merchantNoteVisible, setMerchantNoteVisible] = useState(false);
    const [verifiedMissions, setVerifiedMissions] = useState<number[]>([]);
    const [expandedMerchantNote, setExpandedMerchantNote] = useState(false);
    const [lootbox, setLootbox] = useState<LootboxRank | null>(null);
    const [lootResult, setLootResult] = useState<RewardOutcome | null>(null);

    const activateScreen = (screen: Screen) => {
        setActiveScreen(screen);
        setLootbox(null);
    };

    const enterApp = () => activateScreen("home");

    const verifyMission = (index: number) => {
        setVerifiedMissions((current) => (
            current.includes(index) ? current : [...current, index]
        ));
    };

    const openLootbox = (rank: LootboxRank) => {
        setLootbox(rank);
        setLootResult(null);
    };

    const revealLoot = () => {
        if (!lootbox) return;
        const outcomes = rewardOutcomes[lootbox];
        setLootResult(outcomes[Math.floor(Math.random() * outcomes.length)]);
    };

    const currentNote = notes[activeScreen];

    return (
        <div className="flex w-full flex-col gap-8 min-[761px]:flex-row min-[761px]:items-start min-[761px]:justify-center min-[761px]:gap-9">
            <div className="w-full shrink-0 min-[761px]:w-90">
                <div className="overflow-hidden rounded-[26px] border border-[#DEE3D2] bg-white shadow-[0_20px_45px_-20px_rgba(83,96,255,0.2)]">
                    <div className="flex items-center justify-between px-5.5 pb-1.5 pt-3.5 text-xs font-bold text-[#5A6B7F]">
                        <span>9:41</span>
                        <span>●●● 5G 🔋</span>
                    </div>

                    <div className="h-160 overflow-hidden">
                        {activeScreen === "onboarding" && (
                            <section className="flex h-full flex-col items-center justify-center px-6.5 text-center">
                                <div className="mb-2.5 text-[3.2rem]">🌱</div>
                                <div className="text-[2rem] font-black tracking-tight text-[#6B46C1]">
                                    ECO<span className="text-[#38A169]">Play</span>
                                </div>
                                <p className="my-2.5 mb-6.5 max-w-65 text-[0.85rem] leading-normal text-[#5A6B7F]">
                                    Toda atitude sustentável faz sua guilda crescer.
                                </p>
                                <button type="button" onClick={enterApp} className="w-full max-w-60 rounded-full border-0 bg-[#5360FF] px-5.5 py-3 text-sm font-bold text-white">
                                    Entrar como jogador →
                                </button>
                                <button type="button" onClick={() => setMerchantNoteVisible((visible) => !visible)} className="mt-3 border-0 bg-transparent text-xs text-[#5A6B7F] underline">
                                    Sou dono de comércio
                                </button>
                                {merchantNoteVisible && (
                                    <p className="mt-2.5 max-w-62.5 text-xs leading-normal text-[#5A6B7F]">
                                        Fluxo do lojista é conceito para a próxima sprint — este protótipo foca a jornada do jogador.
                                    </p>
                                )}
                                <div className="mt-7.5 rounded-full border border-[#DEE3D2] px-3 py-1 text-[0.68rem] text-[#5A6B7F]">
                                    Em parceria com SoulUp · Prospera
                                </div>
                            </section>
                        )}

                        {activeScreen === "home" && (
                            <section className="h-full overflow-y-auto px-5 pb-5 pt-1.5">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#5360FF] font-extrabold text-white">M</div>
                                        <div className="text-[0.68rem] text-[#5A6B7F]">Bom dia<b className="block text-[0.92rem] text-[#2C3952]">Marina</b></div>
                                    </div>
                                    <div className="text-right">
                                        <div className="rounded-full bg-[#E3A83B] px-3 py-1.5 text-xs font-extrabold text-[#3B2705]">🌿 1.240 pts</div>
                                        <div className="mt-1 text-[0.7rem] font-bold text-[#C1512F]">🔥 6 dias seguidos</div>
                                    </div>
                                </div>
                                <GuildSummary onOpen={() => activateScreen("guildas")} />
                                <PrototypeHeading>Missão em destaque</PrototypeHeading>
                                <div className="flex items-center gap-3 rounded-2xl border border-[#DEE3D2] bg-[#F5F7EE] p-4">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl">🌱</span>
                                    <div className="flex-1"><div className="text-sm font-bold">Plante ou cuide de uma muda</div><div className="text-xs font-bold text-[#B9832A]">+60 pontos</div></div>
                                    <button type="button" onClick={() => activateScreen("missoes")} className="rounded-full border-0 bg-[#E3A83B] px-3.5 py-2 text-xs font-extrabold text-[#3B2705]">Ver</button>
                                </div>
                                <PrototypeHeading>Lootboxes</PrototypeHeading>
                                <LootboxTeaser icon="🟦" title="Lootbox Comum" subtitle="Recompensas básicas" points="150 pts" onOpen={() => openLootbox("comum")} />
                                <LootboxTeaser icon="🟪" title="Lootbox Raro" subtitle="Recompensas de impacto" points="350 pts" onOpen={() => openLootbox("raro")} />
                                <LootboxTeaser icon="🟨" title="Lootbox Lendária" subtitle="Recompensas épicas" points="750 pts" onOpen={() => openLootbox("lendario")} />
                                <div className="mt-3.5 flex gap-2.5">
                                    <StatBox value="Nível 4" label="Explorador" />
                                    <StatBox value="260 pts" label="pra próxima recompensa" />
                                </div>
                            </section>
                        )}

                        {activeScreen === "missoes" && (
                            <section className="h-full overflow-y-auto px-5 pb-5 pt-2.5">
                                <PrototypeHeading>Missões de hoje</PrototypeHeading>
                                <div className="mb-3.5 flex gap-2">
                                    <span className="rounded-full bg-[#5360FF] px-3 py-1.5 text-[0.7rem] font-bold text-white">Individuais</span>
                                    <span className="rounded-full border border-[#DEE3D2] px-3 py-1.5 text-[0.7rem] font-bold text-[#5A6B7F]">Da guilda</span>
                                </div>
                                {missions.map((mission, index) => (
                                    <div key={mission.title} className="mb-3.5 flex items-start gap-3 rounded-2xl border border-[#DEE3D2] bg-[#F5F7EE] p-4">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-2xl">{mission.icon}</span>
                                        <div className="flex-1">
                                            <div className="text-[0.85rem] font-bold">{mission.title}</div>
                                            <div className="text-[0.68rem] text-[#5A6B7F]">{mission.points}</div>
                                            <span className="mt-1.5 inline-block rounded-full border border-[#DEE3D2] bg-white px-2 py-0.5 text-[0.62rem] font-bold text-[#5A6B7F]">{mission.tag}</span>
                                            <div className="mt-2">
                                                {index === 3 ? (
                                                    <button type="button" onClick={() => activateScreen("mapa")} className="rounded-full border-0 bg-[#5360FF] px-3 py-1.75 text-[0.7rem] font-bold text-white">{mission.action}</button>
                                                ) : (
                                                    <button type="button" onClick={() => verifyMission(index)} className={`rounded-full border-0 px-3 py-1.75 text-[0.7rem] font-bold text-white ${verifiedMissions.includes(index) ? "bg-[#38A169]" : "bg-[#5360FF]"}`}>
                                                        {verifiedMissions.includes(index) ? `✅ Verificado · ${mission.points}` : mission.action}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {activeScreen === "mapa" && (
                            <section className="h-full overflow-y-auto px-5 pb-5 pt-2.5">
                                <PrototypeHeading>Comércios por perto</PrototypeHeading>
                                <div className="relative mb-3.5 h-50 overflow-hidden rounded-2xl bg-[#E7EEDA] [background-image:repeating-linear-gradient(0deg,#DCE6CB_0_26px,#E7EEDA_26px_52px)]">
                                    <MapPin label="📍 você" position="left-[44%] top-[46%]" you />
                                    <MapPin label="🥖 Padaria Verde" position="left-[20%] top-[18%]" />
                                    <MapPin label="🌾 Feira Orgânica" position="left-[64%] top-[60%]" />
                                    <MapPin label="♻️ Ecoponto Vila Nova" position="left-[24%] top-[78%]" />
                                </div>
                                <div className="rounded-2xl border border-[#DEE3D2] bg-[#F5F7EE] p-4">
                                    <div className="flex items-center justify-between gap-2.5">
                                        <div><div className="text-[0.85rem] font-bold">Padaria Verde · 350m</div><div className="text-[0.68rem] text-[#5A6B7F]">Check-in + foto no balcão</div></div>
                                        <div className="text-xs font-bold text-[#B9832A]">+25 pts</div>
                                    </div>
                                    <button type="button" onClick={() => verifyMission(4)} className={`mt-2 rounded-full border-0 px-3 py-1.75 text-[0.7rem] font-bold text-white ${verifiedMissions.includes(4) ? "bg-[#38A169]" : "bg-[#5360FF]"}`}>
                                        {verifiedMissions.includes(4) ? "✅ Check-in feito · +25 pts" : "Fazer check-in"}
                                    </button>
                                </div>
                                <button type="button" onClick={() => setExpandedMerchantNote((visible) => !visible)} className="border-0 bg-transparent py-1 text-left text-xs font-bold text-[#38A169]">
                                    Por que isso importa pro comércio local ⌄
                                </button>
                                {expandedMerchantNote && <p className="text-xs leading-normal text-[#5A6B7F]">Quem vem só para a foto acaba conhecendo o local. A visão é o comerciante virar usuário ECOPlay, com plano próprio e missões no ponto dele.</p>}
                            </section>
                        )}

                        {activeScreen === "guildas" && (
                            <section className="h-full overflow-y-auto px-5 pb-5 pt-2.5">
                                <div className="mb-3.5 rounded-2xl bg-[#6B46C1] p-4 text-white">
                                    <div className="text-[0.7rem] font-bold uppercase tracking-wider text-[#C3DEB4]">Sua guilda</div>
                                    <h3 className="my-1 text-base font-extrabold">🌲 Pinheiros do Butantã</h3>
                                    <div className="text-xs opacity-85">128 membros</div>
                                    <span className="mt-1.5 inline-block rounded-full bg-white/15 px-2.5 py-1 text-[0.65rem] font-bold">Temporada 3 termina em 4 dias</span>
                                </div>
                                <PrototypeHeading>Ranking da temporada</PrototypeHeading>
                                <div className="rounded-2xl border border-[#DEE3D2] bg-[#F5F7EE] p-4">
                                    {[
                                        ["1º", "Guilda Rio Verde", "18.400"],
                                        ["2º", "Guilda Vila Sol", "16.900"],
                                        ["3º", "Pinheiros do Butantã (você)", "15.100"],
                                        ["4º", "Guilda Beira-Mar", "12.850"],
                                    ].map(([position, name, points]) => <div key={position} className={`flex items-center gap-2.5 border-b border-[#DEE3D2] py-2 last:border-0 ${position === "3º" ? "rounded-lg bg-white px-2.5" : ""}`}><span className="w-5.5 text-center text-xs font-extrabold text-[#5A6B7F]">{position}</span><span className="flex-1 text-xs font-bold">{name}</span><span className="text-xs font-extrabold text-[#B9832A]">{points}</span></div>)}
                                </div>
                                <PrototypeHeading>Meta da guilda</PrototypeHeading>
                                <div className="rounded-2xl border border-[#DEE3D2] bg-[#F5F7EE] p-4">
                                    <div className="text-[0.85rem] font-bold">500 check-ins em comércios parceiros essa semana</div>
                                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#DEE3D2]"><span className="block h-full w-[47%] bg-[#38A169]" /></div>
                                    <div className="mt-1 text-[0.68rem] text-[#5A6B7F]">235 / 500</div>
                                </div>
                            </section>
                        )}

                        {activeScreen === "recompensas" && (
                            <section className="h-full overflow-y-auto px-5 pb-5 pt-2.5">
                                <PrototypeHeading>Troque seus pontos</PrototypeHeading>
                                {[
                                    ["💧 10% na conta de água", "Benefício SoulUp", "300 pts"],
                                    ["⚡ 15% na conta de luz", "Benefício SoulUp", "400 pts"],
                                    ["🏪 Cupom em comércio parceiro", "Rede local ECOPlay", "150 pts"],
                                ].map(([name, meta, points]) => <RewardCard key={name} name={name} meta={meta} points={points} />)}
                                <RewardCard name="☀️ Desconto em energia solar" meta="Parceria com a Prospera — a validar" points="a definir" concept />
                            </section>
                        )}
                    </div>

                    {activeScreen !== "onboarding" && (
                        <nav className="flex border-t border-[#DEE3D2] bg-white px-2 pb-3.5 pt-2.5">
                            {navItems.map((item) => (
                                <button key={item.screen} type="button" onClick={() => activateScreen(item.screen)} className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl border-0 px-0.5 py-1.5 text-[0.64rem] font-bold ${activeScreen === item.screen ? "bg-[#F5F7EE] text-[#5360FF]" : "bg-transparent text-[#5A6B7F]"}`}>
                                    <span className="text-lg">{item.icon}</span>{item.label}
                                </button>
                            ))}
                        </nav>
                    )}
                </div>
            </div>

            <aside className="w-full min-[761px]:max-w-90 min-[761px]:flex-1">
                <div className="mb-3.5 flex flex-wrap gap-3.5 text-[0.68rem] text-[#5A6B7F]">
                    <span>✅ construir de verdade</span><span>💡 mostrar como conceito</span>
                </div>
                <div className="rounded-2xl border border-[#DEE3D2] bg-white p-4.5">
                    <div className={`mb-2.5 inline-block rounded-full px-2.5 py-1 text-[0.68rem] font-extrabold ${currentNote.status === "ok" ? "bg-[#DCEEDD] text-[#6B46C1]" : currentNote.status === "concept" ? "bg-[#FDEBD8] text-[#B9832A]" : "bg-[#EFE3F3] text-[#5B3A9C]"}`}>{currentNote.label}</div>
                    <h3 className="mb-2 text-base font-extrabold text-[#6B46C1]">{currentNote.title}</h3>
                    <p className="m-0 text-[0.82rem] leading-relaxed text-[#5A6B7F]">{currentNote.text}</p>
                </div>
            </aside>

            {lootbox && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f1e14]/55 p-5">
                    <div className="relative w-full max-w-80 rounded-[26px] bg-white p-7 text-center">
                        <button type="button" onClick={() => setLootbox(null)} className="absolute right-4 top-3.5 border-0 bg-transparent text-lg text-[#5A6B7F]" aria-label="Fechar lootbox">✕</button>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#38A169]">Lootbox Ecológica</div>
                        {!lootResult ? (
                            <>
                                <div className="my-4 text-[3.4rem]">{lootbox === "comum" ? "🟦" : lootbox === "raro" ? "🟪" : "🟨"}</div>
                                <button type="button" onClick={revealLoot} className="rounded-full border-0 bg-[#5360FF] px-5.5 py-3 text-sm font-bold text-white">Abrir</button>
                            </>
                        ) : (
                            <>
                                <div className="my-4 inline-block rounded-full px-3.5 py-1.5 text-xs font-extrabold text-white" style={{ background: lootResult.color }}>{lootResult.rarity}</div>
                                <p className="my-1.5 font-bold">{lootResult.text}</p>
                                <p className="text-xs text-[#5A6B7F]">Recompensa creditada na sua conta ECOPlay</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function PrototypeHeading({ children }: { children: string }) {
    return <h2 className="my-3 text-base font-extrabold text-[#6B46C1]">{children}</h2>;
}

function GuildSummary({ onOpen }: { onOpen: () => void }) {
    return (
        <div className="mb-3.5 rounded-2xl bg-linear-to-br from-[#5360FF] to-[#6B46C1] p-4 text-white">
            <div className="text-[0.7rem] font-bold text-[#C3DEB4]">Sua guilda</div>
            <h3 className="my-1 text-base font-extrabold">Pinheiros do Butantã</h3>
            <div className="my-2 h-1.5 overflow-hidden rounded-full bg-white/25"><span className="block h-full w-[64%] bg-[#E3A83B]" /></div>
            <div className="flex items-center justify-between text-[0.72rem]"><span>3º lugar · Temporada 3</span><button type="button" onClick={onOpen} className="border-0 bg-transparent p-0 text-xs font-bold text-white underline">Ver guilda</button></div>
        </div>
    );
}

function LootboxTeaser({ icon, title, subtitle, points, onOpen }: { icon: string; title: string; subtitle: string; points: string; onOpen: () => void }) {
    return <div className="mb-2 flex items-center justify-between rounded-2xl bg-linear-to-br from-[#3A2A55] to-[#5B3A7A] p-3.5 text-white"><div className="flex items-center gap-2.5"><span className="text-[1.7rem]">{icon}</span><div><div className="text-[0.82rem] font-bold">{title}</div><div className="text-[0.68rem] opacity-80">{subtitle}</div></div></div><div className="text-right"><div className="text-[0.82rem] font-extrabold">{points}</div><button type="button" onClick={onOpen} className="mt-1 rounded-full border-0 bg-[#E3A83B] px-3.5 py-2 text-[0.72rem] font-extrabold text-[#3B2705]">Abrir</button></div></div>;
}

function StatBox({ value, label }: { value: string; label: string }) {
    return <div className="flex-1 rounded-xl border border-[#DEE3D2] bg-white p-2.5"><b className="block text-sm">{value}</b><span className="text-[0.66rem] text-[#5A6B7F]">{label}</span></div>;
}

function MapPin({ label, position, you = false }: { label: string; position: string; you?: boolean }) {
    return <span className={`absolute ${position} rounded-full border border-[#DEE3D2] bg-white px-2.5 py-1 text-[0.66rem] font-bold shadow-[0_6px_14px_rgba(0,0,0,0.15)] ${you ? "bg-[#5360FF] text-white" : ""}`}>{label}</span>;
}

function RewardCard({ name, meta, points, concept = false }: { name: string; meta: string; points: string; concept?: boolean }) {
    return <div className={`mb-3.5 flex items-center justify-between gap-2.5 rounded-2xl border p-4 ${concept ? "border-dashed border-[#C1512F] bg-[#FBF1EC]" : "border-[#DEE3D2] bg-[#F5F7EE]"}`}>{<div>{concept && <span className="mb-1 inline-block rounded-full bg-[#C1512F] px-2 py-0.5 text-[0.6rem] font-extrabold text-white">💡 Conceito em validação</span>}<div className="text-[0.82rem] font-bold">{name}</div><div className="mt-0.5 text-[0.68rem] text-[#5A6B7F]">{meta}</div></div>}<div className="whitespace-nowrap text-xs font-extrabold text-[#B9832A]">{points}</div></div>;
}

export default EcoplayPrototype;
