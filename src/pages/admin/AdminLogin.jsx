import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const AdminLogin = () => {

    const navigate = useNavigate()
    const { adminLogin } = useContext(AppContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        const success = adminLogin(email, password)
        if (success) navigate('/admin/dashboard')
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <form onSubmit={onSubmit} className='flex flex-col gap-4 items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl bg-white text-gray-700 text-sm shadow-lg'>

                <div className='flex items-center gap-2 mb-2'>
                    <img className='h-8' src={assets.logo} alt='Prescripto' />
                    <p className='border border-gray-400 text-gray-600 text-xs px-2.5 py-0.5 rounded-full'>Admin</p>
                </div>

                <p className='text-2xl font-bold text-gray-800'>Admin Login</p>

                <div className='w-full'>
                    <p className='font-medium text-gray-800'>Email</p>
                    <input
                        className='border border-gray-300 rounded w-full p-2 mt-1'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className='w-full'>
                    <p className='font-medium text-gray-800'>Password</p>
                    <input
                        className='border border-gray-300 rounded w-full p-2 mt-1'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='bg-primary text-white w-full py-2.5 my-2 rounded-md text-base font-semibold hover:opacity-90 transition-all'
                >
                    Login
                </button>

                <p className='text-xs text-gray-500'>
                    Demo credentials — email: <b>admin@ms.com</b>, password: <b>admin123</b>
                </p>
            </form>
        </div>
    )
}

export default AdminLogin
