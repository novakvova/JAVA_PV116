export interface IBasketProduct {
    productId: number,
    productName: string,
    price: number,
    quantity: number,
    photos: string[],
    count: number,
}

export interface IAddBasketProduct {
    productId: number,
    count: number,
}

export interface IBasketState {
    items : IBasketProduct[],
    allPriceProducts: number,
}