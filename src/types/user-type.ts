type UserProps = [
    {
        id: string,
        email: string,
        nome: string,
        cpf: string, 
        password: string,
        rua: string,
        bairro: string,
        cidade: string,
        numero: string,
        complemento: string,
        autenticado: boolean,
        telefone: string,
    }
]

type UserProp = {
    id: string,
    email: string,
    nome: string,
    cpf: string, 
    password: string,
    rua: string,
    bairro: string,
    cidade: string,
    numero: string,
    complemento: string,
    autenticado: boolean,
    telefone: string,
}

export { UserProps, UserProp };