import { sendNotificationToken } from "@/services/UserApi";
import { UserProp } from "@/types/user-type";
import * as SecureStore from 'expo-secure-store';
import { usePushNotifications } from "../../../usePushNotifications";

var user: UserProp | null;

async function getUserLogado() : Promise<UserProp | null>{    
    if(!user || user == null){
        try{            
            const jsonObj = await SecureStore.getItemAsync("userSecureStore");
            if(jsonObj){
                user = JSON.parse(jsonObj) as UserProp;
                if(user){
                    return user;
                }
            }
            return null;
        }
        catch{
            return null;
        }        
    }

    return user;
}

async function setUser(newUser: UserProp){
    if(newUser){
        user = newUser;        
        await SecureStore.setItemAsync("userSecureStore", JSON.stringify(user));
    }    
}

async function disableUser(){
    user = null;

    try{        
        await SecureStore.deleteItemAsync("userSecureStore");
    }
    catch{
        return;
    }
}

export {getUserLogado, setUser, disableUser};