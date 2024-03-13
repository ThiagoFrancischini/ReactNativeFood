import axios from "axios";
import api from "./Api";
import { UserProp } from "@/types/user-type";

export async function authenticate(cpf: string, password: string) : Promise<UserProp>{     

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

export async function insert(usuario: UserProp) {    
    try{        
        
        usuario.id = '00000000-0000-0000-0000-000000000000';              
        const response = await api.post('/usuario',usuario);                 
        return response.data;
    }
    catch(error : any){       
        console.log(error.response.data) 
        return error.response.data;
    }
}