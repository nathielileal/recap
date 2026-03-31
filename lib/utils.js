import { API_URL } from "../constants/url";

const SERVICE_PORTS = {
  auth: 3001,
  user: 3002,
  movies: 3003,
  catalog: 3004, 
  lists: 3004,
  rating: 3005,   
  social: 3006, 
};

export function getApiUrl(serviceName) {
  const port = SERVICE_PORTS[serviceName];

  if (!port) {
    console.error(`Porta não encontrada para o serviço: ${serviceName}`);
    return API_URL; 
  }

  return `http://localhost:${port}`;
}

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
    return new Date(data).getFullYear
    ();
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

export function getRate(rate) {
    switch (rate) {
        case 0:
            return "Nem merece nota";
        case 1:
            return "Muito ruim";
        case 2:
            return "Ruim";
        case 3:
            return "Bom";
        case 4:
            return "Muito bom";
        case 5:
            return "Perfeito";
    }
}