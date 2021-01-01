import { IFolder } from "./IFolder";
import { Photo } from "./Photo";

export interface Catalog {
    id: number;
    name: string;
    coverUrl: string;
    folders: IFolder[];
    photos: Photo[];
}
