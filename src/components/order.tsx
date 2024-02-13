import { View, Text, FlatList } from "react-native";
import { OrderProps, OrderItensProps, OrderStatus } from "../types/order-type"
import { FormatDate } from "@/utils/functions/format-date";
import { FormatCurrency } from "@/utils/functions/format-currency";

export default function Order(item: OrderProps){

    return(
        <View className="w-full border border-lime-300 rounded-md p-2">

            <View className="flex-row justify-between items-center">
                <Text className="text-white font-title text-xl my-2">{FormatCurrency(item.price)}</Text>                                 
                <Text className="text-slate-400  text-sm mr-1">{FormatDate(item.orderDate)}</Text>                                                                                        
            </View>            

            <FlatList 
                data={item.itens}
                keyExtractor={(item) => item.product.id.toString()}
                renderItem={({item}) => 
                    <View className="flex-row">
                        <Text className="text-slate-400 text-sm mr-2">x{item.quantity} - {item.product.title}</Text>                        
                    </View>
                }                                
                className="ml-3 pb-2"
                contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
                showsHorizontalScrollIndicator={false}
            />

            <Text className="text-white font-title text-sm my-2">Status: {item.status}</Text>
        </View>
    )    
}