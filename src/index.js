import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import ContextProvider from './context/Context'
import { vi } from 'date-fns/locale/vi'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </LocalizationProvider>
  </Provider>,
)
