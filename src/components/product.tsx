import { Image, ImageProps, TouchableOpacity, TouchableOpacityProps, View , Text} from "react-native";
import { forwardRef } from "react";

type ProductDataProps = {
    title: string,
    description: string,
    thumbnail: ImageProps,
    quantity?: number,
}

type ProductProps = TouchableOpacityProps & {
    data: ProductDataProps
}

export const Product = forwardRef<TouchableOpacity, ProductProps>(({data, ...rest}, ref) => {
    return(
        <TouchableOpacity className="w-full flex-row items-center pb-4"
                          ref={ref}
                          {...rest}                          
                          activeOpacity={0.7}>

            {(data.thumbnail.toString() != undefined && data.thumbnail.toString() != "") &&
                <Image source={{uri: data.thumbnail.toString()}} progressiveRenderingEnabled className="w-20 h-20 rounded-md"/>
            }            

            <View className="flex-1 ml-3">

                <View className="flex-row items-center">
                    <Text className="text-slate-100 font-subtitle text-base flex-1">{data.title}</Text>

                    {data.quantity && <Text className="text-slate-400 font-subtitle text-sm">x {data.quantity}</Text>}
                </View>                

                <Text className="text-slate-400 text-xs leading-5 mt-0.5">{data.description}</Text>
            </View>
        </TouchableOpacity>
    )
})