import "../src/styles/App.css";
import Service from "./components/Service";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";
import Footer from "./components/Footer";
import HomeFooter from "./components/HomeFooter";

function App() {
  return (
    <div>
      <Service />
      <AboutUs />
      <Testimonials />
      <Location />
      <Footer />
      <HomeFooter />
    </div>
  );
}

export default App;
