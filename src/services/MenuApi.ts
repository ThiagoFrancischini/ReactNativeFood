import api from "./Api";
    
export async function searchMenu() {
    
    const response = await api.get('/menu');                

    return response.data;
    
}