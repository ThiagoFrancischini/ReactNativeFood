export function FormatDate(date: Date){            
    const day = date.getDate();
    const month = date.getMonth() + 1; // Os meses em JavaScript são baseados em zero, então adicionamos 1
    const year = date.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    return formattedDate;
}