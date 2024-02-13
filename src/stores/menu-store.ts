import zustand, { create } from "zustand";
import * as cartInMemory from "./helpers/cart-in-memory"
import { MenuProps } from "@/types/menu-type";
import { searchMenu } from "@/services/MenuApi";


interface MenuState {
    menu: MenuProps[]; 
    fetchMenu: () => Promise<void>;
}

export const useMenuStore = create<MenuState>((set) => ({
    menu: [],        
    fetchMenu: async () => {                
        const result = await searchMenu();
        set({ menu: [ result ]});        
    }
}));
