// Client
export { default as Home } from "./home";
export { default as CheckoutShipping } from "./checkout/shippingDetails";
export { default as CheckoutBilling } from "./checkout/paymentDetails";
export { default as Competition } from "./outfitCompetition/competitionDetails";
export { default as CompetitionSubmission } from "./outfitCompetition/competitionSubmission";
export { default as SelectionBasedRecommendations } from "./fashionRecommendation/selectionMode";
export { default as PromptBasedRecommendations } from "./fashionRecommendation/promptMode";
export { default as Auth } from "./fashionRecommendation";

// Admin
export { default as ViewProducts } from "./admin/products/viewProducts";
export { default as ProductContent } from "./admin/products/productDetails";
export { default as CreateProduct } from "./admin/products/addProduct";
export { default as EditProductContent } from "./admin/products/updateProduct";

export { default as CategoryContent } from "./admin/categories/main";
export { default as CreateCategory } from "./admin/categories/main/addCategory";
export { default as EditCategoryContent } from "./admin/categories/main/updateCategory";

export { default as SubCategoryContent } from "./admin/categories/sub";
export { default as CreateSubCategory } from "./admin/categories/sub/addSubCategory";
export { default as EditSubCategoryContent } from "./admin/categories/sub/updateSubCategory";

export { default as BrandContent } from "./admin/brands";
export { default as CreateBrand } from "./admin/brands/addBrand";
export { default as EditBrandContent } from "./admin/brands/updateBrand";
