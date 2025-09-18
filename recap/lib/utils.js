export function getDDMMYYYY(data) {
    const date = new Date(data);

    return date.toLocaleDateString("pt-BR", { year: "numeric", month: "numeric", day: "numeric" });
}

export function getYear(data) {
    return new Date(data).getFullYear();
}