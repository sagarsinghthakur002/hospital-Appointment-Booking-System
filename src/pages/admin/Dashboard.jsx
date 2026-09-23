import { useContext, useMemo } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const slotDateFormat = (slotDate) => {
    const d = slotDate.split('_')
    return `${d[0]} ${months[Number(d[1])]}, ${d[2]}`
}

const Dashboard = () => {

    const { doctors, appointments, priorityAppointments, getPatientInfo, cancelAppointment } = useContext(AppContext)

    const stats = useMemo(() => {
        const uniquePatients = new Set(
            appointments.map((a) => getPatientInfo(a).name)
        )
        return {
            doctorsCount: doctors.length,
            appointmentsCount: appointments.filter((a) => !a.cancelled).length,
            patientsCount: uniquePatients.size
        }
    }, [doctors, appointments, getPatientInfo])

    // ALGORITHM 1 — priority queue ordering (emergency first)
    const latest = useMemo(
        () => priorityAppointments.slice(0, 5),
        [priorityAppointments]
    )

    const getDoctor = (docId) => doctors.find((d) => d._id === docId)

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5'>
                <div className='sm:col-span-3 bg-indigo-50 border border-indigo-100 rounded-lg px-5 py-3 text-xs sm:text-sm text-indigo-900 flex flex-wrap gap-x-6 gap-y-1'>
                    <span><b>⚙ Priority Scheduling</b> — 🚨 emergencies always shown first (min-heap)</span>
                    <span><b>⚙ Load Balancing</b> — emergencies auto-routed to the least-busy doctor</span>
                    <span><b>⚙ Conflict Detection</b> — a doctor can never be double-booked for the same slot</span>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>

                <div className='flex items-center gap-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all'>
                    <img className='w-12' src={assets.doctor_icon} alt='' />
                    <div>
                        <p className='text-2xl font-bold text-gray-800'>{stats.doctorsCount}</p>
                        <p className='text-gray-500 font-medium'>Doctors</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all'>
                    <img className='w-12' src={assets.appointments_icon} alt='' />
                    <div>
                        <p className='text-2xl font-bold text-gray-800'>{stats.appointmentsCount}</p>
                        <p className='text-gray-500 font-medium'>Appointments</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all'>
                    <img className='w-12' src={assets.patients_icon} alt='' />
                    <div>
                        <p className='text-2xl font-bold text-gray-800'>{stats.patientsCount}</p>
                        <p className='text-gray-500 font-medium'>Patients</p>
                    </div>
                </div>

            </div>

            <div className='bg-white mt-8 rounded-lg border border-gray-200 shadow-sm'>
                <div className='flex items-center gap-2.5 px-5 py-4 border-b border-gray-200'>
                    <img className='w-5' src={assets.list_icon} alt='' />
                    <p className='font-semibold text-gray-800'>Latest Appointments</p>
                </div>

                <div>
                    {latest.length === 0 && (
                        <p className='px-5 py-6 text-sm text-gray-500'>No appointments yet.</p>
                    )}
                    {latest.map((item) => {
                        const doc = getDoctor(item.docId)
                        const patient = getPatientInfo(item)
                        if (!doc) return null

                        return (
                            <div key={item._id} className='flex items-center px-5 py-3 gap-4 border-b border-gray-100 last:border-0 hover:bg-gray-50'>
                                <img className='w-10 h-10 rounded-full object-cover bg-gray-100' src={doc.image} alt={doc.name} />
                                <div className='flex-1 text-sm'>
                                    <p className='text-gray-800 font-semibold'>{doc.name}</p>
                                    <p className='text-gray-500'>
                                        {item.emergency ? (
                                            <span className='text-red-600 font-semibold'>🚨 Emergency — {patient.name}</span>
                                        ) : (
                                            <>Booking on {slotDateFormat(item.slotDate)}</>
                                        )}
                                    </p>
                                </div>
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
                </div>
            </div>
        </div>
    )
}

export default Dashboard
