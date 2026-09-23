import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const DoctorsList = () => {

    const { doctors } = useContext(AppContext)

    return (
        <div>
            <p className='text-xl font-bold text-gray-800 mb-4'>All Doctors</p>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {doctors.map((doc) => (
                    <div
                        key={doc._id}
                        className='border border-gray-200 rounded-xl overflow-hidden bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-300'
                    >
                        <div className='bg-indigo-50'>
                            <img className='w-full h-[145px] object-contain' src={doc.image} alt={doc.name} />
                        </div>
                        <div className='px-3 py-3'>
                            <p className='text-sm font-semibold text-gray-900'>{doc.name}</p>
                            <p className='text-sm text-gray-600'>{doc.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorsList
