import { View, Image , Text, TouchableOpacity} from "react-native"
import {Feather, MaterialIcons } from "@expo/vector-icons"
import colors from "tailwindcss/colors"
import {Link} from "expo-router"
import { DrawerActions } from "@react-navigation/native"
import { useNavigation } from "expo-router"

type HeaderProps = {
    title : string,
    cartQuantityItems?: number,
    showDrawerMenu?: boolean,
}
export function Header({title, cartQuantityItems = 0, showDrawerMenu = false}: HeaderProps){

    const navigation = useNavigation();

    const onDrawerToogle = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
            <View className="flex-1">
                <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
                <Text className="text-white text-xl font-heading mt-2 ">{title}</Text>
            </View>

            <View className="flex-row">       

                { cartQuantityItems > 0 &&(
                <Link href="/cart" asChild>
                        <TouchableOpacity className="relative" activeOpacity={0.7}>
                        <View className="bg-lime-300 
                                        w-2-4
                                        h-4 
                                        rounded-full 
                                        items-center 
                                        justify-center
                                        top-2
                                        z-10">

                            <Text className="text-slate-900 font-bold text-xs">{cartQuantityItems}</Text>
                        </View>
                        
                        <Feather name="shopping-bag" color={colors.white} size={24}/>                    
                    </TouchableOpacity> 
                </Link>
                )}           

                {showDrawerMenu && (
                    <TouchableOpacity onPress={onDrawerToogle} 
                                      activeOpacity={0.7} 
                                      className="mt-4 
                                                 mr-5
                                                 -right-3.5">
                        <Feather name="menu" color={colors.white} size={24}/>                    
                    </TouchableOpacity>
                )}


            </View>                        
        </View>
    )
}