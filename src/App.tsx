import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Routes as AppRoutes } from "./routing/routes";
import Layout from "./_layouts";
import Home from "./pages/home";
import Competition from "./pages/outfitCompetition/competitionDetails";
import CompetitionSubmission from "./pages/outfitCompetition/competitionSubmission";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.ROOT} element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path={AppRoutes.AUTHENTICATION} element="#" /> */}
          <Route path="/user-profile" element={<span>User Profile Page</span>} />
          <Route path="/outfit-competition" element={<Competition />} />
          <Route path="/outfit-competition/submission" element={<CompetitionSubmission />} />
          <Route path="*" element={<Navigate to={AppRoutes.ROOT} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
