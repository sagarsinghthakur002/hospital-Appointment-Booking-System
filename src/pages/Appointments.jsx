import { useContext, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { filterAvailableSlots } from '../utils/slotConflict'

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Appointments = () => {

  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, appointments, currencySymbol, token, bookAppointment } = useContext(AppContext)

  const docInfo = useMemo(() => doctors.find((doc) => doc._id === docId) || null, [doctors, docId])

  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const docSlots = useMemo(() => {
    if (!docInfo) return []

    const today = new Date()
    const allSlots = []

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      // ALGORITHM 3 — strip out any slot this doctor is already booked
      // for, so two patients can never grab the same appointment.
      allSlots.push(filterAvailableSlots(timeSlots, appointments, docId))
    }

    return allSlots
  }, [docInfo, appointments, docId])

  const handleBooking = () => {
    if (!token) {
      navigate('/login')
      return
    }
    if (!slotTime || !docSlots[slotIndex] || docSlots[slotIndex].length === 0) return

    const date = docSlots[slotIndex][0].datetime
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

    const success = bookAppointment(docId, slotDate, slotTime)
    if (success) {
      navigate('/my-appointments')
    } else {
      setSlotTime('')
    }
  }

  const feeLabel = useMemo(() => (docInfo ? `${currencySymbol}${docInfo.fees}` : ''), [docInfo, currencySymbol])

  if (!docInfo) {
    return <p className='text-center py-20 text-gray-500'>Loading doctor details...</p>
  }

  return (
    <div>

      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4'>

        {/* Doctor Image */}
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
        </div>

        {/* Doctor Information */}
        <div className='flex-1 border border-gray-300 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-lg'>

          <div className='flex items-center gap-2'>
            <h1 className='text-2xl font-semibold'>{docInfo.name}</h1>
            <img className='w-5' src={assets.verified_icon} alt='Verified' />
          </div>

          <div className='flex items-center gap-3 mt-2 text-gray-700 font-medium'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='border border-gray-300 rounded-full px-3 py-1 text-sm'>{docInfo.experience}</button>
          </div>

          <div className='mt-5'>
            <div className='flex items-center gap-2'>
              <p className='font-bold text-sm text-gray-800'>About</p>
              <img className='w-4' src={assets.about_icon} alt='About' />
            </div>
            <p className='text-gray-700 mt-2 text-sm leading-6 max-w-[700px]'>{docInfo.about}</p>
          </div>

          <p className='text-gray-800 font-semibold mt-4'>
            Appointment fee: <span className='text-gray-800'>{feeLabel}</span>
          </p>

        </div>

      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-8 font-bold text-lg text-gray-800'>
        <p>Booking slots</p>

        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                onClick={() => { setSlotIndex(index); setSlotTime('') }}
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all ${
                  slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length > 0 && docSlots[slotIndex].length === 0 && (
            <p className='text-sm text-gray-600 font-medium'>No slots available for this day.</p>
          )}
          {docSlots.length > 0 &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                key={index}
                className={`text-sm font-medium flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all ${
                  item.time === slotTime ? 'bg-primary text-white' : 'text-gray-700 border border-gray-300'
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={handleBooking}
          className='bg-primary text-white text-sm font-semibold px-14 py-3 rounded-full my-6 hover:opacity-90 transition-all disabled:opacity-50'
          disabled={!slotTime}
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docInfo._id} />

    </div>
  )
}

export default Appointments
