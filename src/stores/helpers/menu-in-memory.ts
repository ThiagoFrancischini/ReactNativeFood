import { MenuProps } from "@/types/menu-type";
import { useMenuStore } from "../menu-store";

export function getMenu() : MenuProps {    
    return useMenuStore().menu[0];  
}

