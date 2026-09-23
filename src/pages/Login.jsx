import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Login = () => {

    const navigate = useNavigate()
    const { login } = useContext(AppContext)

    const [state, setState] = useState('Sign Up') // 'Sign Up' | 'Login'

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = (event) => {
        event.preventDefault()
        login(email)
        navigate('/')
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center'>
            <div className='flex flex-col gap-4 items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-gray-700 text-sm shadow-lg'>

                <p className='text-2xl font-semibold'>
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </p>

                <p>
                    Please {state === 'Sign Up' ? 'sign up' : 'login'} to book appointment
                </p>

                {state === 'Sign Up' && (
                    <div className='w-full'>
                        <p>Full Name</p>
                        <input
                            className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div className='w-full'>
                    <p>Email</p>
                    <input
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className='w-full'>
                    <p>Password</p>
                    <input
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
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
                    {state === 'Sign Up' ? 'Create account' : 'Login'}
                </button>

                {state === 'Sign Up' ? (
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>
                            Login here
                        </span>
                    </p>
                ) : (
                    <p>
                        Create a new account?{' '}
                        <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>
                            Click here
                        </span>
                    </p>
                )}

            </div>
        </form>
    )
}

export default Login
