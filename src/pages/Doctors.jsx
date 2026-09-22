import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

    const { speciality } = useParams()
    const {filterDoc, setFilterDoc} = useContext(AppContext)

    const { doctors } = useContext(AppContext)

    const appltFilter = () => {
        if (speciality) {
          setFilterDoc(doctors.filter((doctor) => doctor.speciality === speciality));
        } else {
          setFilterDoc(doctors);
        }
      }

      useEffect(() => {
        appltFilter();
      },[doctors, speciality])

    return (
        <div>
            <p>Browse through the doctors specialist.</p>

            <div>
                <div>
                    <p>General physician</p>
                    <p>Gynecologist</p>
                    <p>Dermatologist</p>
                    <p>Pediatricians</p>
                    <p>Neurologist</p>
                    <p>Gastroenterologist</p>
                </div>
            </div>
            <div >
              {
                filterDoc.map((item, index) => (

                    <div onClick={() => navigate(`/appointments/${item._id}`)}
                        key={index}
                        className='border border-blue-100 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 bg-white'
                    >


                        <div className='bg-blue-50'>
                            <img
                                className='w-full h-[145px] object-contain'
                                src={item.image}
                                alt={item.name}
                            />
                        </div>


                        <div className='px-3 py-3'>


                            <div className='flex items-center gap-2 text-xs text-green-500 mb-1'>
                                <span className='w-1.5 h-1.5 bg-green-500 rounded-full'></span>
                                <span>Available</span>
                            </div>


                            <p className='text-sm font-medium text-gray-900'>
                                {item.name}
                            </p>


                            <p className='text-sm text-gray-600 mt-1 '>
                                {item.speciality}
                            </p>

                        </div>

                    </div>

                ))
                }
            </div>
        </div>
    )
}

export default Doctors