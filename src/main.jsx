import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import { UserProvider } from './providers/UserProvider.jsx'
import { PermissionsProvider } from './providers/PermissionsProvider.jsx'
import './index.css'
// import App from './App.jsx'

console.log(router.routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <PermissionsProvider>
        <RouterProvider router={router}/>
      </PermissionsProvider>
    </UserProvider>
  </StrictMode>,
)
