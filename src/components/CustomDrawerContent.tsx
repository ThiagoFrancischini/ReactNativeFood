import { MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { View,Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors, { black } from "tailwindcss/colors";
import * as SecureStore from 'expo-secure-store';
import { getUserLogado, disableUser } from "@/stores/helpers/user-in-memory";
import { useState } from "react";
import { UserProp } from "@/types/user-type";

export default function CustomDrawerContent(props: any){
    const router = useRouter();    
    const {top, bottom} = useSafeAreaInsets();                
    const [user, setUser] = useState<UserProp | null>(null);

    getUserLogado().then((result)=>{
        setUser(result);
    });
    
    async function onLogoutPress(){
        try{            
            disableUser();
            router.replace("/")
        }
        catch(error: any){
            console.log(error)
            return;
        }
    }

    return (
        <View className="flex-1 bg-slate-900">

            {user != null && (

                <View className="bg-lime-400 items-center mb-5">
                    <Text className="text-slate-900 text-xl mt-10 mb-10">Bem vindo {user.nome}!</Text>
                </View>    

            )}
            
            <DrawerContentScrollView
                {...props}
                scrollEnabled={false}
                >
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>

            {user != null && (
                <TouchableOpacity activeOpacity={0.7} 
                                  style={{borderTopColor: colors.lime[400], borderTopWidth: 1, padding: 20, paddingBottom: 20 + bottom}} 
                                  className="flex-row items-center"
                                  onPress={onLogoutPress}>

                    <MaterialIcons name="logout" color={colors.lime[400]} size={24}></MaterialIcons>
                    <Text className="text-lime-400 text-lg ml-2 mb-0.5">Logout</Text>                    
                </TouchableOpacity>
            )}            
        </View>
    )
}