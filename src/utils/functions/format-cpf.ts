export function FormatCpf(cpf : string) : string{
    const cleanedCPF = cpf.replace(/\D/g, '');
  
    return cleanedCPF.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
    );
}