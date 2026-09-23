import { useContext, useMemo } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const Patients = () => {

    const { appointments, doctors, getPatientInfo } = useContext(AppContext)

    const patients = useMemo(() => {
        const map = new Map()
        appointments.forEach((item) => {
            const info = getPatientInfo(item)
            const doc = doctors.find((d) => d._id === item.docId)
            const existing = map.get(info.name) || { name: info.name, age: info.age, visits: 0, emergency: false }
            existing.visits += 1
            existing.emergency = existing.emergency || item.emergency
            existing.lastDoctor = doc?.name
            map.set(info.name, existing)
        })
        return Array.from(map.values())
    }, [appointments, doctors, getPatientInfo])

    return (
        <div>
            <p className='text-xl font-bold text-gray-800 mb-4'>Patients</p>

            <div className='bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-sm'>
                <div className='min-w-[500px]'>
                    <div className='grid grid-cols-[2.5fr_1fr_1fr_2fr] items-center py-3 px-5 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wide'>
                        <p>Patient</p>
                        <p>Age</p>
                        <p>Visits</p>
                        <p>Last Doctor Seen</p>
                    </div>

                    {patients.length === 0 && (
                        <p className='px-5 py-6 text-sm text-gray-500'>No patients yet.</p>
                    )}

                    {patients.map((p) => (
                        <div key={p.name} className='grid grid-cols-[2.5fr_1fr_1fr_2fr] items-center py-3 px-5 border-b border-gray-100 last:border-0 text-sm text-gray-700 hover:bg-gray-50'>
                            <div className='flex items-center gap-2'>
                                <img className='w-8 h-8 rounded-full object-cover bg-gray-100' src={assets.profile_pic} alt='' />
                                <p className='font-medium text-gray-800'>{p.name}</p>
                                {p.emergency && (
                                    <span className='text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded-full'>
                                        EMERGENCY
                                    </span>
                                )}
                            </div>
                            <p>{p.age}</p>
                            <p>{p.visits}</p>
                            <p>{p.lastDoctor}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Patients
