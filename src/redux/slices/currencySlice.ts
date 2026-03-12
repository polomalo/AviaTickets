import { createSlice } from '@reduxjs/toolkit'
import type { CurrencyCode } from '@/constants/currency'

type CurrencyState = { current: CurrencyCode }

const initialState: CurrencyState = { current: 'RUB' }

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrency: (state, action: { payload: CurrencyCode }) => {
            state.current = action.payload
        },
    },
})

export const { setCurrency } = currencySlice.actions
export default currencySlice.reducer
