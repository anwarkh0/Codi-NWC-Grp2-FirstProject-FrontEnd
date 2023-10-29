import "../src/styles/App.css";
import Service from "./components/Service";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";

function App() {
  return (
    <div>
      <Service />
      <AboutUs />
      <Testimonials />
      <Location />
    </div>
  );
}

export default App;
