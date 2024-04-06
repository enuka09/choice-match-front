import React, { useRef, useState } from "react";
import axios from "axios";
import * as theme from "../../../../theme";
import { Snackbar, Button } from "@mui/material";
import { ICategory } from "../../../../models";
import { ThemedTextField } from "../../../../components";
import { storage } from "../../../../config/firebase";

const CreateCategory: React.FC = () => {
  const [categoryFormData, setCategoryFormData] = useState<ICategory>({
    _id: "",
    name: "",
    image: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryFormData({ ...categoryFormData, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleCategorySave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (image) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`Categories/Main/${Math.random()}-${image.name}`);
        const snapshot = await imageRef.put(image);

        imageUrl = await snapshot.ref.getDownloadURL();
      }

      await axios.post("http://localhost:4000/api/v1/main-categories/create", {
        ...categoryFormData,
        image: imageUrl,
      });

      setSuccessMessageOpen(true);
      setCategoryFormData({
        _id: "",
        name: "",
        image: "",
      });
      setImage(null);
      setImagePreviewUrl("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessageOpen(false);
  };

  return (
    <div className={theme.adminFunction.pagePadding}>
      <h2 className={theme.adminFunction.topic}>add category</h2>
      <div className={theme.adminFunction.inner}>
        <form className={theme.adminFunction.formContainer} onSubmit={handleCategorySave}>
          <div className={theme.adminFunction.imageUpload}>
            <div className={theme.adminFunction.imageContainer}>
              {imagePreviewUrl ? (
                <img src={imagePreviewUrl} alt="Preview" className={theme.adminFunction.imagePreview} />
              ) : (
                <div className={theme.adminFunction.imageText}>No Image Selected</div>
              )}
            </div>
            <div>
              <input
                type="file"
                name="image"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <Button
                variant="contained"
                component="span"
                onClick={handleButtonClick}
                sx={{
                  height: "40px",
                  bgcolor: "#00BBDB",
                  "&:hover": {
                    bgcolor: "#0099A6",
                  },
                }}
              >
                Upload Image
              </Button>
            </div>
          </div>
          <ThemedTextField
            name="name"
            value={categoryFormData.name}
            type="text"
            onChange={handleProductChange}
            label="Category Name"
          />
          <button type="submit" className={theme.adminFunction.button}>
            SAVE
          </button>
        </form>
        <Snackbar
          open={successMessageOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message="Category saved successfully"
        />
      </div>
    </div>
  );
};

export default CreateCategory;
