export interface Product {
    name: string;
    price: number;
    description: string;
    weight: number;
}

export interface DeleteRO {
    ok: string,
    count: number,
}