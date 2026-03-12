import { createSlice } from '@reduxjs/toolkit'

type AirlinesFilterState = {
    allAirlines: boolean
    selectedAirlines: string[]
}

const initialState: AirlinesFilterState = {
    allAirlines: true,
    selectedAirlines: [],
}

const airlinesFilterSlice = createSlice({
    name: 'airlinesFilter',
    initialState,
    reducers: {
        setAllAirlines: (state) => {
            state.allAirlines = true
            state.selectedAirlines = []
        },
        toggleAirline: (state, action: { payload: { code: string; totalOptions: number } }) => {
            const { code, totalOptions } = action.payload
            const idx = state.selectedAirlines.indexOf(code)
            if (idx >= 0) {
                state.selectedAirlines.splice(idx, 1)
                if (state.selectedAirlines.length === 0) {
                    state.allAirlines = true
                }
            } else {
                state.selectedAirlines.push(code)
                state.selectedAirlines.sort()
                if (state.selectedAirlines.length === totalOptions) {
                    state.allAirlines = true
                    state.selectedAirlines = []
                }
            }
        },
        selectOnlyAirline: (state, action: { payload: string }) => {
            state.allAirlines = false
            state.selectedAirlines = [action.payload]
        },
    },
})

export const { setAllAirlines, toggleAirline, selectOnlyAirline } = airlinesFilterSlice.actions
export default airlinesFilterSlice.reducer
