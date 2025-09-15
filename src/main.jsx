import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { UserProvider } from './providers/UserProvider.jsx'
import { PermissionsProvider } from './providers/PermissionsProvider.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './index.css'
// import App from './App.jsx'

console.log(router.routes)

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <PermissionsProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
        </QueryClientProvider>
      </PermissionsProvider>
    </UserProvider>
  </StrictMode>,
)
