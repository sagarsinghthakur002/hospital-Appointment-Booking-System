import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const slotDateFormat = (slotDate) => {
    const d = slotDate.split('_')
    return `${d[0]} ${months[Number(d[1])]}, ${d[2]}`
}

const AllAppointments = () => {

    const { doctors, currencySymbol, getPatientInfo, cancelAppointment, priorityAppointments } = useContext(AppContext)

    const getDoctor = (docId) => doctors.find((d) => d._id === docId)

    // ALGORITHM 1 — priority queue ordering (emergency first)
    const sorted = priorityAppointments

    return (
        <div>
            <p className='text-xl font-bold text-gray-800 mb-4'>All Appointments</p>

            <div className='bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-sm'>
                <div className='min-w-[850px]'>

                    <div className='grid grid-cols-[0.4fr_2.2fr_1.6fr_0.8fr_1.6fr_1.8fr_0.8fr_0.6fr] items-center py-3 px-5 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide'>
                        <p>#</p>
                        <p>Patient</p>
                        <p>Department</p>
                        <p>Age</p>
                        <p>Date &amp; Time</p>
                        <p>Doctor</p>
                        <p>Fees</p>
                        <p>Action</p>
                    </div>

                    {sorted.map((item, index) => {
                        const doc = getDoctor(item.docId)
                        const patient = getPatientInfo(item)
                        if (!doc) return null

                        return (
                            <div
                                key={item._id}
                                className={`grid grid-cols-[0.4fr_2.2fr_1.6fr_0.8fr_1.6fr_1.8fr_0.8fr_0.6fr] items-center py-3 px-5 border-b border-gray-100 last:border-0 text-sm text-gray-700 ${item.emergency ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                            >
                                <p className='text-gray-500'>{index + 1}</p>

                                <div className='flex items-center gap-2'>
                                    <img className='w-8 h-8 rounded-full object-cover bg-gray-100' src={assets.profile_pic} alt='' />
                                    <p className='font-medium text-gray-800'>
                                        {patient.name}
                                        {item.emergency && (
                                            <span className='ml-2 text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded-full align-middle'>
                                                EMERGENCY
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <p>{doc.speciality}</p>
                                <p>{patient.age}</p>
                                <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

                                <div className='flex items-center gap-2'>
                                    <img className='w-8 h-8 rounded-full object-cover bg-indigo-50' src={doc.image} alt='' />
                                    <p className='font-medium text-gray-800'>{doc.name}</p>
                                </div>

                                <p className='font-medium text-gray-800'>{currencySymbol}{doc.fees}</p>

                                {!item.cancelled ? (
                                    <button
                                        onClick={() => cancelAppointment(item._id)}
                                        title='Cancel appointment'
                                        className='w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-all'
                                    >
                                        <img className='w-3.5' src={assets.cancel_icon} alt='cancel' />
                                    </button>
                                ) : (
                                    <span className='text-xs font-semibold text-red-500'>Cancelled</span>
                                )}
                            </div>
                        )
                    })}

                    {sorted.length === 0 && (
                        <p className='px-5 py-6 text-sm text-gray-500'>No appointments yet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AllAppointments
