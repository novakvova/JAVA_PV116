export interface ICategoryCreate {
    name: string;
    file: File|undefined;
    description: string;
}

export interface IUploadedFile {
    originFileObj: File
}