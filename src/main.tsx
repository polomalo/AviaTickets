import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ruRU } from '@mui/x-date-pickers/locales'
import 'dayjs/locale/ru'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ru"
                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <App />
            </LocalizationProvider>
        </Provider>
    </StrictMode>,
)
