import { View, Image , Text, TouchableOpacity} from "react-native"
import {Feather, MaterialIcons } from "@expo/vector-icons"
import colors from "tailwindcss/colors"
import {Link} from "expo-router"


type HeaderProps = {
    title : string
    cartQuantityItems?: number
    showOrders?: boolean
}
export function Header({title, cartQuantityItems = 0, showOrders = true}: HeaderProps){
    return (
        <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
            <View className="flex-1">
                <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
                <Text className="text-white text-xl font-heading mt-2 ">{title}</Text>
            </View>

            <View className="flex-row">

                {showOrders && (
                    <Link href="/orders" asChild>

                    <TouchableOpacity activeOpacity={0.7} className="mt-4 mr-5">                        
                        <MaterialIcons name="delivery-dining" size={24} color={colors.white}/>
                    </TouchableOpacity> 
                    </Link>    
                )}                

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
                                        z-10
                                        -right-3.5">

                            <Text className="text-slate-900 font-bold text-xs">{cartQuantityItems}</Text>
                        </View>
                        
                        <Feather name="shopping-bag" color={colors.white} size={24}/>                    
                    </TouchableOpacity> 
                </Link>
                )}           
            </View>                        
        </View>
    )
}