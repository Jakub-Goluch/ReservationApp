import Calendar from "./components/calendar/Calendar";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Reservations from "./components/reservations/Reservations";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Calendar />
      <Reservations clientId={1} />
      <Register />
      <Login />
    </>
  );
}

export default App;
