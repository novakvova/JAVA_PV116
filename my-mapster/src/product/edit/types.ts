export interface IProductEditPhoto{
    photo: string | undefined,
    priority: number,
}

export interface IProductEdit {
    id?: number | undefined;
    name: string,
    price: string,
    description: string,
    newPhotos: IProductEditPhoto[] | null,
    oldPhotos: IProductEditPhoto[] | null,
    category_id: number,
}