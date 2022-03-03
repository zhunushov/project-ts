export interface ProductState {
    products: any[],
    edit: any,
    loading: boolean,
    error: null | string;
    pagination: number
}

export enum ProductActionTypes{
    FETCH_PRODUCT = "FETCH_PRODUCT",
    PAGE_PRODUCT = "PAGE_PRODUCT",
    FETCH_PRODUCT_ERROR = "FETCH_PRODUCT_ERROR",
    FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS",
    FETCH_PRODUCT_UPDATE = "FETCH_PRODUCT_UPDATE"
}

interface FetchProductAction  {
    type: ProductActionTypes.FETCH_PRODUCT
}
interface FetchProductActionSuccess  {
    type: ProductActionTypes.FETCH_PRODUCT_SUCCESS;
    payload: any
}
interface FetchProductActionError{
    type: ProductActionTypes.FETCH_PRODUCT_ERROR;
    payload: string
}
interface FetchProductActionEdit{
    type: ProductActionTypes.FETCH_PRODUCT_UPDATE;
    payload: {}
}
export type ProductAction = FetchProductAction | FetchProductActionSuccess | FetchProductActionError | FetchProductActionEdit
