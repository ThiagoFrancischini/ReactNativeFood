import { View, Text, FlatList } from "react-native";
import { OrderProps, OrderStatus } from "../types/order-type"
import { FormatDate } from "@/utils/functions/format-date";
import { FormatCurrency } from "@/utils/functions/format-currency";
import { orderStatusString } from "@/utils/functions/enumDescriptors";
import { ProductCartProps } from "@/stores/cart-store";
import { useEffect, useState } from "react";
import { ProductProps } from "@/types/menu-type";
import { Button } from "./button";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

export default function Order(item: OrderProps){
    const statusString = orderStatusString(item.statusPedido);
    const precoTotal = FormatCurrency(item.precoTotal);    
    const dataTotal = FormatDate(new Date(item.dataInclusao));
    const [produtosCart, setProducs] = useState<ProductCartProps[]>([]);  

    useEffect(()=> {
        const produtosMapeados = item.produtos.map(produto => ({
            id: produto.id,
            cover: produto.cover,
            description: produto.description,
            ingredients: produto.ingredients,
            price: produto.price,
            quantity: item.produtos.filter(p => p.id === produto.id).length,
            thumbnail: produto.thumbnail,
            title: produto.title,
        }));        

        setProducs(produtosMapeados);
    }, [item]);    

    function confirmacaoPedidoClicked(pedidoId: string){
        return;
    }

    return(
        <View className="w-full border border-lime-300 rounded-md p-2">
            <View className="flex-row justify-between items-center">                
                <Text className="text-white font-title text-xl my-2">{precoTotal}</Text>  
                <Text className="text-slate-400  text-sm mr-1">{dataTotal}</Text>  
            </View>            

            {produtosCart.length > 0 && (
                <FlatList 
                    data={produtosCart}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => 
                        <View className="flex-row">                            
                            <Text className="text-slate-400 text-sm mr-2">{item.quantity}x</Text>                        
                            <Text className="text-slate-400 text-sm mr-2">{item.title}</Text>                        
                        </View>
                    }                                
                    className="ml-3 pb-2"
                    contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
                    showsHorizontalScrollIndicator={false}
                />
            )}            

            
                <View className="flex-row justify-between items-center">
                    <Text className="text-white font-title text-sm my-2">Status: {statusString}</Text>

                    {item.statusPedido !== OrderStatus.Finalizado ?
                        <Button className="pl-2" 
                                onPress={() => {confirmacaoPedidoClicked(item.id)}}>
                            <Button.Icon>
                                <Feather name="camera" size={20}/>
                            </Button.Icon>
                            <Button.Text>Confirmar Entrega</Button.Text>
                        </Button>
                        :

                        <View className="flex-row justify-between items-center">
                            <Feather name="check" color={colors.lime[400]} size={20}/>
                            <Text className="text-lime-400"> Concluído</Text>
                        </View>
                    }
                </View>                        
                
        </View>
    )    
}