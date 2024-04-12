import { Header } from "@/components/header";
import { View, Text, ScrollView, Alert } from "react-native";
import { Product } from "@/components/product";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { FormatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { useState } from "react";
import { useNavigation } from "expo-router";
import { OrderProps, OrderStatus } from "@/types/order-type";
import { getUserLogado } from "@/stores/helpers/user-in-memory";
import { insertOrder } from "@/services/OrderApi";

const PHONE_NUMBER = "INFORMAR AQUI"

export default function Cart(){
    const [observacoes, setObservacoes] = useState("");
    const cartStore = useCartStore();
    const navigation = useNavigation();

    const total = FormatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0));

    function handleProductRemove(product: ProductCartProps){
        Alert.alert("Remover", "Deseja remover " + product.title + " do carrinho?", [
            {
                text: "Cancelar",
            },
            {
                text: "Remover",
                onPress: () => cartStore.remove(product.id)
            }
        ])
    }

    async function handleOrder(){
        try{
            /*if(adress.trim().length === 0){
                return Alert.alert("Pedido", "Informe os dados da entrega");
            }*/
    
            const products = cartStore.products.map((product) => '\n ' + product.quantity + " " + product.title).join("") 
    
            const order: OrderProps = {
                id: "",
                dataInclusao: new Date(),
                produtos: [],
                precoTotal: cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0),
                statusPedido: OrderStatus.EmAnalise,
                usuario: await getUserLogado(),
            }
                
            await insertOrder(order, cartStore.products);                            
    
            Alert.alert("Novo pedido", "Pedido enviado para análise!")
    
            cartStore.clear(); 
            
            navigation.goBack();
        }
        catch(error: any)
        {
            Alert.alert("Erro", error.message);

            navigation.goBack();
        }        
    }


    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho"/>

            <KeyboardAwareScrollView>
                <ScrollView>
                    <View className="p-5 flex-1">
                        {cartStore.products.length > 0 ? (
                            <View className="border-b border-slate-700">
                            {
                                cartStore.products.map((product) => (
                                    <Product key={product.id} data={product} onPress={() => handleProductRemove(product)}/>
                                ))
                            }
                        </View>
                        ) : (
                        <Text className="font-body text-slate-400 text-center my-8">Seu carrinho está vazio!</Text>    
                        )}            

                        <View className="flex-row gap-2 items-center mt-5 mb-4">
                            <Text className="text-white text-xl font-subtitle"> Total: </Text>

                            <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
                        </View>

                        <Input placeholder="Informe as observações..."                               
                               onChangeText={setObservacoes}>
                        </Input>

                        <Text className="text-sm items-center text-white w-100 text-center m-4" >Os dados de entrega serão os vinculados ao usuário</Text>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar pedido</Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20}/>
                    </Button.Icon>
                </Button>

                <LinkButton title="Voltar ao cardápio" href=".."></LinkButton>
            </View>
        </View>
    )
}