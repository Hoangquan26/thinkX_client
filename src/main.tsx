import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/main.module.scss'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from '@/store/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store);
import { injectStore } from './api/api.ts'
import { Toaster } from 'sonner'
injectStore(store)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>

    </Provider>
  </StrictMode>,
)
