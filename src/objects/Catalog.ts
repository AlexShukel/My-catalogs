import { IFolder } from "./IFolder";
import { Photo } from "./Photo";

export interface Catalog {
    id: number;
    name: string;
    cover: string;
    folders: IFolder[];
    photos: Photo[];
}
