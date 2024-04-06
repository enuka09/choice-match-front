import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as theme from "../../../../theme";
import * as styles from "../../styles";
import { Close as CloseIcon, Add as AddIcon, HelpCenter } from "@mui/icons-material";
import { Snackbar } from "@mui/material";
import { IProduct, ICategory, ISubCategory } from "../../../../models";
import { ThemedTextField, ThemedTextArea, ThemedTextDropdown } from "../../../../components";
import { storage } from "../../../../config/firebase";
import Button from "@mui/material/Button";

const CreateProduct: React.FC = () => {
  const [productFormData, setProductFormData] = useState<IProduct>({
    _id: "",
    name: "",
    image: "",
    description: "",
    unitPrice: 0,
    mainCategory: "",
    subCategory: "",
    brand: "",
    color: [],
    size: [],
    qtyOnHand: 0,
    isFeatured: false,
    dateCreated: new Date(),
  });

  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [mainCategories, setMainCategories] = useState<ICategory[]>([]);
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [brands, setBrands] = useState<ISubCategory[]>([]);
  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductFormData({ ...productFormData, [name]: value });
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
        const response = await axios.get("http://localhost:4000/api/v1/main-categories/find-all");
        setMainCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch main categories", error);
      }
    };

    fetchMainCategories();
  }, []);

  useEffect(() => {
    const fetchSubMainCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/sub-categories/find-all");
        setSubCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch sub categories", error);
      }
    };

    fetchSubMainCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/brands/find-all");
        setBrands(response.data);
      } catch (error) {
        console.error("Failed to fetch brands", error);
      }
    };

    fetchBrands();
  }, []);

  const handleAddColor = () => {
    if (newColor.trim()) {
      setProductFormData({ ...productFormData, color: [...productFormData.color, newColor.trim()] });
      setNewColor("");
    }
  };

  const handleAddSize = () => {
    if (newSize.trim()) {
      setProductFormData({ ...productFormData, size: [...productFormData.size, newSize.trim()] });
      setNewSize("");
    }
  };

  const handleRemoveArrayItem = (field: "color" | "size", index: number) => {
    setProductFormData({
      ...productFormData,
      [field]: productFormData[field].filter((_, i) => i !== index),
    });
  };

  const handleProductSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (image) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`Products/${Math.random()}-${image.name}`);
        const snapshot = await imageRef.put(image);

        imageUrl = await snapshot.ref.getDownloadURL();
      }

      await axios.post("http://localhost:4000/api/v1/products/create", {
        ...productFormData,
        image: imageUrl,
      });

      setSuccessMessageOpen(true);
      setProductFormData({
        _id: "",
        name: "",
        image: "",
        description: "",
        unitPrice: 0,
        mainCategory: "",
        subCategory: "",
        brand: "",
        color: [],
        size: [],
        qtyOnHand: 0,
        isFeatured: false,
        dateCreated: new Date(),
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
      <h2 className={theme.adminFunction.topic}>add product</h2>
      <div className={theme.adminFunction.inner}>
        <form className={theme.adminFunction.formContainer} onSubmit={handleProductSave}>
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
            value={productFormData.name}
            type="text"
            onChange={handleProductChange}
            label="Product Name"
          />
          <ThemedTextArea
            name="description"
            value={productFormData.description}
            onChange={handleProductChange}
            label="Description"
          />
          <ThemedTextField
            name="unitPrice"
            value={productFormData.unitPrice}
            type="number"
            onChange={handleProductChange}
            label="Price"
          />
          <ThemedTextDropdown
            name="mainCategory"
            value={productFormData.mainCategory}
            onChange={handleProductChange}
            label="Select Main Category"
            options={mainCategories.map(category => ({
              value: category._id,
              label: category.name,
            }))}
          />
          <ThemedTextDropdown
            name="subCategory"
            value={productFormData.subCategory}
            onChange={handleProductChange}
            label="Select Sub Category"
            options={subCategories.map(subCategory => ({
              value: subCategory._id,
              label: subCategory.name,
            }))}
          />
          <ThemedTextDropdown
            name="brand"
            value={productFormData.brand}
            onChange={handleProductChange}
            label="Select Brand"
            options={brands.map(brand => ({
              value: brand._id,
              label: brand.name,
            }))}
          />
          <div className={styles.featured.maincontainer}>
            <label className={styles.featured.labelContainer}>
              Featured Item
              <HelpCenter className={styles.featured.labelIcon} style={{ fontSize: 30 }} />
            </label>
            <input
              className={styles.featured.checkbox}
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={productFormData.isFeatured}
              onChange={e => setProductFormData({ ...productFormData, isFeatured: e.target.checked })}
            />
          </div>
          <div className={styles.textField.container}>
            <ThemedTextField
              name=""
              value={newColor}
              type="text"
              onChange={e => setNewColor(e.target.value)}
              label="Color"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className={`${theme.form.button} ${styles.textField.button}`}
            >
              <AddIcon />
            </button>
          </div>
          <div className={styles.textField.container}>
            {productFormData.color.map((color, index) => (
              <div className={styles.textField.inputContainer} key={index}>
                {color}
                <button
                  className={styles.textField.button}
                  type="button"
                  onClick={() => handleRemoveArrayItem("color", index)}
                >
                  <CloseIcon style={{ color: "red", fontSize: 16 }} />
                </button>
              </div>
            ))}
          </div>
          <div className={styles.textField.container}>
            <ThemedTextField
              name=""
              value={newSize}
              type="text"
              onChange={e => setNewSize(e.target.value)}
              label="Size"
            />
            <button type="button" onClick={handleAddSize} className={`${theme.form.button} ${styles.textField.button}`}>
              <AddIcon />
            </button>
          </div>
          <div className={styles.textField.container}>
            {productFormData.size.map((size, index) => (
              <div className={styles.textField.inputContainer} key={index}>
                {size}
                <button
                  className={styles.textField.button}
                  type="button"
                  onClick={() => handleRemoveArrayItem("size", index)}
                >
                  <CloseIcon style={{ color: "red", fontSize: 16 }} />
                </button>
              </div>
            ))}
          </div>
          <ThemedTextField
            name="qtyOnHand"
            value={productFormData.qtyOnHand}
            type="number"
            onChange={handleProductChange}
            label="Quantity"
          />
          <button type="submit" className={theme.adminFunction.button}>
            SAVE
          </button>
        </form>
        <Snackbar
          open={successMessageOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message="Product saved successfully"
        />
      </div>
    </div>
  );
};

export default CreateProduct;