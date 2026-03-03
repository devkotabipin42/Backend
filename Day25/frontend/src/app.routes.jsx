import {createBrowserRouter} from 'react-router'
import Login from './auth/pages/Login'
import Register from './auth/pages/Register'
import Protected from './features/Expression/components/Protected'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected><h1>Welcome to the App</h1></Protected>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/login',
    element: <Login/>
  }
])