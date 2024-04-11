import { OrderProps } from "@/types/order-type";
import api from "./Api";
import { returnGuidEmpty } from "@/utils/functions/guid-functions";
import { getUserLogado } from "@/stores/helpers/user-in-memory";
import { ProductCartProps } from "@/stores/cart-store";


export async function insertOrder(order: OrderProps, products: ProductCartProps[]) {    
    try{        
        
        order.id = returnGuidEmpty();                         

        for(let produto of products){
            if(produto.quantity > 1){
                for (let i = 0; i < produto.quantity; i++){
                    order.produtos.push(produto);
                }
            }
            else{
                order.produtos.push(produto);
            }
        }

        const response = await api.post('/pedido', order);                    

        console.log(JSON.stringify(order))

        if (response.status !== 200) {
            throw(response.data);
        }
    }
    catch(error : any){       
        console.log(error.response.data) 
        throw error;
    }
}

export async function getPedidos() : Promise<OrderProps[]>{    
    try{        
        
        const user = await getUserLogado();

        var userId = returnGuidEmpty();

        if(user != null){
            userId = user.id;
        }        

        const response = await api.get('/pedido/' + userId);            
        
        if (response.status !== 200) {
            throw(response.data);
        }

        return response.data;
    }
    catch(error : any){       
        console.log(error.response.data) 
        throw error;
    }
}