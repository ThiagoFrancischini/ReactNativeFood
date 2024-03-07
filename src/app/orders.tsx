import { Header } from "@/components/header";
import { LinkButton } from "@/components/link-button";
import { Loading } from "@/components/loading";
import Order from "@/components/order";
import { OrderProps, OrderStatus } from "@/types/order-type";
import { View , Text, FlatList} from "react-native";

export default function Orders(){

    const orders: OrderProps[] = [
        {
            id: 1,
            orderDate: new Date(Date.now()),
            location: "Softbyte",
            price: 100.67,
            itens: [
                {
                    quantity: 1,
                    product: {
                        id: "1",
                        title: "X-React",
                        price: 24.9,
                        description:
                        "Um hamburger tão bonito que me deu fome enquanto eu fazia esse layout para o projeto...",
                        cover: require("../assets/products/cover/1.png"),
                        thumbnail: require("../assets/products/thumbnail/1.png"),
                        ingredients: [
                        "Pão brioche;",
                        "2x carnes smash (blend da casa) de 80g;",
                        "Queijo cheddar;",
                        "Alface;",
                        "Tomate;",
                        "Picles;",
                        "Cebola;",
                        "Molho da casa;",
                        ],
                    }
                },
                {
                    quantity: 2,
                    product: {
                        id: "2",
                        title: "X-Cobol",
                        price: 24.9,
                        description:
                        "Um hamburger tão bonito que me deu fome enquanto eu fazia esse layout para o projeto...",
                        cover: require("../assets/products/cover/1.png"),
                        thumbnail: require("../assets/products/thumbnail/1.png"),
                        ingredients: [
                        "Pão brioche;",
                        "2x carnes smash (blend da casa) de 80g;",
                        "Queijo cheddar;",
                        "Alface;",
                        "Tomate;",
                        "Picles;",
                        "Cebola;",
                        "Molho da casa;",
                        ],
                    }
                },
            ],
            status: OrderStatus.Andamento
        },
    ]
    
    let hasOrders: boolean = orders.length > 0 ? true : false;

    return(
        <View className="flex-1 pt-8">
            
            <Header title="Seus Pedidos" showOrders={false}></Header>
            
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
            
            <View className="flex-1 items-center justify-end mb-20">                
                <LinkButton title="Voltar ao cardápio"  href=".."></LinkButton>
            </View>            
        </View>
    )
}