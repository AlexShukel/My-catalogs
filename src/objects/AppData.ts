import { Catalog } from "./Catalog";
import { Language } from "./Language";

export interface AppData {
    catalogs: Catalog[];
    language: Language;
}
