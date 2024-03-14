import { Header } from "@/components/header";
import Order from "@/components/order";
import { getUserLogado } from "@/stores/helpers/user-in-memory";
import { View , Text, FlatList} from "react-native";
import {useState, useEffect} from 'react'
import { OrderProps } from "@/types/order-type";
import { getPedidos } from "@/services/OrderApi";

export default function Orders(){
    const [orders, setOrders] = useState<OrderProps[]>([]);    

    useEffect(()=> {
        async()=>{
            try
            {
                let retornoPedidos = await getPedidos();
                
                if(retornoPedidos && retornoPedidos.length > 0){
                    setOrders(retornoPedidos);
                }
            }
            catch(error: any)
            {   
                console.log(error);
            }
        }
    });

    let hasOrders: boolean = orders.length > 0 ? true : false;

    return(
        <View className="flex-1 pt-8 bg-slate-900">
            
            <Header title="Seus Pedidos" showDrawerMenu></Header>
            
            {!hasOrders && 
            (
                <Text className="text-white font-subtitle text-center mt-10">Seus pedidos aparecerão aqui!</Text>
            )}
                       
            <FlatList 
                data={orders}
                keyExtractor={(order) => order.id.toString()}
                renderItem={({item}) => <Order {...item}></Order>}                
                className="mt-10"
                contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
                showsHorizontalScrollIndicator={false}
            />                         
            
   
        </View>
    )
}