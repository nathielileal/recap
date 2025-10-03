export function getDDMMYYYY(data) {
    const date = new Date(data);

    return date.toLocaleDateString("pt-BR", { year: "numeric", month: "numeric", day: "numeric" });
}

export function getYYYYMMDDHHMI(data) {
    if (data === '' || data === null) {
        return '';
    }
    
    const dparts = data.toISOString().split('T')[0];
    const tparts = data.toTimeString().split(' ')[0];

    return `${dparts} ${tparts.substring(0, 5)}`;
};

export function getYear(data) {
    return new Date(data).getFullYear();
}

export function getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);

    const diff = Math.abs(now.getTime() - date.getTime());

    const units = [
        { name: 'ano', divisor: 365 * 24 * 60 * 60 * 1000 },
        { name: 'mês', divisor: 30 * 24 * 60 * 60 * 1000 },
        { name: 'dia', divisor: 24 * 60 * 60 * 1000 },
        { name: 'hora', divisor: 60 * 60 * 1000 },
        { name: 'minuto', divisor: 60 * 1000 },
    ];

    for (let i = 0; i < units.length; i++) {
        const { name, divisor } = units[i];

        if (diff >= divisor) {
            const timeAgo = Math.floor(diff / divisor);

            const plural = timeAgo > 1 ? 's' : '';
            const unitPlural = name === 'mês' && timeAgo > 1 ? 'meses' : `${name}${plural}`;

            return `há ${timeAgo} ${unitPlural}`;
        }
    }

    return "agora mesmo";
}