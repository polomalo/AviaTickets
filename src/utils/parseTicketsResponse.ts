import type { TicketItem, TicketsApiResponse } from '../definitions/ticket';

export function parseTicketsResponse(rawBody: TicketsApiResponse | string): TicketItem[] {
    let parsed: TicketsApiResponse | string = rawBody;

    if (typeof rawBody === 'string') {
        const normalized = rawBody.trim().replace(/^\uFEFF/, '').replace(/,(\s*[}\]])/g, '$1');
        try {
            parsed = JSON.parse(normalized) as TicketsApiResponse;
        } catch {
            return [];
        }
    }

    if (typeof parsed === 'string' || !Array.isArray(parsed.data)) {
        return [];
    }
    return parsed.data;
}
