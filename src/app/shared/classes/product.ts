// Products
export interface Product {
    id?: number;
    title?: string;
    description?: string;
    type?: string;
    brand?: string;
    collection?: any[];
    category?: string;
    price?: number;
    sale?: boolean;
    discount?: number;
    stock?: number;
    new?: boolean;
    quantity?: number;
    tags?: any[];
    variants?: Variants[];
    images?: Images[];
    rating?: number;
    // $id:string;
    // Id: Number;
    // fld_CategoryId: number;
    // fld_Color: string;
    // fld_CreateAt: Date
    // fld_Description:  string;
    // fld_Images:  string;
    // fld_ItemCode: string;
    // fld_Material:  string;
    // fld_Name:  string;
    // fld_Option: string;
    // fld_Pattern:  string;
    // fld_Price:  number;
    // fld_Quentity: number;
    // fld_Style:  string;
    // fld_UpdateAt: "2020-06-25T08:25:54.957"
    // fld_Width:  string;
}

export interface Variants {
    variant_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    image_id?: number;
}

export interface Images {
    image_id?: number;
    id?: number;
    alt?: string;
    src?: string;
    variant_id?: any[];
}