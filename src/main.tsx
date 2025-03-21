import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/main.module.scss'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router'
import { router } from './routers/router'
import { Provider } from 'react-redux'
import { store } from '@/store/store.ts'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}>
      <Provider store={store}>
          <App />
      </Provider>
    </RouterProvider>
  </StrictMode>,
)
