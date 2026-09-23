import { useContext, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [showFilter, setShowFilter] = useState(false)

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ]

  const filterDoc = useMemo(() => {
    return speciality ? doctors.filter((doc) => doc.speciality === speciality) : doctors
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-700 font-medium'>Browse through the doctors specialist.</p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}
        >
          Filters
        </button>

        <div className={`flex-col gap-4 text-sm font-medium text-gray-700 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specialities.map((spec) => (
            <p
              key={spec}
              onClick={() =>
                speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === spec ? 'bg-indigo-100 text-black' : ''
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
          {filterDoc.length === 0 && (
            <p className='text-gray-600 text-sm font-medium col-span-full'>No doctors found for this speciality.</p>
          )}
          {filterDoc.map((item) => (
            <div
              onClick={() => navigate(`/appointments/${item._id}`)}
              key={item._id}
              className='border border-blue-100 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 bg-white'
            >
              <div className='bg-blue-50'>
                <img className='w-full h-[145px] object-contain' src={item.image} alt={item.name} />
              </div>
              <div className='px-3 py-3'>
                <div className='flex items-center gap-2 text-xs text-green-500 mb-1'>
                  <span className='w-1.5 h-1.5 bg-green-500 rounded-full'></span>
                  <span>Available</span>
                </div>
                <p className='text-sm font-semibold text-gray-900'>{item.name}</p>
                <p className='text-sm text-gray-600 mt-1'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
