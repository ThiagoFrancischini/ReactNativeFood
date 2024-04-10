import { OrderStatus } from "@/types/order-type";

function orderStatusString(code: OrderStatus): string {
    switch(code) {
        case OrderStatus.EmAnalise:
            return "Em Análise";
        case OrderStatus.Aprovado:
            return "Aprovado";
        case OrderStatus.Andamento:
            return "Em Andamento";
        case OrderStatus.EmPercurso:
            return "Em Percurso";
        case OrderStatus.Finalizado:
            return "Finalizado";
        default:
            throw new Error("Código de status inválido");
    }
}

export {orderStatusString};