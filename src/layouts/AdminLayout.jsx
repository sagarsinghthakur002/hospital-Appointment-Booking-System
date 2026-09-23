import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import AdminNavbar from '../components/admin/AdminNavbar'
import AdminSidebar from '../components/admin/AdminSidebar'

const AdminLayout = () => {
    const { aToken } = useContext(AppContext)

    if (!aToken) {
        return <Navigate to='/admin/login' replace />
    }

    return (
        <div className='bg-gray-50 min-h-screen'>
            <AdminNavbar />
            <div className='flex items-start'>
                <AdminSidebar />
                <div className='flex-1 p-4 sm:p-8'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
