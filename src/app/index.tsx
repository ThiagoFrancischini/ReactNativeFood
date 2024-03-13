import { Entry } from "@/components/entry";
import { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { FormatCpf } from "@/utils/functions/format-cpf";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { authenticate } from "@/services/UserApi";
import { router } from "expo-router";
import 'react-native-gesture-handler'
import { getUserLogado, setUser } from "@/stores/helpers/user-in-memory";
function goToHome(){
    router.replace("/drawer.routes");        
}

async function getCurrentUser() : Promise<boolean>{    
    try{

        const jsonObj = await getUserLogado();
    
        if(jsonObj){
            if(jsonObj.autenticado){
                return true;
            }
        }                
    
        return false;
    }
    catch{
        return false;
    }    
}

export default function Login(){


    getCurrentUser().then((result) => {
        if(result){
            goToHome();            
        }
    })    

    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [sucessLogin, setSucessLogin] = useState(true);

    const handleCpfChange = (cpf : string) => {
        setCpf(FormatCpf(cpf));
    }

    const handlePasswordChange = (password : string) => {
        setPassword(password);
    }

    async function onAuthenticate(cpf : string, password : string){
        try{            
            let user = await authenticate(cpf, password);
    
            if(user == undefined || user == null){
                throw("Cpf ou senha inválidos");
            }                             

            setSucessLogin(true);            

            setUser(user);                                          

            goToHome();

            return;
        }
        catch(error){
            setSucessLogin(false);
        }
    }    
    
    return(              
        <View className="flex-1 pt-5">
            <Image source={require("@/assets/logo.png")} className="h-6 w-32 m-5"></Image> 

            <View className="flex-1 justify-center">                    

                <Text className="text-white font-body text-4xl font-bold w-full text-center mb-4">Bem vindo!</Text>

                <Text className="text-slate-400 font-body text-sl font-bold w-full text-center mb-4 my-2">Por favor realize seu login</Text>

                <Text className=" ml-4 text-white font-body text-lg font-bold">CPF</Text>

                <Entry value={cpf}
                    maxLength={14}
                    keyboardType="numeric"
                    onChangeText={handleCpfChange}>
                </Entry>

                <Text className=" ml-4 text-white font-body text-lg font-bold">Senha</Text>

                <Entry secureTextEntry                    
                    value={password}
                    onChangeText={handlePasswordChange}>
                </Entry>

                <Button className="mx-4 mt-10" onPress={() => onAuthenticate(cpf, password)}>
                    <Button.Text>Login</Button.Text>
                </Button>

                {sucessLogin == false && (
                    <Text className="text-red-500 font-body text-sl font-bold w-full text-center mb-4 my-2">Dados inválidos</Text>   
                )}                    

                <LinkButton title="Primeiro registro" href="/register" className="mt-5"></LinkButton>            
            </View>         
        </View>                
    )
}