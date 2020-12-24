import { Catalog } from "./Catalog";

export enum Language {
    EN = "EN",
    RU = "RU",
}

export interface AppData {
    catalogs: Catalog[];
    language: Language;
}
