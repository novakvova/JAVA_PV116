export interface IProductItem {
    id?: number | undefined;
    name: string,
    price: string,
    description: string,
    files: string[],
    category: string,
    category_id: number,
}

export interface IGetProducts {
    list: IProductItem[],
    totalCount: number
}

export interface IProductSearch {
    name?: string,
    description?: string,
    categoryId?: string,
    page: number,
    size: number
}

