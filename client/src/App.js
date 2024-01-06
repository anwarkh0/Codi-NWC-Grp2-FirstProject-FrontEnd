import "./App.css";
import AppRouter from "./Routers/Routers";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <AppRouter />
      </HelmetProvider>
    </div>
  );
}

export default App;
