type UserProps = [
    {
        id: string,
        email: string,
        nome: string,
        cpf: string, 
        password: string,
        endereco: string,
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
    endereco: string,
    autenticado: boolean,
    telefone: string,
}

export { UserProps, UserProp };