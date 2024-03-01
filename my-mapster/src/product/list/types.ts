export interface IProductItem {
    id?: number | undefined;
    name: string,
    price: string,
    description: string,
    files: string[],
    category: string,
    categoryId: number,
}

export interface IGetProducts {
    list: IProductItem[],
    totalCount: number
}

export interface IProductSearch {
    name?: string,
    description?: string,
    category?: string,
    page: number,
    size: number
}

