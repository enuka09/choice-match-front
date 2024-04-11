import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as theme from "../../../../theme";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Snackbar } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { IProduct } from "../../../../models";
import { DataGrid, ActionButtons, Modal, Column } from "../../../../components";
import { formatPrice, useFetchData } from "../../../../utils";
import { ProductContent, EditProductContent } from "../../../../pages";
import { storage } from "../../../../config/firebase";
const baseURL = process.env.REACT_APP_BASE_URL;

const ViewProducts: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [productFormData, setProductFormData] = useState<IProduct | {}>({});
  const { mainCategories, subCategories, brands } = useFetchData();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(`${baseURL}/products/find-all`)
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error("Failed to fetch products:", error));
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = products.filter(
      product =>
        product.name.toLowerCase().includes(searchTermLower) ||
        product.mainCategory.toLowerCase().includes(searchTermLower) ||
        product.unitPrice.toString().includes(searchTerm) ||
        product.qtyOnHand.toString().includes(searchTerm),
    );
    setFilteredProducts(filtered);
  };

  const handleViewProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setProductFormData(product);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (file: File) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`Products/${file.name}`);
    await fileRef.put(file);
    const newImageUrl = await fileRef.getDownloadURL();
    setProductFormData(prevData => ({
      ...prevData,
      image: newImageUrl,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProductFormData(prevData => ({ ...prevData, [name]: checked }));
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      const response = await axios.put(`${baseURL}/products/update/${selectedProduct._id}`, productFormData);
      console.log(response.data.message);

      setIsModalOpen(false);
      setSuccessMessageOpen(true);
      setSnackbarMessage("Product updated successfully");
      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  const requestDeleteProduct = (product: IProduct) => {
    setProductToDelete(product);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await axios.delete(`${baseURL}/products/delete-by-id/${productToDelete._id}`);
      setSuccessMessageOpen(true);
      setSnackbarMessage("Product successfully deleted");
      fetchProducts();
      setDeleteConfirmOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessageOpen(false);
  };

  const columns: Column<IProduct>[] = [
    { id: "name" as keyof IProduct, label: "Name", minWidth: 100 },
    {
      id: "image" as keyof IProduct,
      label: "Image",
      minWidth: 100,
      format: value => <img src={value} alt="" style={{ width: 40, height: "auto" }} />,
    },
    {
      id: "unitPrice" as keyof IProduct,
      label: "Unit Price",
      minWidth: 100,
      format: (value: number) => formatPrice(value),
    },
    { id: "mainCategory" as keyof IProduct, label: "Main Category", minWidth: 100 },
    { id: "qtyOnHand" as keyof IProduct, label: "Qty On Hand", minWidth: 100 },
  ];

  return (
    <div className={theme.adminFunction.pagePaddings}>
      <h2 className={theme.adminFunction.topic}>all products</h2>
      <div className={theme.adminFunction.contentContainer}>
        <div className={theme.adminFunction.buttonContainer}>
          <input
            type="text"
            className={theme.adminFunction.searchInput}
            placeholder="Search Here..."
            onChange={e => handleSearch(e.target.value)}
          />
          <Button
            component={Link}
            to="/admin-dashboard/products/add"
            variant="contained"
            sx={{
              padding: "10px",
              bgcolor: "#00BBDB",
              "&:hover": {
                bgcolor: "#0099A6",
              },
            }}
          >
            <AddCircle sx={{ marginRight: "6px" }} />
            Add New Product
          </Button>
        </div>
        <div className={theme.adminFunction.searchResult}>
          {searchTerm && (
            <p>
              Showing results for "<strong>{searchTerm}</strong>"
            </p>
          )}
        </div>
      </div>
      <DataGrid
        data={filteredProducts}
        columns={columns}
        renderActions={product => (
          <ActionButtons
            onView={() => handleViewProduct(product)}
            onEdit={() => handleEditProduct(product)}
            onDelete={() => requestDeleteProduct(product)}
          />
        )}
      />
      {selectedProduct && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={editMode ? handleUpdateProduct : undefined}
          data={editMode ? productFormData : selectedProduct}
          title={editMode ? "Edit Product" : "Product Details"}
          mode={editMode ? "edit" : "view"}
          renderContent={() =>
            editMode ? (
              <EditProductContent
                product={productFormData as IProduct}
                handleChange={handleChange}
                handleCheckboxChange={handleCheckboxChange}
                handleImageUpload={handleImageUpload}
                mainCategories={mainCategories}
                subCategories={subCategories}
                brands={brands}
              />
            ) : (
              ProductContent(selectedProduct)
            )
          }
        />
      )}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{
          style: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete this Product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default ViewProducts;
