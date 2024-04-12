import { View, Text, FlatList, Modal, Touchable, Alert, Pressable } from "react-native";
import { OrderProps, OrderStatus } from "../types/order-type"
import { ProductCartProps } from "@/stores/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import * as ImagePicker from "expo-image-picker";
import { CategoryButton } from "./category-button";
import { confirmarEntrega } from "@/services/OrderApi";
import { router } from "expo-router";
import { orderStatusString } from "@/utils/functions/enumDescriptors";
import { FormatCurrency } from "@/utils/functions/format-currency";
import { FormatDate } from "@/utils/functions/format-date";
export default function Order(item: OrderProps){

    const statusString = orderStatusString(item.statusPedido);
    const precoTotal = FormatCurrency(item.precoTotal);    
    const dataTotal = FormatDate(new Date(item.dataInclusao));
    const [produtosCart, setProducs] = useState<ProductCartProps[]>([]);  
    const [modalAnexoVisible, setModalAnexoVisible] = useState(false);    
    
    enum tipoAnexo {    
        camera,
        galeria
    }

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

    async function confirmacaoPedidoClicked(){

        try{
            const responseCamera = await ImagePicker.requestCameraPermissionsAsync();
            const responseLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if(!responseCamera.granted || !responseLibrary.granted){
                throw new Error("Conceda as permissões de camera e galeria");
            }

            setModalAnexoVisible(true);            
        }
        catch(Error: any){

        }        
        return;
    }

    async function concluiPedido(tipo : tipoAnexo){
        try{                                    
            let foto : ImagePicker.ImagePickerResult;

            if(tipo === tipoAnexo.camera){
                foto = await ImagePicker.launchCameraAsync({base64: true, allowsMultipleSelection: false});                
            }
            else{
                foto = await ImagePicker.launchImageLibraryAsync({base64: true, allowsMultipleSelection: false});
            }

            if(!foto || foto.canceled || !foto.assets || !foto.assets.length){
                return;
            }
            
            for(let i = 0; i < foto.assets.length; i++){                
                if(!item){
                    return;
                }

                item = {...item, fotoEntrega:  foto.assets[i].base64}                          
                                
                await confirmarEntrega(item);                                                                                                 
 
                router.replace("/drawer.routes")

                return;
            }

        }
        catch(Error: any){
            Alert.alert(Error.message);
        }
    }

    return(
        <View className="w-full border border-lime-300 rounded-md p-2 flex-1 ">

            <Modal visible={modalAnexoVisible}                                      
                   animationType="slide"
                   transparent                             
                   onRequestClose={() => {setModalAnexoVisible(false)}}>
                                        
                <View className="flex-1 justify-center items-center ">
                    <View className="border-white rounded-lg h-100 items-center bg-slate-900 border-2 p-5 shadow-lg shadow-lime-400">
                        <View className="flex-row justify-between mb-4">
                            <Pressable onPress={() => {setModalAnexoVisible(false); concluiPedido(tipoAnexo.camera)}}>
                                <View className="border-lime-400 border-2 p-4 mr-4 rounded-lg items-center">
                                    <Feather name="camera" color={colors.lime[400]} size={25}></Feather>
                                    <Text className="text-lime-400">Camera</Text>
                                </View>
                            </Pressable>

                            <Pressable  onPress={() => {setModalAnexoVisible(false); concluiPedido(tipoAnexo.galeria)}}>
                                <View className="border-lime-400 border-2 p-4  m rounded-lg items-center">
                                    <Feather name="image" color={colors.lime[400]} size={25}></Feather>
                                    <Text className="text-lime-400">Galeria</Text>
                                </View>
                            </Pressable>
                        </View>

                        <CategoryButton title="Voltar" className="bg-slate-900" onPress={() => setModalAnexoVisible(false)}/>                        
                    </View>                    

                </View>
            </Modal>

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
                            onPress={() => {confirmacaoPedidoClicked()}}>
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