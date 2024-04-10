import { View, Text, FlatList } from "react-native";
import { OrderProps, OrderStatus } from "../types/order-type"
import { FormatDate } from "@/utils/functions/format-date";
import { FormatCurrency } from "@/utils/functions/format-currency";
import { orderStatusString } from "@/utils/functions/enumDescriptors";
import { ProductCartProps } from "@/stores/cart-store";
import { useEffect, useState } from "react";
import { ProductProps } from "@/types/menu-type";

export default function Order(item: OrderProps){
    const statusString = orderStatusString(item.statusPedido);
    const precoTotal = FormatCurrency(item.precoTotal);    
    const dataTotal = FormatDate(new Date(item.dataInclusao));
    const [produtosCart, setProducs] = useState<ProductCartProps[]>([]);  

    useEffect(()=> {
        const produtoMap = new Map<string, number>();

        item.produtos.forEach(produto => {
            if (produtoMap.has(produto.id)) {

                const oldValue = produtoMap.get(produto.id);

                produtoMap.set(produto.id, oldValue? oldValue + 1 : 1);
            }
            else{
                produtoMap.set(produto.id, 1);
            }
        });

        const keys = produtoMap.keys();

        for(let chave in keys){
            const quantity = produtoMap.get(chave);
            const produto = item.produtos.find(x => x.id === chave);
            
            if(produto && quantity){
                const produtoMapeado : ProductCartProps = {
                    id: produto.id,
                    cover: produto.cover,
                    description: produto.description,
                    ingredients: produto.ingredients,
                    price: produto.price,
                    quantity:quantity,
                    thumbnail: produto.thumbnail,
                    title: produto.title,
                } 
    
                setProducs([...produtosCart, produtoMapeado])
            }            
        }
    })
    

    return(
        <View className="w-full border border-lime-300 rounded-md p-2">

            <View className="flex-row justify-between items-center">                
                <Text className="text-white font-title text-xl my-2">{precoTotal}</Text>  
                <Text className="text-slate-400  text-sm mr-1">{dataTotal}</Text>  
            </View>            

            {((produtosCart != null || produtosCart != undefined) && produtosCart.length > 0)  &&
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
            }            

            <Text className="text-white font-title text-sm my-2">Status: {statusString}</Text>
        </View>
    )    
}