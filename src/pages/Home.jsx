import Header from '../components/Header'
import EmergencyBanner from '../components/EmergencyBanner'
import SpecialityMenu from '../components/SpecialityMenu'
import ToDoctors from '../components/ToDoctors'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div>
      <EmergencyBanner />
      <Header />
      <SpecialityMenu />
      <ToDoctors />
      <Banner />
    </div>
  )
}

export default Home
