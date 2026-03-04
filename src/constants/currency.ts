export const NBRB_RATES_URL = import.meta.env.VITE_NBRB_URL

export type CurrencyCode = 'RUB' | 'BYN' | 'USD'

export const CURRENCY_OPTIONS: CurrencyCode[] = ['RUB', 'BYN', 'USD']

export const CURRENCY_SYMBOL: Record<CurrencyCode, string> = {
    RUB: 'P',
    BYN: 'BYN',
    USD: 'USD',
}
