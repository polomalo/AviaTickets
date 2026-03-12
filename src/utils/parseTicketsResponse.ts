import type { TicketItem, TicketsApiResponse, AirlineInfo } from '@/definitions/ticket';

export type ParsedTicketsResult = {
    tickets: TicketItem[];
    airlines: Record<string, AirlineInfo>;
};

export function parseTicketsResponse(rawBody: TicketsApiResponse | string): ParsedTicketsResult {
    let parsed: TicketsApiResponse | string = rawBody;

    if (typeof rawBody === 'string') {
        const normalized = rawBody.trim().replace(/^\uFEFF/, '').replace(/,(\s*[}\]])/g, '$1');
        try {
            parsed = JSON.parse(normalized) as TicketsApiResponse;
        } catch {
            return { tickets: [], airlines: {} };
        }
    }

    if (typeof parsed === 'string' || !Array.isArray(parsed.data)) {
        return { tickets: [], airlines: {} };
    }

    const allAirlines: Record<string, AirlineInfo> = {};
    for (const item of parsed.data) {
        if (item.airlines) {
            Object.assign(allAirlines, item.airlines);
        }
    }

    return { tickets: parsed.data, airlines: allAirlines };
}
