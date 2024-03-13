export function FormatPhone(telefone: string): string {
    // Remove todos os caracteres que não são números
    const numerosTelefone = telefone.replace(/\D/g, '');

    // Aplica a formatação do telefone
    const telefoneFormatado = numerosTelefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return telefoneFormatado;
}