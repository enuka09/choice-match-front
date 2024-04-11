import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IProduct, ICategory, ISubCategory, IBrand } from "../../../../models";
import { ThemedTextField, ThemedTextArea, ThemedTextDropdown, ThemedToggleSwitch } from "../../../../components";
import * as theme from "../../../../theme";
const baseURL = process.env.REACT_APP_BASE_URL;

interface EditProductContentProps {
  product: IProduct;
  handleImageUpload: (file: File) => Promise<void>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mainCategories: ICategory[];
  subCategories: ISubCategory[];
  brands: IBrand[];
}

const EditProductContent: React.FC<EditProductContentProps> = ({
  product,
  handleImageUpload,
  handleChange,
  handleCheckboxChange,
  mainCategories,
  subCategories,
  brands,
}) => {
  const [subCategoriesChange, setSubCategoriesChange] = useState<ISubCategory[]>(subCategories);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (product.mainCategory) {
        try {
          const response = await axios.get(`${baseURL}/sub-categories/find-by-main-category/${product.mainCategory}`);
          setSubCategoriesChange(response.data);
        } catch (error) {
          console.error("Failed to fetch subcategories:", error);
        }
      }
    };

    fetchSubCategories();
  }, [product.mainCategory, subCategories]);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      await handleImageUpload(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={theme.adminModal.modalContainer}>
      <div className={theme.adminModal.imageContainer}>
        <img src={product.image} alt={product.name} className={theme.adminModal.image} />
        <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" />
        <button type="button" className={theme.adminModal.button} onClick={triggerFileInput}>
          Upload Image
        </button>
      </div>
      <ThemedTextField type="text" name="name" value={product.name} label="Product Name" onChange={handleChange} />
      <ThemedTextArea
        name="description"
        value={product.description || ""}
        label="Description"
        onChange={handleChange}
      />
      <ThemedTextField
        type="number"
        name="unitPrice"
        value={String(product.unitPrice)}
        label="Unit Price (LKR)"
        onChange={handleChange}
      />
      <ThemedTextDropdown
        name="mainCategory"
        value={product.mainCategory}
        label="Main Category"
        options={mainCategories.map(category => ({ value: category.name, label: category.name }))}
        onChange={handleChange}
      />
      <ThemedTextDropdown
        name="subCategory"
        value={product.subCategory}
        label="Sub Category"
        options={subCategoriesChange.map(subCategory => ({ value: subCategory.name, label: subCategory.name }))}
        onChange={handleChange}
      />
      <ThemedTextDropdown
        name="brand"
        value={product.brand}
        label="Brand"
        options={brands.map(brand => ({ value: brand.name, label: brand.name }))}
        onChange={handleChange}
      />
      <ThemedTextField
        type="number"
        name="qtyOnHand"
        value={String(product.qtyOnHand)}
        label="Quantity on Hand"
        onChange={handleChange}
      />
      <ThemedToggleSwitch
        checked={product.isFeatured}
        onChange={handleCheckboxChange}
        name="isFeatured"
        label="Featured Item"
      />
    </div>
  );
};

export default EditProductContent;
