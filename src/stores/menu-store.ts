import zustand, { create } from "zustand";
import * as cartInMemory from "./helpers/cart-in-memory"
import { MenuProps } from "@/types/menu-type";
import { searchMenu } from "@/services/MenuApi";


interface MenuState {
    menu: MenuProps[]; 
    fetchMenu: () => Promise<void>;
}

export const useMenuStore = create<MenuState>((set, get) => ({
    menu: [],        
    fetchMenu: async () => {                
        // Verifica se o menu ainda não foi carregado
        if (get().menu.length === 0) {
            const result = await searchMenu();
            set({ menu: [result] }); // Atualiza o estado com os dados da API
        }
    }
}));
