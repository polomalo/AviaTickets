import type { TicketItem } from '@/definitions/ticket';

export function getTransferCount(ticket: TicketItem): number {
    const raw = ticket.max_stops
    if (raw !== undefined && raw !== '') {
        const n = Number(raw)
        if (!Number.isNaN(n) && n >= 0) return Math.floor(n)
    }
    const seg = ticket.segment?.[0]
    const flights = seg?.flight ?? []
    return Math.max(0, flights.length - 1)
}