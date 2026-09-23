import { createContext, useEffect, useState } from 'react'
import { doctors as doctorsData } from '../assets/assets.js'
import { toast } from 'react-toastify'
import { assignLeastBusyDoctor } from '../utils/assignDoctor.js'
import { isSlotTaken } from '../utils/slotConflict.js'
import { sortAppointmentsByPriority } from '../utils/priorityQueue.js'

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
    const [doctors, setDoctors] = useState(doctorsData)

    const addDoctor = (doctor) => {
        const newDoctor = {
            _id: 'doc' + Date.now(),
            image: doctor.image || doctorsData[0].image,
            ...doctor
        }
        setDoctors((prev) => [newDoctor, ...prev])
        toast.success('Doctor added successfully')
        return newDoctor
    }

    // ---------- Admin Auth ----------
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : false)

    const adminLogin = (email, password) => {
        if (email === 'admin@ms.com' && password === 'admin123') {
            localStorage.setItem('aToken', 'true')
            setAToken('true')
            toast.success('Welcome back, Admin')
            return true
        }
        toast.error('Invalid admin credentials')
        return false
    }

    const adminLogout = () => {
        localStorage.removeItem('aToken')
        setAToken(false)
        toast.info('Logged out of Admin Panel')
    }

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
            isCompleted: false,
            emergency: false,
            createdAt: 1
        },
        {
            _id: 'appt2',
            docId: 'doc1',
            slotDate: '25_7_2024',
            slotTime: '9:00 PM',
            cancelled: false,
            payment: false,
            isCompleted: false,
            emergency: false,
            createdAt: 2
        },
        {
            _id: 'appt3',
            docId: 'doc1',
            slotDate: '25_7_2024',
            slotTime: '9:30 PM',
            cancelled: false,
            payment: true,
            isCompleted: false,
            emergency: false,
            createdAt: 3
        }
    ])

    // ALGORITHM 3 usage — reject a booking if the doctor is already
    // taken for that exact date + time (see utils/slotConflict.js).
    const bookAppointment = (docId, slotDate, slotTime) => {
        if (isSlotTaken(appointments, docId, slotDate, slotTime)) {
            toast.error('That slot was just taken — please pick another time')
            return false
        }

        const newAppointment = {
            _id: 'appt' + Date.now(),
            docId,
            slotDate,
            slotTime,
            cancelled: false,
            payment: false,
            isCompleted: false,
            emergency: false,
            createdAt: Date.now()
        }
        setAppointments((prev) => [newAppointment, ...prev])
        toast.success('Appointment booked successfully')
        return true
    }

    // Emergency appointments are always tier-0 in the priority queue
    // (see utils/priorityQueue.js) so they float to the top everywhere
    // they're displayed. If no doctor is specified, ALGORITHM 2 —
    // least-busy load balancing — picks who to route the patient to.
    const bookEmergencyAppointment = ({ name, phone, reason, docId, speciality }) => {
        const today = new Date()
        const slotDate = `${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()}`

        const requestedDoc = docId ? doctors.find((doc) => doc._id === docId) : null
        const assignedDoc = requestedDoc || assignLeastBusyDoctor(doctors, appointments, speciality)

        const newAppointment = {
            _id: 'emg' + Date.now(),
            docId: assignedDoc?._id,
            slotDate,
            slotTime: 'ASAP',
            cancelled: false,
            payment: false,
            isCompleted: false,
            emergency: true,
            patientName: name,
            patientPhone: phone,
            reason,
            createdAt: Date.now()
        }
        setAppointments((prev) => [newAppointment, ...prev])
        toast.success(`Emergency request sent — routed to ${assignedDoc?.name || 'the next available doctor'}`)
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

    const calculateAge = (dob) => {
        if (!dob) return '-'
        const birth = new Date(dob)
        if (Number.isNaN(birth.getTime())) return '-'
        const diff = Date.now() - birth.getTime()
        return Math.abs(new Date(diff).getUTCFullYear() - 1970)
    }

    // Resolves display info for whoever the appointment is for — the
    // logged-in patient for normal bookings, or the submitted details
    // for an emergency request.
    const getPatientInfo = (appointment) => {
        if (appointment.emergency) {
            return { name: appointment.patientName || 'Unknown', age: '-' }
        }
        return { name: userData.name, age: calculateAge(userData.dob) }
    }

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        }
    }, [token])

    useEffect(() => {
        if (aToken) {
            localStorage.setItem('aToken', aToken)
        }
    }, [aToken])

    // ALGORITHM 1 — every consumer gets appointments already ordered by
    // the priority queue (emergency-first, then FIFO), so no screen has
    // to re-sort manually.
    const priorityAppointments = sortAppointmentsByPriority(appointments)

    const value = {
        doctors,
        addDoctor,
        currencySymbol,
        token,
        setToken,
        login,
        logout,
        aToken,
        adminLogin,
        adminLogout,
        userData,
        setUserData,
        appointments,
        priorityAppointments,
        bookAppointment,
        bookEmergencyAppointment,
        cancelAppointment,
        payAppointment,
        calculateAge,
        getPatientInfo
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
