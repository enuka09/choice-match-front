import React, { useRef } from "react";
import { ISubCategory, ICategory } from "../../../../../models";
import { ThemedTextDropdown, ThemedTextField } from "../../../../../components";
import * as theme from "../../../../../theme";

interface EditSubCategoryContentProps {
  subCategory: ISubCategory;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: (file: File) => Promise<void>;
  mainCategories: ICategory[];
}

const EditSubCategoryContent: React.FC<EditSubCategoryContentProps> = ({
  subCategory,
  handleImageUpload,
  handleChange,
  mainCategories,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <div className={theme.adminModal.container}>
      <div className={theme.adminModal.imageContainer}>
        <img src={subCategory.image} alt={subCategory.name} className={theme.adminModal.image} />
        <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" />
        <button type="button" className={theme.adminModal.button} onClick={triggerFileInput}>
          Upload Image
        </button>
      </div>
      <ThemedTextField type="text" name="name" value={subCategory.name} label="Category Name" onChange={handleChange} />
      <ThemedTextDropdown
        name="mainCategory"
        value={subCategory.mainCategory}
        label="Main Category"
        options={mainCategories.map(category => ({ value: category._id, label: category.name }))}
        onChange={handleChange}
      />
    </div>
  );
};

export default EditSubCategoryContent;
