import { Photo } from "./Photo";

export interface IFolder {
    id: number;
    name: string;
    icon?: string;
    folders: IFolder[];
    photos: Photo[];
}
