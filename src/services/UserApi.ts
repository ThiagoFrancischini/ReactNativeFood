import axios from "axios";
import api from "./Api";
import { UserProp } from "@/types/user-type";
import { Alert, Platform } from "react-native";
import { usePushNotifications } from "../../usePushNotifications";

export async function authenticate(cpf: string, password: string) : Promise<UserProp>{     

    try{        
        const response = await api.post('/usuario/autenticar', 
        {
            "cpf": cpf, 
            "password": password}
        );                                  

        if (response.status === 400) {
            throw("Falha na autenticação");
        }                        

        return response.data;
    }
    catch(error : any){         
        throw error.response.data;
    }    
}

export async function insert(usuario: UserProp) {    
    try{        
        
        usuario.id = '00000000-0000-0000-0000-000000000000';              
        const response = await api.post('/usuario',usuario);                 
        return response.data;
    }
    catch(error : any){       
        Alert.alert(error.response.data) 
        return error.response.data;
    }
}

export async function sendNotificationToken(userId : string, token : string){
    try{        
        const deviceOS = Platform.OS;     

        const content = {
            UsuarioId: userId,
            ExpoToken: token,
            DeviceOS: deviceOS 
        };

        const response = await api.post('/usuario/NotificationToken', content);  

        return response.data;
    }
    catch(error : any){     
        Alert.alert(error)         
    }
}