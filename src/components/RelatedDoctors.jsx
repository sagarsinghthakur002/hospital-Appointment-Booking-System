import { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const relDocs = useMemo(() => {
        if (!speciality) return []
        return doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
    }, [doctors, speciality, docId])

    if (relDocs.length === 0) return null

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Related Doctors</h1>
            <p className='sm:w-1/3 text-center text-sm'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5 px-3 sm:px-0'>
                {relDocs.slice(0, 5).map((item) => (
                    <div
                        onClick={() => {
                            navigate(`/appointments/${item._id}`)
                            scrollTo(0, 0)
                        }}
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
                            <p className='text-sm font-medium text-gray-900'>{item.name}</p>
                            <p className='text-sm text-gray-600 mt-1'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedDoctors
