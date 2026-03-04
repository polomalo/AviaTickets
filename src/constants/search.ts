import type { SearchParams } from '../definitions/ticket';

export const defaultSearch: SearchParams = {
    date: '',
    origin: '',
    destination: '',
};

export const PAGE_SIZE = 5;
export const DEFAULT_TRANSFER_OPTIONS = [0, 1, 2];
