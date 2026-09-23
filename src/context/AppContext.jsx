import { createContext, useEffect, useState } from 'react'
import { doctors as doctorsData } from '../assets/assets.js'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const currencySymbol = '$'

const AppContextProvider = (props) => {

    // ---------- Auth ----------
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

    const login = (email) => {
        localStorage.setItem('token', 'true')
        setToken('true')
        if (email) {
            setUserData((prev) => (prev.email ? prev : { ...prev, email }))
        }
        toast.success('Logged in successfully')
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(false)
        toast.info('Logged out')
    }

    // ---------- Doctors ----------
    const [doctors] = useState(doctorsData)

    // ---------- Profile ----------
    const [userData, setUserData] = useState({
        name: 'Edward Vincent',
        image: null,
        email: 'richardjameswap@gmail.com',
        phone: '+1 123 456 7890',
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Church Road, London'
        },
        gender: 'Male',
        dob: '2024-07-20'
    })

    // ---------- Appointments ----------
    // seeded with the same demo appointments shown in the reference UI
    const [appointments, setAppointments] = useState([
        {
            _id: 'appt1',
            docId: 'doc1',
            slotDate: '25_7_2024',
            slotTime: '8:30 PM',
            cancelled: false,
            payment: false,
            isCompleted: false
        },
        {
            _id: 'appt2',
            docId: 'doc1',
            slotDate: '25_7_2024',
            slotTime: '8:30 PM',
            cancelled: false,
            payment: false,
            isCompleted: false
        },
        {
            _id: 'appt3',
            docId: 'doc1',
            slotDate: '25_7_2024',
            slotTime: '8:30 PM',
            cancelled: false,
            payment: true,
            isCompleted: false
        }
    ])

    const bookAppointment = (docId, slotDate, slotTime) => {
        const newAppointment = {
            _id: 'appt' + Date.now(),
            docId,
            slotDate,
            slotTime,
            cancelled: false,
            payment: false,
            isCompleted: false,
            emergency: false
        }
        setAppointments((prev) => [newAppointment, ...prev])
        toast.success('Appointment booked successfully')
    }

    // Emergency appointments always get inserted at the very top and are
    // flagged so the UI can badge + sort them ahead of everything else.
    const bookEmergencyAppointment = ({ name, phone, reason, docId }) => {
        const today = new Date()
        const slotDate = `${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()}`

        const fallbackDoc = doctors.find((doc) => doc._id === docId) || doctors[0]

        const newAppointment = {
            _id: 'emg' + Date.now(),
            docId: fallbackDoc?._id,
            slotDate,
            slotTime: 'ASAP',
            cancelled: false,
            payment: false,
            isCompleted: false,
            emergency: true,
            patientName: name,
            patientPhone: phone,
            reason
        }
        setAppointments((prev) => [newAppointment, ...prev])
        toast.success('Emergency request sent — a doctor will contact you shortly')
        return newAppointment
    }

    const cancelAppointment = (appointmentId) => {
        setAppointments((prev) =>
            prev.map((item) =>
                item._id === appointmentId ? { ...item, cancelled: true } : item
            )
        )
        toast.success('Appointment cancelled')
    }

    const payAppointment = (appointmentId) => {
        setAppointments((prev) =>
            prev.map((item) =>
                item._id === appointmentId ? { ...item, payment: true } : item
            )
        )
        toast.success('Payment successful')
    }

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        }
    }, [token])

    const value = {
        doctors,
        currencySymbol,
        token,
        setToken,
        login,
        logout,
        userData,
        setUserData,
        appointments,
        bookAppointment,
        bookEmergencyAppointment,
        cancelAppointment,
        payAppointment
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
