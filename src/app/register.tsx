import { Button } from "@/components/button";
import { Entry } from "@/components/entry";
import { insert } from "@/services/UserApi";
import { ErrorProps } from "@/types/error-type";
import { UserProps, UserProp } from "@/types/user-type";
import { useState } from "react";
import { View,Text, ScrollView, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Registro(){        

    const [error, setError] = useState<ErrorProps>({
        exists: false,
        message: '',
    })

    const [user, setUser] = useState({
        id: '',
        email: '',
        nome: '',
        cpf: '',
        password: '',
        endereco: '',
        autenticado: false,
        telefone: '',
    });

    const [confirmedPassword, setConfirmedPassword] = useState('');

    const handleUser = (field: string, value: string) => {
        setUser({ ...user, [field]: value });
    }

    async function submit(user: UserProp, confirmedPassword: string){
        try{
            if(!user){
                return;
            }        
    
            if(user.password !== confirmedPassword){
                throw new Error("Senhas não conferem")
            }             

            await insert([user]);
        }
        catch(error: any){         
            console.log(error.message)   
            setError({exists: true, message: error.message})
        }        
    }


    return(
        <View className="flex-1 pt-8">            
            <Image source={require("@/assets/logo.png")} className="h-6 w-32 m-5"></Image>

            <KeyboardAwareScrollView>
                <ScrollView className="flex-1 pt-8 mb-20">
                    <View>
                        <Text className="text-white font-body text-2xl font-bold w-full text-center mb-4">Faça o seu registro!</Text>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">CPF</Text>
                        <Entry onChangeText={(text) => handleUser('cpf', text)}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Nome</Text>
                        <Entry onChangeText={(text) => handleUser('nome', text)}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Email</Text>
                        <Entry onChangeText={(text) => handleUser('email', text)}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Telefone</Text>
                        <Entry onChangeText={(text) => handleUser('telefone', text)}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Endereço</Text>
                        <Entry onChangeText={(text) => handleUser('endereco', text)}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Senha</Text>
                        <Entry onChangeText={(text) => handleUser('password', text)}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Confirmar Senha</Text>
                        <Entry onChangeText={(text) => setConfirmedPassword(text)}></Entry>

                        {error.exists && 
                            <Text className="text-red-500 font-body text-sl font-bold w-full text-center mb-4 my-2">{error.message}</Text>   
                        }

                        <Button className="mx-4 my-5" onPress={() => submit(user, confirmedPassword)}>
                            <Button.Text>Registrar</Button.Text>
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        </View>
    )    
}