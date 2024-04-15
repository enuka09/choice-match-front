import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as theme from "../../../../theme";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Snackbar } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { ICategory } from "../../../../models";
import { DataGrid, ActionButtons, Modal, Column } from "../../../../components";
import { EditCategoryContent } from "../../../../pages";
import { storage } from "../../../../config/firebase";
import AxiosInstance from "../../../../config/axiosInstance";

const CategoryContent: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState<ICategory | {}>({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(null);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    AxiosInstance.get("/main-categories/find-all")
      .then(response => {
        setCategories(response.data);
        setFilteredCategories(response.data);
      })
      .catch(error => console.error("Failed to fetch categories:", error));
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filtered = categories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCategories(filtered);
  };

  const handleEditCategory = (category: ICategory) => {
    setSelectedCategory(category);
    setCategoryFormData(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (file: File) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`Categories/Main/${file.name}`);
    await fileRef.put(file);
    const newImageUrl = await fileRef.getDownloadURL();
    setCategoryFormData(prevData => ({
      ...prevData,
      image: newImageUrl,
    }));
  };

  const handleUpdateCategory = async () => {
    if (!selectedCategory) return;

    try {
      const response = await AxiosInstance.put(`/main-categories/update/${selectedCategory._id}`, categoryFormData);
      console.log(response.data.message);

      setIsModalOpen(false);
      setSuccessMessageOpen(true);
      setSnackbarMessage("Category updated successfully");
      setSelectedCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  const requestDeleteCategory = (category: ICategory) => {
    setCategoryToDelete(category);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      await AxiosInstance.delete(`/main-categories/delete-by-id/${categoryToDelete._id}`);
      setSuccessMessageOpen(true);
      setSnackbarMessage("Category successfully Deleted");
      fetchCategories();
      setDeleteConfirmOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessageOpen(false);
  };

  const columns: Column<ICategory>[] = [
    { id: "name" as keyof ICategory, label: "Category", minWidth: 200 },
    {
      id: "image" as keyof ICategory,
      label: "Image",
      minWidth: 100,
      format: value => <img src={value} alt="" style={{ width: 100, height: "auto" }} />,
    },
  ];

  return (
    <div className={theme.adminFunction.pagePaddings}>
      <h2 className={theme.adminFunction.topic}>all categories</h2>
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
            to="/admin-dashboard/categories/add"
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
            Add New Category
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
        data={filteredCategories}
        columns={columns}
        renderActions={category => (
          <ActionButtons onEdit={() => handleEditCategory(category)} onDelete={() => requestDeleteCategory(category)} />
        )}
      />
      {selectedCategory && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdateCategory}
          data={categoryFormData}
          title={"Edit Category"}
          mode={"edit"}
          renderContent={() => (
            <EditCategoryContent
              category={categoryFormData as ICategory}
              handleChange={handleChange}
              handleImageUpload={handleImageUpload}
            />
          )}
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
            Are you sure you want to Delete this Category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleDeleteCategory} color="primary" autoFocus>
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

export default CategoryContent;
