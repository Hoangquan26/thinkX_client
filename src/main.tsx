import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/main.module.scss'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router'
import { router } from './routers/router'
import { Provider } from 'react-redux'
import { store } from '@/store/store.ts'
import { ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router}>
          <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
