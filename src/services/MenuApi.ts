import axios from "axios";
import api from "./Api";
import { MenuProps } from "@/types/menu-type";
    
export async function searchMenu() : Promise<MenuProps> {
        
    const response = await api.get('/menu');

    return response.data;    

}