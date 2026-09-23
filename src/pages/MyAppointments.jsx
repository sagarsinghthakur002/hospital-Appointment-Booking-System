import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return `${dateArray[0]}, ${months[Number(dateArray[1])]} ${dateArray[2]}`
}

const MyAppointments = () => {

    const { appointments, doctors, cancelAppointment, payAppointment } = useContext(AppContext)

    const getDoctor = (docId) => doctors.find((doc) => doc._id === docId)

    // emergency requests always float to the top, newest first within each group
    const visibleAppointments = appointments
        .filter((item) => !item.cancelled)
        .sort((a, b) => (b.emergency === true) - (a.emergency === true))

    return (
        <div>
            <p className='pb-3 mt-12 text-xl font-bold text-gray-800 border-b'>My Appointments</p>

            <div>
                {visibleAppointments.length === 0 && (
                    <p className='text-sm text-gray-600 mt-6'>You have no upcoming appointments.</p>
                )}

                {visibleAppointments.map((item) => {
                    const doc = getDoctor(item.docId)
                    if (!doc) return null

                    return (
                        <div
                            key={item._id}
                            className={`grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b ${
                                item.emergency ? 'bg-red-50 border-red-200 -mx-2 px-2 rounded-lg' : ''
                            }`}
                        >

                            <div>
                                <img className='w-32 bg-indigo-50 rounded' src={doc.image} alt={doc.name} />
                            </div>

                            <div className='flex-1 text-sm text-gray-700'>
                                {item.emergency && (
                                    <span className='inline-block bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-1.5'>
                                        🚨 EMERGENCY — TOP PRIORITY
                                    </span>
                                )}
                                <p className='text-gray-900 font-semibold text-base'>{doc.name}</p>
                                <p className='text-gray-600'>{doc.speciality}</p>

                                {item.emergency && item.reason && (
                                    <p className='text-sm text-red-700 font-medium mt-1'>Reason: {item.reason}</p>
                                )}

                                <p className='text-gray-800 font-medium mt-1'>Address:</p>
                                <p className='text-xs text-gray-600'>{doc.address.line1}</p>
                                <p className='text-xs text-gray-600'>{doc.address.line2}</p>
                                <p className='text-xs mt-1'>
                                    <span className='text-sm text-gray-800 font-medium'>Date &amp; Time:</span>{' '}
                                    <span className='text-gray-700'>{slotDateFormat(item.slotDate)} | {item.slotTime}</span>
                                </p>
                            </div>

                            <div></div>

                            <div className='flex flex-col gap-2 justify-end'>
                                {!item.payment ? (
                                    <button
                                        onClick={() => payAppointment(item._id)}
                                        className='text-sm font-semibold text-center sm:min-w-48 py-2 border rounded bg-primary text-white hover:bg-primary/90 transition-all duration-300'
                                    >
                                        Pay here
                                    </button>
                                ) : (
                                    <button className='sm:min-w-48 py-2 border rounded bg-primary text-white font-semibold cursor-default'>
                                        Paid
                                    </button>
                                )}
                                <button
                                    onClick={() => cancelAppointment(item._id)}
                                    className='text-sm font-medium text-gray-700 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300'
                                >
                                    Cancel appointment
                                </button>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyAppointments
