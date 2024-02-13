import {View, FlatList, SectionList, Text} from "react-native"
import{ CATEGORIES, MENU, ProductProps } from "@/utils/data/products"
import {Header } from "@/components/header"
import { CategoryButton } from "@/components/category-button"
import { useState, useRef } from "react"
import { Product } from "@/components/product"
import { Link } from "expo-router"
import { useCartStore } from "@/stores/cart-store"
import api from "@/services/Api"
import { searchMenu } from "@/services/MenuApi"


export default function Home(){        
    const cartStore = useCartStore();

    const [category, setCategory] = useState(CATEGORIES[0]);

    const sectionListRef = useRef<SectionList<ProductProps>>(null);

    const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0);

    function handleCategorySelect(selectedCategory : string){
        setCategory(selectedCategory);

        const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)

        if(sectionListRef.current){
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0
            })
        }
    }
    
    /* searchMenu().then(console.log) */

    /* searchMenu().then(console.log).catch((err) => console.log(err.response?.data, err.toJSON())) */

    return (
        <View className="flex-1 pt-8">
            <Header title="Faça o seu pedido" cartQuantityItems={cartQuantityItems}/>            

            <FlatList 
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({item}) => <CategoryButton title={item} isSelected={item === category} onPress={() => handleCategorySelect(item)}></CategoryButton>}
                horizontal
                className="max-h-10 mt-5"
                contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
                showsHorizontalScrollIndicator={false}/>

            <SectionList
                ref={sectionListRef}
                sections={MENU}
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