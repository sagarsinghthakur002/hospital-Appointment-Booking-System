import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const AdminNavbar = () => {
    const navigate = useNavigate()
    const { aToken, adminLogout } = useContext(AppContext)

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-200 bg-white'>
            <div
                onClick={() => navigate('/admin/dashboard')}
                className='flex items-center gap-2 cursor-pointer'
            >
                <img className='h-8' src={assets.logo} alt='Prescripto' />
                <p className='border border-gray-400 text-gray-600 text-xs px-2.5 py-0.5 rounded-full'>Admin</p>
            </div>

            {aToken && (
                <button
                    onClick={() => { adminLogout(); navigate('/admin/login') }}
                    className='bg-primary text-white text-sm font-semibold px-8 py-2.5 rounded-full hover:opacity-90 transition-all'
                >
                    Logout
                </button>
            )}
        </div>
    )
}

export default AdminNavbar
