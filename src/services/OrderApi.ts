import { OrderProps } from "@/types/order-type";
import api from "./Api";
import { returnGuidEmpty } from "@/utils/functions/guid-functions";
import { getUserLogado } from "@/stores/helpers/user-in-memory";


export async function insert(order: OrderProps) {    
    try{        
        
        order.id = returnGuidEmpty();                         

        const response = await api.post('/pedido', order);    
        
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