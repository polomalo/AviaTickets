import { configureStore } from '@reduxjs/toolkit'
import { ticketsApi } from './api/ticketsApi'
import { nbrbApi } from './api/nbrbApi'
import ticketsReducer from './slices/ticketSlice'
import currencyReducer from './slices/currencySlice'
import transfersFilterReducer from './slices/transfersFilterSlice'
import airlinesFilterReducer from './slices/airlinesFilterSlice'

export const store = configureStore({
    reducer: {
        [ticketsApi.reducerPath]: ticketsApi.reducer,
        [nbrbApi.reducerPath]: nbrbApi.reducer,
        tickets: ticketsReducer,
        currency: currencyReducer,
        transfersFilter: transfersFilterReducer,
        airlinesFilter: airlinesFilterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ticketsApi.middleware, nbrbApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;