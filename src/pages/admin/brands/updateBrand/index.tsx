import React, { useRef } from "react";
import * as theme from "../../../../theme";
import { IBrand } from "../../../../models";
import { ThemedTextField } from "../../../../components";

interface EditBrandContentProps {
  brand: IBrand;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: (file: File) => Promise<void>;
}

const EditBrandContent: React.FC<EditBrandContentProps> = ({ brand, handleImageUpload, handleChange }) => {
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
        <img src={brand.image} alt={brand.name} className={theme.adminModal.images} />
        <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" />
        <button type="button" className={theme.adminModal.button} onClick={triggerFileInput}>
          Upload Image
        </button>
      </div>
      <ThemedTextField type="text" name="name" value={brand.name} label="Brand Name" onChange={handleChange} />
    </div>
  );
};

export default EditBrandContent;
