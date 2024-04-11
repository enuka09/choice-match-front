import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as theme from "../../../../theme";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Snackbar } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { ISubCategory } from "../../../../models";
import { DataGrid, ActionButtons, Modal, Column } from "../../../../components";
import { useFetchData } from "../../../../utils";
import { EditSubCategoryContent } from "../../../../pages";
import { storage } from "../../../../config/firebase";
const baseURL = process.env.REACT_APP_BASE_URL;

const SubCategoryContent: React.FC = () => {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<ISubCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<ISubCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subCategoryFormData, setSubCategoryFormData] = useState<ISubCategory | {}>({});
  const { mainCategories } = useFetchData();

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState<ISubCategory | null>(null);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = () => {
    axios
      .get(`${baseURL}/sub-categories/find-all`)
      .then(response => {
        setSubCategories(response.data);
        setFilteredSubCategories(response.data);
      })
      .catch(error => console.error("Failed to fetch sub-categories:", error));
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filtered = subCategories.filter(
      subCategory =>
        subCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subCategory.mainCategory.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredSubCategories(filtered);
  };

  const handleEditCategory = (subCategory: ISubCategory) => {
    setSelectedSubCategory(subCategory);
    setSubCategoryFormData(subCategory);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubCategory(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSubCategoryFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (file: File) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`Categories/Sub/${file.name}`);
    await fileRef.put(file);
    const newImageUrl = await fileRef.getDownloadURL();
    setSubCategoryFormData(prevData => ({
      ...prevData,
      image: newImageUrl,
    }));
  };

  const handleUpdateSubCategory = async () => {
    if (!selectedSubCategory) return;

    try {
      const response = await axios.put(
        `${baseURL}/sub-categories/update/${selectedSubCategory._id}`,
        subCategoryFormData,
      );
      console.log(response.data.message);

      setIsModalOpen(false);
      setSuccessMessageOpen(true);
      setSnackbarMessage("Sub-Category updated successfully");
      setSelectedSubCategory(null);
      fetchSubCategories();
    } catch (error) {
      console.error("Failed to update sub-category", error);
    }
  };

  const requestDeleteSubCategory = (subCategory: ISubCategory) => {
    setSubCategoryToDelete(subCategory);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteSubCategory = async () => {
    if (!subCategoryToDelete) return;

    try {
      await axios.delete(`${baseURL}/sub-categories/delete-by-id/${subCategoryToDelete._id}`);
      setSuccessMessageOpen(true);
      setSnackbarMessage("Sub-Category successfully Deleted");
      fetchSubCategories();
      setDeleteConfirmOpen(false);
      setSubCategoryToDelete(null);
    } catch (error) {
      console.error("Failed to delete sub-category", error);
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessageOpen(false);
  };

  const columns: Column<ISubCategory>[] = [
    { id: "name" as keyof ISubCategory, label: "Name", minWidth: 150 },
    {
      id: "image" as keyof ISubCategory,
      label: "Image",
      minWidth: 150,
      format: value => <img src={value} alt="" style={{ width: 60, height: "auto" }} />,
    },
    {
      id: "mainCategory" as keyof ISubCategory,
      label: "Main Category",
      minWidth: 200,
      format: value => value.name,
    },
  ];

  return (
    <div className={theme.adminFunction.pagePaddings}>
      <h2 className={theme.adminFunction.topic}>all sub-categories</h2>
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
            to="/admin-dashboard/sub-categories/add"
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
            add new sub-category
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
        data={filteredSubCategories}
        columns={columns}
        renderActions={subCategory => (
          <ActionButtons
            onEdit={() => handleEditCategory(subCategory)}
            onDelete={() => requestDeleteSubCategory(subCategory)}
          />
        )}
      />
      {selectedSubCategory && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdateSubCategory}
          data={subCategoryFormData}
          title={"Edit Category"}
          mode={"edit"}
          renderContent={() => (
            <EditSubCategoryContent
              subCategory={subCategoryFormData as ISubCategory}
              handleChange={handleChange}
              handleImageUpload={handleImageUpload}
              mainCategories={mainCategories}
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
          <Button onClick={handleDeleteSubCategory} color="primary" autoFocus>
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

export default SubCategoryContent;
