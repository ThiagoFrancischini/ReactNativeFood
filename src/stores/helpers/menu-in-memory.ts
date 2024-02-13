import { MenuProps } from "@/types/menu-type";
import { useMenuStore } from "../menu-store";

export function getMenu(){

    if(useMenuStore().menu != undefined){
        return useMenuStore().menu[0]
    }

    return [];
}

