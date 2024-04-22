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
  SelectionBasedRecommendations,
  PromptBasedRecommendations,
  Auth,
  ViewProducts,
  CreateProduct,
  CategoryContent,
  CreateCategory,
  SubCategoryContent,
  CreateSubCategory,
  BrandContent,
  CreateBrand,
} from "./pages";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import loader from "./assests/other/default_loader.json";
import ProtectedRoute from "./components/molecules/ProtectedRoute";

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner-overlay">
          <Lottie
            options={{
              animationData: loader,
              loop: true,
              autoplay: true,
            }}
            height={180}
            width={180}
          />
        </div>
      ) : (
        <BrowserRouter>
          <div>
            <ScrollToTop />
            <CartProvider>
              <CheckoutProvider>
                <Routes>
                  <Route path={AppRoutes.ROOT} element={<Layout />}>
                    {/* Client Routes */}
                    <Route index element={<Home />} />
                    <Route path={AppRoutes.COMPETITION} element={<Competition />} />
                    <Route path={AppRoutes.COMPETITION_SUBMISSION} element={<CompetitionSubmission />} />
                    {/* <Route path={AppRoutes.FASHION_RECOMMENDER} element={<SelectionBasedRecommendations />} /> */}
                    <Route
                      path={AppRoutes.SELECTION_FASHION_RECOMMENDER}
                      element={
                        <ProtectedRoute>
                          <SelectionBasedRecommendations />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path={AppRoutes.PROMPT_FASHION_RECOMMENDER}
                      element={
                        <ProtectedRoute>
                          <PromptBasedRecommendations />
                        </ProtectedRoute>
                      }
                    />
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
                  <Route
                    path={AppRoutes.AUTH}
                    element={
                      <ProtectedRoute>
                        <div className="auth">
                          <Auth />
                        </div>
                      </ProtectedRoute>
                    }
                  />

                  <Route path={`${AppRoutes.CHECKOUT_SHIPPING}/:orderId`} element={<CheckoutShipping />} />
                  <Route path={`${AppRoutes.CHECKOUT_BILLING}/:orderId`} element={<CheckoutBilling />} />
                  <Route path={`${AppRoutes.MESSAGE}/:orderId`} element={<MessageCard />} />
                </Routes>
              </CheckoutProvider>
            </CartProvider>
          </div>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
