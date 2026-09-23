import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const { userData, setUserData } = useContext(AppContext)

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
        }
    }

    return (
        <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>

            {isEdit ? (
                <label htmlFor='image' className='cursor-pointer'>
                    <div className='relative inline-block'>
                        <img
                            className='w-36 h-36 rounded-full object-cover opacity-80'
                            src={image ? URL.createObjectURL(image) : (userData.image || assets.upload_area)}
                            alt='Profile'
                        />
                        <img
                            className='w-10 absolute bottom-2 right-2'
                            src={image ? assets.upload_icon : assets.upload_icon}
                            alt=''
                            style={{ display: image ? 'none' : 'block' }}
                        />
                    </div>
                    <input onChange={handleImageChange} type='file' id='image' hidden />
                </label>
            ) : (
                <img
                    className='w-36 h-36 rounded-full object-cover'
                    src={userData.image || assets.upload_area}
                    alt='Profile'
                />
            )}

            {isEdit ? (
                <input
                    className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 rounded px-2 py-1'
                    type='text'
                    value={userData.name}
                    onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                />
            ) : (
                <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
            )}

            <hr className='bg-zinc-400 h-[1px] border-none my-2' />

            <div>
                <p className='text-gray-700 font-bold underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-gray-800'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>

                    <p className='font-medium'>Phone:</p>
                    {isEdit ? (
                        <input
                            className='bg-gray-50 rounded px-2 py-1 max-w-52'
                            type='text'
                            value={userData.phone}
                            onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                    ) : (
                        <p className='text-blue-500'>{userData.phone}</p>
                    )}

                    <p className='font-medium'>Address:</p>
                    {isEdit ? (
                        <p>
                            <input
                                className='bg-gray-50 rounded px-2 py-1 w-full mb-1'
                                type='text'
                                value={userData.address.line1}
                                onChange={(e) =>
                                    setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))
                                }
                            />
                            <input
                                className='bg-gray-50 rounded px-2 py-1 w-full'
                                type='text'
                                value={userData.address.line2}
                                onChange={(e) =>
                                    setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))
                                }
                            />
                        </p>
                    ) : (
                        <p className='text-gray-500'>
                            {userData.address.line1}
                            <br />
                            {userData.address.line2}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <p className='text-gray-700 font-bold underline mt-5'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-gray-800'>
                    <p className='font-medium'>Gender:</p>
                    {isEdit ? (
                        <select
                            className='max-w-28 bg-gray-50 rounded px-2 py-1'
                            value={userData.gender}
                            onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                        >
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                        </select>
                    ) : (
                        <p className='text-gray-500'>{userData.gender}</p>
                    )}

                    <p className='font-medium'>Birthday:</p>
                    {isEdit ? (
                        <input
                            className='max-w-32 bg-gray-50 rounded px-2 py-1'
                            type='date'
                            value={userData.dob}
                            onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                        />
                    ) : (
                        <p className='text-gray-500'>{userData.dob}</p>
                    )}
                </div>
            </div>

            <div className='mt-10 flex gap-3'>
                {isEdit ? (
                    <button
                        onClick={() => setIsEdit(false)}
                        className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
                    >
                        Save information
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
                    >
                        Edit
                    </button>
                )}
            </div>

        </div>
    )
}

export default MyProfile
