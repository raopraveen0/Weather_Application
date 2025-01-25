import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import WeatherPage from "../components/weather/WeatherPage"

const Home = () => {
  return (
    <div>
    <Navbar />
    <WeatherPage />
    <Footer />
    </div>
  )
}

export default Home