export type Screen = "home" | "missoes" | "mapa" | "guildas" | "recompensas";

export type LootboxRank = "comum" | "raro" | "lendario";

export type NoteStatus = "ok" | "concept" | "mixed";

export interface Mission {
    icon: string;
    title: string;
    points: string;
    tag: string;
    action: string;
}

export interface Note {
    status: NoteStatus;
    label: string;
    title: string;
    text: string;
}

export interface RewardOutcome {
    rarity: string;
    color: string;
    text: string;
}
