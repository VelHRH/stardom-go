import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages";

function App() {
 return (
  <div className="bg-slate-900 min-h-screen">
   <BrowserRouter>
    <Navbar />
    <Routes>
     <Route path="/" element={<Index />} />
     <Route path="/matches" element={<Index />} />
    </Routes>
   </BrowserRouter>
  </div>
 );
}

export default App;
