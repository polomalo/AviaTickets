import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store'
import { setCurrency as setCurrencyAction } from '../redux/slices/currencySlice'
import { useGetNbrbRatesQuery } from '../redux/api/nbrbApi'
import { getErrorMessage } from '../utils/getErrorMessage'
import type { CurrencyCode } from '../constants/currency'

export function useCurrencyRates() {
    const { data: rates = {}, isLoading, error } = useGetNbrbRatesQuery()
    const errorStr = error != null ? getErrorMessage(error) : null
    return { rates, ratesLoading: isLoading, ratesError: errorStr }
}

export function useCurrency() {
    const dispatch = useDispatch<AppDispatch>()
    const { ratesLoading, ratesError } = useCurrencyRates()
    const setCurrency = useCallback((code: CurrencyCode) => dispatch(setCurrencyAction(code)), [dispatch])
    return { setCurrency, ratesLoading, ratesError }
}

export function useCurrencyCode(): CurrencyCode {
    return useSelector((s: RootState) => s.currency.current)
}

export function useConvertFromRub(priceRub: number): number {
    const currency = useSelector((state: RootState) => state.currency.current)
    const { rates } = useCurrencyRates()
    if (currency === 'RUB') return priceRub
    const rubRate = rates.RUB
    if (!rubRate) return priceRub
    const priceByn = priceRub * (rubRate.rateToByn / rubRate.scale)
    if (currency === 'BYN') return priceByn
    const usdRate = rates.USD
    if (!usdRate) return priceByn
    return priceByn / usdRate.rateToByn
}
