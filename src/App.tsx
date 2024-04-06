import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Routes as AppRoutes } from "./routing/routes";
import Layout from "./_layouts";
import { CartProvider } from "./components";
import { Home, Competition, CompetitionSubmission, CreateProduct, CreateCategory } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path={AppRoutes.ROOT} element={<Layout />}>
            {/* Client Routes */}
            <Route index element={<Home />} />
            <Route path={AppRoutes.COMPETITION} element={<Competition />} />
            <Route path={AppRoutes.COMPETITION_SUBMISSION} element={<CompetitionSubmission />} />

            {/* Admin Routes */}
            <Route path={AppRoutes.ADMIN_DASHBOARD} element={<span>Admin Dashboard</span>} />
            <Route path={AppRoutes.CREATE_PRODUCT} element={<CreateProduct />} />
            <Route path={AppRoutes.CREATE_CATEGORY} element={<CreateCategory />} />

            <Route path="*" element={<Navigate to={AppRoutes.ROOT} />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
