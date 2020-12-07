import { FileInfo } from "./FileInfo";
import { IFolder } from "./IFolder";
import { Photo } from "./Photo";

export interface Catalog {
    id: number;
    name: string;
    cover: FileInfo;
    folders: IFolder[];
    photos: Photo[];
}
