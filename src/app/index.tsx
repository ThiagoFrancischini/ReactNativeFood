import {View, FlatList, SectionList, Text} from "react-native"
import {Header } from "@/components/header"
import { CategoryButton } from "@/components/category-button"
import { useState, useRef } from "react"
import { Product } from "@/components/product"
import { Link } from "expo-router"
import { useCartStore } from "@/stores/cart-store"
import { ProductProps } from "@/types/menu-type"
import { getMenu } from "@/stores/helpers/menu-in-memory"

export default function Home(){

    try{        
        const menu = getMenu();
        
        const categories = menu.map((item)=> item.title);

        const cartStore = useCartStore();
    
        const [category, setCategory] = useState(categories[0]);
    
        const sectionListRef = useRef<SectionList<ProductProps>>(null);
    
        const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0);
    
        function handleCategorySelect(selectedCategory : string){
            setCategory(selectedCategory);
    
            const sectionIndex = categories.findIndex((category) => category === selectedCategory)
    
            if(sectionListRef.current){
                sectionListRef.current.scrollToLocation({
                    animated: true,
                    sectionIndex,
                    itemIndex: 0
                })
            }
        }
    
        return (
            <View className="flex-1 pt-8">
                <Header title="Faça o seu pedido" cartQuantityItems={cartQuantityItems}/>
    
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => <CategoryButton title={item} isSelected={item === category} onPress={() => handleCategorySelect(item)}></CategoryButton>}
                    horizontal
                    className="max-h-10 mt-5"
                    contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
                    showsHorizontalScrollIndicator={false}/>
    
                <SectionList
                    ref={sectionListRef}
                    sections={menu}
                    keyExtractor={(item) => item.id}
                    stickySectionHeadersEnabled={false}
                    renderItem={({item}) => (
                        <Link href={`/product/${item.id}`} asChild>
                            <Product data={item}></Product>
                        </Link>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <Text className="text-white text-xl font-heading mt-8 mb-3">{title}</Text>
                    )}
                    className="flex-1 p-5"
                    showsVerticalScrollIndicator = {false}
                    contentContainerStyle={{paddingBottom: 100}}
                />
            </View>
        )
    }
    catch
    {
        return (
            <View className="flex-1 pt-8 justify-center items-center">
                <Text className="text-white font-body text-xl">Erro ao conectar ao servidor!</Text>
            </View>
        )
    }    
}