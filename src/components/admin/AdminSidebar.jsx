import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: assets.home_icon },
    { to: '/admin/appointments', label: 'Appointments', icon: assets.appointment_icon },
    { to: '/admin/add-doctor', label: 'Add Doctor', icon: assets.add_icon },
    { to: '/admin/doctors-list', label: 'Doctors List', icon: assets.people_icon },
    { to: '/admin/patients', label: 'Patients', icon: assets.patients_icon },
]

const AdminSidebar = () => {
    return (
        <div className='min-h-screen w-16 md:w-64 bg-white border-r border-gray-200 shrink-0'>
            <ul className='mt-6 text-gray-700'>
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-3 px-3 md:px-9 cursor-pointer transition-all ${
                                isActive
                                    ? 'bg-indigo-50 border-r-4 border-primary text-primary font-semibold'
                                    : 'hover:bg-gray-50'
                            }`
                        }
                    >
                        <img className='w-5 h-5' src={item.icon} alt='' />
                        <p className='hidden md:block font-medium'>{item.label}</p>
                    </NavLink>
                ))}
            </ul>
        </div>
    )
}

export default AdminSidebar
