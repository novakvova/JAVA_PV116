export interface IProductItem {
    id?: number | undefined;
    name: string,
    price: string,
    description: string,
    files: string[],
    category: string,
    categoryId: number,
}

