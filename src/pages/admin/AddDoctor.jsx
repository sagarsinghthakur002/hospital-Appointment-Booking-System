import { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
]

const AddDoctor = () => {

    const { addDoctor } = useContext(AppContext)

    const [docImg, setDocImg] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [speciality, setSpeciality] = useState(specialities[0])
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [about, setAbout] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        addDoctor({
            name,
            email,
            image: docImg ? URL.createObjectURL(docImg) : undefined,
            speciality,
            degree,
            experience,
            fees: Number(fees) || 0,
            about,
            address: { line1: address1, line2: address2 }
        })

        setDocImg(null)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setFees('')
        setSpeciality(specialities[0])
        setDegree('')
        setAddress1('')
        setAddress2('')
        setAbout('')
    }

    return (
        <div>
            <p className='text-xl font-bold text-gray-800 mb-4'>Add Doctor</p>

            <form onSubmit={onSubmit} className='bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm max-w-4xl'>

                <label htmlFor='doc-img' className='flex items-center gap-4 mb-8 cursor-pointer'>
                    <img
                        className='w-16 h-16 rounded-full object-cover bg-gray-100 border border-gray-200'
                        src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                        alt=''
                    />
                    <p className='text-sm text-gray-600 font-medium'>
                        Upload doctor <br /> picture
                    </p>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type='file' id='doc-img' hidden accept='image/*' />
                </label>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-sm text-gray-700'>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-gray-800'>Doctor name</label>
                        <input
                            className='border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary'
                            type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-gray-800'>Speciality</label>
                        <select
                            className='border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary bg-white'
                            value={speciality} onChange={(e) => setSpeciality(e.target.value)}
                        >
                            {specialities.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-gray-800'>Doctor Email</label>
                        <input
                            className='border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary'
                            type='email' placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-gray-800'>Education</label>
                        <input
                            className='border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary'
                            type='text' placeholder='Education' value={degree} onChange={(e) => setDegree(e.target.value)} required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-gray-800'>Doctor Password</label>
                        <input
                            className='border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary'
                            type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-gray-800'>Address</label>
                        <input
                            className='border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary mb-2'
                            type='text' placeholder='Address 1' value={address1} onChange={(e) => setAddress1(e.target.value)} required
                        />
                        <input
                            className='border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary'
                            type='text' placeholder='Address 2' value={address2} onChange={(e) => setAddress2(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-gray-800'>Experience</label>
                        <select
                            className='border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary bg-white'
                            value={experience} onChange={(e) => setExperience(e.target.value)}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((y) => (
                                <option key={y} value={`${y} Year${y > 1 ? 's' : ''}`}>{y} Year{y > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='font-semibold text-gray-800'>Fees</label>
                        <input
                            className='border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary'
                            type='number' placeholder='Your fees' value={fees} onChange={(e) => setFees(e.target.value)} required
                        />
                    </div>

                </div>

                <div className='flex flex-col gap-1 mt-5 text-sm text-gray-700'>
                    <label className='font-semibold text-gray-800'>About me</label>
                    <textarea
                        className='border border-gray-300 rounded px-3 py-2 outline-none focus:border-primary min-h-28'
                        placeholder='Write about yourself' value={about} onChange={(e) => setAbout(e.target.value)}
                    />
                </div>

                <button
                    type='submit'
                    className='bg-primary text-white font-semibold px-10 py-2.5 rounded-full mt-6 hover:opacity-90 transition-all'
                >
                    Add doctor
                </button>

            </form>
        </div>
    )
}

export default AddDoctor
