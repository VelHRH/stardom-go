import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages";
import GrandPrixMatches from "./pages/grandprix";
import GrandPrixMatchesChart from "./pages/grandprixchart";
import GrandPrixWrestlers from "./pages/grandprixwrestlers";
import Matches from "./pages/matches";

function App() {
 return (
  <div className="bg-slate-900 min-h-screen">
   <BrowserRouter>
    <Navbar />
    <div className="w-3/4 mx-auto">
     <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/matches/grandprix" element={<GrandPrixMatches />} />
      <Route
       path="/matches/grandprix/chart"
       element={<GrandPrixMatchesChart />}
      />
      <Route
       path="/matches/grandprix/wrestlers"
       element={<GrandPrixWrestlers />}
      />
     </Routes>
    </div>
   </BrowserRouter>
  </div>
 );
}

export default App;
