import { Header } from "@/components/header";
import Order from "@/components/order";
import { View , Text, FlatList} from "react-native";
import {useState, useEffect} from 'react'
import { OrderProps } from "@/types/order-type";
import { getPedidos } from "@/services/OrderApi";
import { Loading } from "@/components/loading";
import { ProductProps } from "@/types/menu-type";

export default function Orders(){
    const [orders, setOrders] = useState<OrderProps[]>([]);        
    const [loading, setLoading] = useState<boolean>(true);

    async function fetchOrders(){
        try {         
            setLoading(true);            

            let retornoPedidos = await getPedidos();              

            if(retornoPedidos && retornoPedidos.length > 0){                                
                setOrders(retornoPedidos);                
            }                
        }
        catch(error: any) {               
            console.log(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=> {                  
        fetchOrders();
    }, []);

    let hasOrders: boolean = orders.length > 0 ? true : false;

    if(loading){
        return <Loading/>
    }

    return(
        <View className="flex-1 pt-8 bg-slate-900 pb-20">            

            <Header title="Seus Pedidos" showDrawerMenu></Header>
            
            {!hasOrders && 
            (
                <Text className="text-white font-subtitle text-center mt-10">Seus pedidos em aberto aparecerão aqui!</Text>
            )}
                       
            <FlatList 
                data={orders}                
                keyExtractor={(order) => order.id.toString()}
                renderItem={({item}) => <Order {...item} ></Order>}                
                className="mt-10"
                contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
                showsHorizontalScrollIndicator={false}
            />                                       
        </View>
    )
}