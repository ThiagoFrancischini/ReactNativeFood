import { TextInput, TextInputProps, View } from "react-native";
import colors from "tailwindcss/colors";

export function Entry({... rest} : TextInputProps){
    return(
        <View className="border-b-2 border-lime-300 mx-4 mb-5">
            <TextInput                       
                {...rest}                        
                placeholderTextColor={colors.slate[400]}                
                className="rounded-md font-body text-lg pt-4 mb-1 text-slate-300 ">
            </TextInput>    
        </View>
    ) 
}