import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Routes as AppRoutes } from "./routing/routes";
import Layout from "./_layouts";
import { CartProvider, MessageCard } from "./components";
import { ScrollToTop, CheckoutProvider } from "./utils";
import {
  Home,
  CheckoutShipping,
  CheckoutBilling,
  Competition,
  CompetitionSubmission,
  ViewProducts,
  CreateProduct,
  CategoryContent,
  CreateCategory,
  SubCategoryContent,
  CreateSubCategory,
  BrandContent,
  CreateBrand,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <CheckoutProvider>
          <Routes>
            <Route path={AppRoutes.ROOT} element={<Layout />}>
              {/* Client Routes */}
              <Route index element={<Home />} />
              <Route path={AppRoutes.COMPETITION} element={<Competition />} />
              <Route path={AppRoutes.COMPETITION_SUBMISSION} element={<CompetitionSubmission />} />

              {/* Admin Routes */}
              <Route path={AppRoutes.ADMIN_DASHBOARD} element={<span>Admin Dashboard</span>} />
              <Route path={AppRoutes.VIEW_PRODUCTS} element={<ViewProducts />} />
              <Route path={AppRoutes.CREATE_PRODUCT} element={<CreateProduct />} />
              <Route path={AppRoutes.CATEGORY_CONTENT} element={<CategoryContent />} />
              <Route path={AppRoutes.CREATE_CATEGORY} element={<CreateCategory />} />
              <Route path={AppRoutes.SUBCATEGORY_CONTENT} element={<SubCategoryContent />} />
              <Route path={AppRoutes.CREATE_SUBCATEGORY} element={<CreateSubCategory />} />
              <Route path={AppRoutes.BRAND_CONTENT} element={<BrandContent />} />
              <Route path={AppRoutes.CREATE_BRAND} element={<CreateBrand />} />

              <Route path="*" element={<Navigate to={AppRoutes.ROOT} />} />
            </Route>
            <Route path={`${AppRoutes.CHECKOUT_SHIPPING}/:orderId`} element={<CheckoutShipping />} />
            <Route path={`${AppRoutes.CHECKOUT_BILLING}/:orderId`} element={<CheckoutBilling />} />
            <Route path={`${AppRoutes.MESSAGE}/:orderId`} element={<MessageCard />} />
          </Routes>
        </CheckoutProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
