import { ProductProps } from "@/utils/data/products"

type OrderItensProps = {
    quantity: number,
    product: ProductProps
}

type OrderProps = {  
    id: number,  
    orderDate: Date,
    location: string,
    price: number,
    itens: OrderItensProps[],
    status: OrderStatus,
}

enum OrderStatus {
    Aprovado = "Aprovado",
    Andamento = "Em andamento",
    Percuros = "Saiu para entrega",
    Finalizado = "Finalizado",
}

export { OrderProps, OrderItensProps, OrderStatus}