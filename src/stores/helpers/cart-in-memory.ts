import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store";

export function add(products: ProductCartProps[], newProduct: ProductProps){
    const existingProduct = products.find(({id}) => newProduct.id === id);

    if(existingProduct){
       products.map((product) => existingProduct.id === product.id)

       let i : number
       for(i = 0; i < products.length; i++){
            if(products[i].id === existingProduct.id){
                products[i].quantity++;
                break;
            }
       }

       return products;
    }

    return [...products, {... newProduct, quantity: 1}]
}