import { useNavigate } from 'react-router-dom'

const EmergencyBanner = () => {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate('/emergency')}
            className='flex flex-col sm:flex-row items-center justify-between gap-3 bg-red-600 text-white rounded-lg px-3.5 sm:px-8 py-3.5 mt-4 mb-2.5 cursor-pointer hover:bg-red-700 transition-all shadow-md'
        >
            <div className='flex items-center gap-3'>
                <span className='text-2xl'>🚨</span>
                <div>
                    <p className='font-bold text-base sm:text-lg leading-tight'>Medical Emergency?</p>
                    <p className='text-red-50 text-xs sm:text-sm'>Request an urgent appointment — handled as top priority.</p>
                </div>
            </div>
            <button className='bg-white text-red-600 font-bold text-sm px-5 py-2 rounded-full hover:scale-105 transition-all whitespace-nowrap'>
                Get Help Now
            </button>
        </div>
    )
}

export default EmergencyBanner
