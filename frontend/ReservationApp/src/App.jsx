import Calendar from "./components/calendar/Calendar";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Reservations from "./components/reservations/Reservations";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Calendar />
      <Reservations clientId={1} />
    </>
  );
}

export default App;
