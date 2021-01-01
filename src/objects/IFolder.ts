import { Photo } from "./Photo";

export interface IFolder {
    id: number;
    name: string;
    iconUrl?: string;
    folders: IFolder[];
    photos: Photo[];
}
