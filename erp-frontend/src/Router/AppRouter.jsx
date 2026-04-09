import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import Dashboard from '../Pages/Dashboard'
import Users from '../pages/Users'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,   // layout con <Outlet />
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'users',     element: <Users /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}