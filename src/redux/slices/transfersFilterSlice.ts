import { createSlice } from '@reduxjs/toolkit'

type TransfersFilterState = {
    allTransfers: boolean
    transferCounts: number[]
}

const initialState: TransfersFilterState = {
    allTransfers: true,
    transferCounts: [],
}

const transfersFilterSlice = createSlice({
    name: 'transfersFilter',
    initialState,
    reducers: {
        setAllTransfers: (state) => {
            state.allTransfers = true
            state.transferCounts = []
        },
        toggleTransferCount: (state, action: { payload: { count: number; totalOptions: number } }) => {
            const { count, totalOptions } = action.payload
            const idx = state.transferCounts.indexOf(count)
            if (idx >= 0) {
                state.transferCounts.splice(idx, 1)
                if (state.transferCounts.length === 0) {
                    state.allTransfers = true
                }
            } else {
                state.transferCounts.push(count)
                state.transferCounts.sort((a, b) => a - b)
                if (state.transferCounts.length === totalOptions) {
                    state.allTransfers = true
                    state.transferCounts = []
                }
            }
        },
        selectOnlyTransferCount: (state, action: { payload: number }) => {
            state.allTransfers = false
            state.transferCounts = [action.payload]
        },
    },
})

export const { setAllTransfers, toggleTransferCount, selectOnlyTransferCount } = transfersFilterSlice.actions
export default transfersFilterSlice.reducer
