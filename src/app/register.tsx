import { Button } from "@/components/button";
import { Entry } from "@/components/entry";
import { insert } from "@/services/UserApi";
import { ErrorProps } from "@/types/error-type";
import { FormatCpf } from "@/utils/functions/format-cpf";
import { UserProp } from "@/types/user-type";
import { useEffect, useState } from "react";
import { View,Text, ScrollView, Image, Platform, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FormatPhone } from "@/utils/functions/format-phone";
import * as Location from 'expo-location';
import { LinkButton } from "@/components/link-button";
import { router } from "expo-router";
import { Loading } from "@/components/loading";

export default function Registro(){               
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
          
            try{
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log(status);
                    return;
                }
            
                const location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                const adress = await Location.reverseGeocodeAsync(location.coords);                    
                if(adress && adress.length > 0){                                       
                    setUser({
                        ...user,
                        rua: adress[0].street == null ? '' : adress[0].street,
                        bairro: adress[0].subregion == null ? '' : adress[0].subregion,
                        numero: adress[0].streetNumber == null ? '' : adress[0].streetNumber,
                        cidade: adress[0].city == null ? '' : adress[0].city
                      });
                }
            }
            catch(error : any){
                console.log(error);
            }          
        })();
      }, []);

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
        rua: '',
        bairro: '',
        cidade: '',
        numero: '',
        autenticado: false,
        complemento: '',
        telefone: '',
    });

    const [confirmedPassword, setConfirmedPassword] = useState('');

    const handleUser = (field: string, value: string) => {
        if(field === 'cpf'){
            value = FormatCpf(value)
        }

        if(field === 'telefone'){
            value = FormatPhone(value)
        }

        setUser({ ...user, [field]: value });
    }    

    async function submit(user: UserProp, confirmedPassword: string){
        try{          
            setLoading(true);      

            if(!user){
                return;
            }        
    
            if(user.password !== confirmedPassword){
                throw new Error("Senhas não conferem")
            }                         

            await insert(user);

            Alert.alert("Usuario cadastrado");

            router.back();
        }
        catch(error: any){         
            console.log(error.message)   
            setError({exists: true, message: error.message})
        }        
        finally{
            setLoading(false);      
        }
    }


    if(loading){
        return <Loading/>
    }

    return(
        <View className="flex-1 pt-8">            
            <Image source={require("@/assets/logo.png")} className="h-6 w-32 m-5"></Image>

            <KeyboardAwareScrollView>
                <ScrollView className="flex-1 pt-8 mb-20">
                    <View>
                        <Text className="text-white font-body text-2xl font-bold w-full text-center mb-4">Faça o seu registro!</Text>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">CPF</Text>
                        <Entry onChangeText={(text) => handleUser('cpf', text)} 
                               value={user.cpf} 
                               maxLength={14}
                               keyboardType="numeric">
                        </Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Nome</Text>
                        <Entry onChangeText={(text) => handleUser('nome', text)} value={user.nome}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Email</Text>
                        <Entry onChangeText={(text) => handleUser('email', text)} value={user.email}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Telefone</Text>
                        <Entry onChangeText={(text) => handleUser('telefone', text)} value={user.telefone} maxLength={15} keyboardType="numeric"></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Bairro</Text>
                        <Entry onChangeText={(text) => handleUser('cidade', text)} value={user.cidade}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Cidade</Text>
                        <Entry onChangeText={(text) => handleUser('bairro', text)} value={user.bairro}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Rua</Text>
                        <Entry onChangeText={(text) => handleUser('rua', text)} value={user.rua}></Entry>
                        
                        <Text className=" ml-4 text-white font-body text-lg font-bold">Numero</Text>
                        <Entry onChangeText={(text) => handleUser('numero', text)} value={user.numero}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Complemento</Text>
                        <Entry onChangeText={(text) => handleUser('complemento', text)} value={user.complemento}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Senha</Text>
                        <Entry onChangeText={(text) => handleUser('password', text)} value={user.password}></Entry>

                        <Text className=" ml-4 text-white font-body text-lg font-bold">Confirmar Senha</Text>
                        <Entry onChangeText={(text) => setConfirmedPassword(text)}></Entry>

                        {error.exists && 
                            <Text className="text-red-500 font-body text-sl font-bold w-full text-center mb-4 my-2">{error.message}</Text>   
                        }

                        <Button className="mx-4 my-5" onPress={() => submit(user, confirmedPassword)}>
                            <Button.Text>Registrar</Button.Text>
                        </Button>

                        <LinkButton href=".." title="Voltar">
                        </LinkButton>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        </View>
    )    
}