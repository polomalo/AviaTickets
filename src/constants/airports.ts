export interface AirportData {
    city: string;
    city_code: string;
}

export type AirportsMap = Record<string, AirportData>;

export const AIRPORTS: AirportsMap = {
    MSQ: {
        city: 'Минск',
        city_code: 'MSQ',
    },
    GME: {
        city: 'Гомель',
        city_code: 'GME',
    },
    MOW: {
        city: 'Москва',
        city_code: 'MOW',
    }
};

function findAirportByCityName(input: string): AirportData | null {
    const trimmed = input.trim();
    if (!trimmed) return null;
    return Object.values(AIRPORTS).find(
        (d) => d.city.toLowerCase() === trimmed.toLowerCase()
    ) ?? null;
}

export function getCodeFromInput(input: string): string | null {
    return findAirportByCityName(input)?.city_code ?? null;
}

export function getCityNameForDisplay(input: string): string {
    const airport = findAirportByCityName(input);
    return airport ? airport.city : input.trim();
}
