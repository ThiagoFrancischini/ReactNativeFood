import axios from "axios";
import api from "./Api";
    
export async function searchMenu() {
    
    try{    
        axios.interceptors.response.use(
            response => response,
            error => {
              throw error
            }
        )

        const response = api.get('/menu').then(() => console.log("deu bao")).catch((err) => console.log(err));

        return response;    
    }
    catch(e){
        console.log("(e as Error).message")
    }
}