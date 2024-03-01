export interface ICategoryCreate {
    name: string;
    file: File|undefined;
    description: string;
}

export interface IUploadedFile {
    originFileObj: File
}

export interface ICategoryItem {
    id: number;
    name: string;
    description: string;
    image: string;
}

export interface IGetCategories {
    content: ICategoryItem[],
    totalPages: number,
    totalElements: number,
    number: number
}

export interface ICategoryEdit {
    id: number;
    name: string;
    file: File|undefined;
    description: string;
}

export interface ICategorySearch{
    name: string,
    page: number,
    size: number
}

export interface ISelectItem {
    id: number,
    name: string
}