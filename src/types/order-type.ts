import { ProductProps } from "@/types/menu-type"
import { UserProp } from "./user-type"

type OrderProps = {  
    id: string,  
    dataInclusao: Date,
    usuario: UserProp | null,
    precoTotal: number,
    produtos: ProductProps[],
    statusPedido: OrderStatus,
    fotoEntrega?: string | null,
}

enum OrderStatus {    
    EmAnalise = 0,
    Aprovado = 1,
    Andamento = 2,
    EmPercurso = 3,
    Finalizado = 4,
}

export { OrderProps, OrderStatus}