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
        toggleTransferCount: (state, action: { payload: number }) => {
            const count = action.payload
            const idx = state.transferCounts.indexOf(count)
            if (idx >= 0) {
            state.transferCounts.splice(idx, 1)
            if (state.transferCounts.length === 0) {
                state.allTransfers = true
            }
            } else {
            state.allTransfers = false
            state.transferCounts.push(count)
            state.transferCounts.sort((a, b) => a - b)
            }
        },
    },
})

export const { setAllTransfers, toggleTransferCount } = transfersFilterSlice.actions
export default transfersFilterSlice.reducer
