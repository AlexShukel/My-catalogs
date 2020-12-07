import { FileInfo } from "./FileInfo";
import { Photo } from "./Photo";

export interface IFolder {
    id: number;
    name: string;
    icon?: FileInfo;
    folders: IFolder[];
    photos: Photo[];
}
