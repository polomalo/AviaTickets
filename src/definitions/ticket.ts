export interface Flight {
    departure: string;
    arrival: string;
    departure_date: string;
    departure_time: string;
    arrival_date: string;
    arrival_time: string;
    duration: number;
    marketing_carrier: string;
}

export interface Segment {
    flight: Flight[];
}

export interface TicketItem {
    segment: Segment[];
    priceRub?: number;
    total_duration?: number;
    carriers: string[];
    tags?: string[];
    max_stops?: string;
    airports?: string[];
}

export interface TicketsApiResponse {
    data: TicketItem[];
}

export interface SearchParams {
    date: string;
    origin: string;
    destination: string; 
}
