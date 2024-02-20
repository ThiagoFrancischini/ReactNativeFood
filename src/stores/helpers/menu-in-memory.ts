import { MenuProps } from "@/types/menu-type";
import { useMenuStore } from "../menu-store";

export function getMenu() : MenuProps {    
    const { menu } = useMenuStore.getState();
    return menu[0];
}

