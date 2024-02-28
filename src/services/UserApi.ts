import axios from "axios";
import api from "./Api";
import { UserProps } from "@/types/user-type";

export async function authenticate(cpf: string, password: string) : Promise<UserProps>{     

    try{
        const response = await api.post('/usuario/autenticar', 
        {
            "cpf": cpf, 
            "password": password}
        );  

        if (response.status === 400) {
            throw("Falha na autenticação");
        }                

        return response.data;
    }
    catch(error : any){        

        if(error.response.status === 400){
            throw("CPF ou Senha inválidos");
        }
        return error.response.data;
    }    
}

export async function insert(user: UserProps) {    
    try{
        const response = await api.post('/usuario',user);         
        return response.data;
    }
    catch(error : any){
        return error.response.data;
    }
}