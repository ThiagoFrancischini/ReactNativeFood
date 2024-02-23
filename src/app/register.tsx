import { Button } from "@/components/button";
import { Entry } from "@/components/entry";
import { useState } from "react";
import { View,Text, ScrollView, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Registro(){

    const [user, setUser] = useState(null);

    return(
        <View className="flex-1 pt-8">            
            <Image source={require("@/assets/logo.png")} className="h-6 w-32 m-5"></Image>

            <KeyboardAwareScrollView>
                <ScrollView className="flex-1 pt-8 mb-20">
                    <View>
                        <Text className="text-white font-body text-2xl font-bold w-full text-center mb-4">Faça o seu registro!</Text>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">CPF</Text>
                        <Entry></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Nome</Text>
                        <Entry></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Email</Text>
                        <Entry></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Telefone</Text>
                        <Entry></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Endereço</Text>
                        <Entry></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Senha</Text>
                        <Entry></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Confirmar Senha</Text>
                        <Entry></Entry>

                        <Button className="mx-4 my-5">
                            <Button.Text>Registrar</Button.Text>
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        </View>
    )    
}