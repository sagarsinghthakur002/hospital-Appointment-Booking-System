import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const reasons = [
    'Severe pain',
    'Difficulty breathing',
    'High fever',
    'Injury / accident',
    'Chest pain',
    'Other'
]

const Emergency = () => {

    const navigate = useNavigate()
    const { token, bookEmergencyAppointment } = useContext(AppContext)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [reason, setReason] = useState(reasons[0])
    const [details, setDetails] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!token) {
            navigate('/login')
            return
        }

        bookEmergencyAppointment({
            name,
            phone,
            reason: details ? `${reason} — ${details}` : reason
        })
        navigate('/my-appointments')
    }

    return (
        <div className='max-w-2xl mx-auto'>

            <div className='bg-red-600 text-white rounded-xl px-6 py-6 sm:px-10 sm:py-8 mt-8 flex items-start gap-4'>
                <span className='text-3xl leading-none'>🚨</span>
                <div>
                    <p className='text-xl sm:text-2xl font-bold'>Emergency Appointment</p>
                    <p className='text-sm sm:text-base text-red-50 mt-1'>
                        This request is treated as <span className='font-semibold underline'>top priority</span> — it will
                        be placed at the very top of your appointments and a doctor will be notified immediately.
                        If this is life‑threatening, please call your local emergency number right away.
                    </p>
                </div>
            </div>

            <form onSubmit={onSubmit} className='bg-white border-2 border-red-100 rounded-xl p-6 sm:p-8 mt-6 flex flex-col gap-5 shadow-sm'>

                <div>
                    <label className='block font-semibold text-gray-800 mb-1'>Full Name</label>
                    <input
                        className='border-2 border-gray-300 focus:border-red-500 outline-none rounded-lg w-full p-3 text-gray-800'
                        type='text'
                        placeholder='Your name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className='block font-semibold text-gray-800 mb-1'>Phone Number</label>
                    <input
                        className='border-2 border-gray-300 focus:border-red-500 outline-none rounded-lg w-full p-3 text-gray-800'
                        type='tel'
                        placeholder='e.g. +1 123 456 7890'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className='block font-semibold text-gray-800 mb-1'>What's the emergency?</label>
                    <select
                        className='border-2 border-gray-300 focus:border-red-500 outline-none rounded-lg w-full p-3 text-gray-800 bg-white'
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    >
                        {reasons.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className='block font-semibold text-gray-800 mb-1'>Additional details (optional)</label>
                    <textarea
                        className='border-2 border-gray-300 focus:border-red-500 outline-none rounded-lg w-full p-3 text-gray-800 min-h-24'
                        placeholder='Briefly describe the symptoms...'
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </div>

                <button
                    type='submit'
                    className='bg-red-600 hover:bg-red-700 text-white font-bold text-base w-full py-3 rounded-lg transition-all'
                >
                    Request Emergency Appointment
                </button>

                {!token && (
                    <p className='text-sm text-gray-500 text-center'>
                        You'll be asked to log in first so we can reach you.
                    </p>
                )}
            </form>

        </div>
    )
}

export default Emergency
