import React, { useRef } from "react";
import { ICategory } from "../../../../../models";
import { ThemedTextField } from "../../../../../components";
import * as theme from "../../../../../theme";

interface EditBrandContentProps {
  category: ICategory;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (file: File) => Promise<void>;
}

const EditBrandContent: React.FC<EditBrandContentProps> = ({ category, handleImageUpload, handleChange }) => {
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
        <img src={category.image} alt={category.name} className={theme.adminModal.images} />
        <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" />
        <button type="button" className={theme.adminModal.button} onClick={triggerFileInput}>
          Upload Image
        </button>
      </div>
      <ThemedTextField type="text" name="name" value={category.name} label="Category Name" onChange={handleChange} />
    </div>
  );
};

export default EditBrandContent;
