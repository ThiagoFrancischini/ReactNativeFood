import { View, Image, Text } from "react-native";
import {useLocalSearchParams, useNavigation} from "expo-router"
import { FormatCurrency } from "@/utils/functions/format-currency";
import { Button } from "@/components/button";
import {Feather } from "@expo/vector-icons"
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";
import {Redirect} from "expo-router"
import { getMenu } from "@/stores/helpers/menu-in-memory";


export default function Product(){
    const menu = getMenu();    
    const products = menu.map((item) => item.data).flat();

    const cartStore = useCartStore();
    const { id }  = useLocalSearchParams();        

    const navigation = useNavigation();
    const product = products.find((item) => item.id == id);

    function handleAddToCart(){
        if(product){
            cartStore.add(product);
            navigation.goBack();
        }
    }

    if(!product){
        return <Redirect href="/"/>
    }

    return (
        <View className="flex-1">
            <Image source={{uri: product.cover.toString()}}
                   className="w-full h-52"
                   resizeMode="cover"/>            

            <View className="flex-1 p-5 mt-8">
                <Text className="text-white text-xl font-heading">{product.title}</Text>

                <Text className="text-lime-300 text-2xl font-heading my-2">
                    {FormatCurrency(product.price)}
                </Text>

                <Text className="text-slate-400 font-body text-base leading-6 mb-6">
                    {product.description}
                </Text>

                {
                    product.ingredients.map((ingredient)=>(
                        <Text key={ingredient} className="text-slate-400 leading-6 text-base font-body">
                            {"\u2022"}{ingredient}
                        </Text>
                    ))
                }
            </View>

            <View className="p-5 pb-8 gap-5">
                <Button onPress={handleAddToCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20}/>
                    </Button.Icon>

                    <Button.Text>
                        Adicionar ao Pedido
                    </Button.Text>
                </Button> 

                <LinkButton title="Voltar ao cardápio" href="/"></LinkButton>
            </View>
        </View>
    )
}