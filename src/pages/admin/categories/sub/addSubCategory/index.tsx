import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as theme from "../../../../../theme";
import { Snackbar, Button } from "@mui/material";
import { ISubCategory, ICategory } from "../../../../../models";
import { ThemedTextField, ThemedTextDropdown } from "../../../../../components";
import { storage } from "../../../../../config/firebase";
const baseURL = process.env.REACT_APP_BASE_URL;

const CreateSubCategory: React.FC = () => {
  const [subCategoryForm, setSubCategoryForm] = useState<ISubCategory>({
    _id: "",
    name: "",
    mainCategory: "",
    image: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mainCategories, setMainCategories] = useState<ICategory[]>([]);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSubCategoryForm({ ...subCategoryForm, [name]: value });
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

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/main-categories/find-all`);
        setMainCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch main categories", error);
      }
    };

    fetchMainCategories();
  }, []);

  const handleSubCategorySave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (image) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`Categories/Sub/${image.name}`);
        const snapshot = await imageRef.put(image);

        imageUrl = await snapshot.ref.getDownloadURL();
      }

      await axios.post(`${baseURL}/sub-categories/create`, {
        ...subCategoryForm,
        image: imageUrl,
      });

      setSuccessMessageOpen(true);
      setSubCategoryForm({
        _id: "",
        name: "",
        mainCategory: "",
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
      <h2 className={theme.adminFunction.topic}>add sub-category</h2>
      <div className={theme.adminFunction.inner}>
        <form className={theme.adminFunction.formContainer} onSubmit={handleSubCategorySave}>
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
            value={subCategoryForm.name}
            type="text"
            onChange={handleSubCategoryChange}
            label="Sub-Category Name"
          />
          <ThemedTextDropdown
            name="mainCategory"
            value={subCategoryForm.mainCategory}
            onChange={handleSubCategoryChange}
            label="Select Main Category"
            options={mainCategories.map(category => ({
              value: category._id,
              label: category.name,
            }))}
          />
          <button type="submit" className={theme.adminFunction.button}>
            SAVE
          </button>
        </form>
        <Snackbar
          open={successMessageOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message="Sub-Category saved successfully"
        />
      </div>
    </div>
  );
};

export default CreateSubCategory;
