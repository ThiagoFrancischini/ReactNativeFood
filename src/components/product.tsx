import { Image, ImageProps, TouchableOpacity, TouchableOpacityProps, View , Text} from "react-native";
import { forwardRef } from "react";

type ProductDataProps = {
    title: string,
    description: string,
    thumbnail: ImageProps
}

type ProductProps = TouchableOpacityProps & {
    data: ProductDataProps
}

export const Product = forwardRef<TouchableOpacity, ProductProps>(({data, ...rest}, ref) => {
    return(
        <TouchableOpacity className="w-full flex-row items-center pb-4"
                          {...rest}
                          ref={ref}
                          activeOpacity={0.7}
        >

            <Image source={data.thumbnail} className="w-20 h-20 rounded-md"/>

            <View className="flex-1 ml-3">
                <Text className="text-slate-100 font-subtitle text-base flex-1">{data.title}</Text>

                <Text className="text-slate-400 text-xs leading-5 mt-0.5">{data.description}</Text>
            </View>
        </TouchableOpacity>
    )
})