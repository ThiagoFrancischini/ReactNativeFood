import { ProductProps } from "@/types/menu-type";
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

export function remove(products: ProductCartProps[], productRemoveId: string){

    const updatedProducts = products.map((product) => 
        product.id === productRemoveId ? {
            ...product,
            quantity: product.quantity > 1 ? product.quantity - 1 : 0
        } : product 
    )
    

    return updatedProducts.filter((product) => product.quantity > 0)
}