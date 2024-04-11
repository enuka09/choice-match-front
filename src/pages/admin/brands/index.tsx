import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as theme from "../../../theme";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Snackbar } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { IBrand } from "../../../models";
import { DataGrid, ActionButtons, Modal, Column } from "../../../components";
import { EditBrandContent } from "../../../pages";
import { storage } from "../../../config/firebase";
const baseURL = process.env.REACT_APP_BASE_URL;

const BrandContent: React.FC = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<IBrand[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brandFormData, setBrandFormData] = useState<IBrand | {}>({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<IBrand | null>(null);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = () => {
    axios
      .get(`${baseURL}/brands/find-all`)
      .then(response => {
        setBrands(response.data);
        setFilteredBrands(response.data);
      })
      .catch(error => console.error("Failed to fetch brands:", error));
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filtered = brands.filter(brand => brand.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredBrands(filtered);
  };

  const handleEditBrand = (brand: IBrand) => {
    setSelectedBrand(brand);
    setBrandFormData(brand);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBrandFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (file: File) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`Brands/${file.name}`);
    await fileRef.put(file);
    const newImageUrl = await fileRef.getDownloadURL();
    setBrandFormData(prevData => ({
      ...prevData,
      image: newImageUrl,
    }));
  };

  const handleUpdateBrand = async () => {
    if (!selectedBrand) return;

    try {
      const response = await axios.put(`${baseURL}/brands/update/${selectedBrand._id}`, brandFormData);
      console.log(response.data.message);

      setIsModalOpen(false);
      setSuccessMessageOpen(true);
      setSnackbarMessage("Brand updated successfully");
      setSelectedBrand(null);
      fetchBrands();
    } catch (error) {
      console.error("Failed to update brand", error);
    }
  };

  const requestDeleteBrand = (brand: IBrand) => {
    setBrandToDelete(brand);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteBrand = async () => {
    if (!brandToDelete) return;

    try {
      await axios.delete(`${baseURL}/brands/delete-by-id/${brandToDelete._id}`);
      setSuccessMessageOpen(true);
      setSnackbarMessage("Brand successfully Deleted");
      fetchBrands();
      setDeleteConfirmOpen(false);
      setBrandToDelete(null);
    } catch (error) {
      console.error("Failed to delete brand", error);
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessageOpen(false);
  };

  const columns: Column<IBrand>[] = [
    { id: "name" as keyof IBrand, label: "Brand Name", minWidth: 200 },
    {
      id: "image" as keyof IBrand,
      label: "Image",
      minWidth: 100,
      format: value => <img src={value} alt="" style={{ width: 180, height: "auto" }} />,
    },
  ];

  return (
    <div className={theme.adminFunction.pagePaddings}>
      <h2 className={theme.adminFunction.topic}>all brands</h2>
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
            to="/admin-dashboard/brands/add"
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
            Add New Brand
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
        data={filteredBrands}
        columns={columns}
        renderActions={brand => (
          <ActionButtons onEdit={() => handleEditBrand(brand)} onDelete={() => requestDeleteBrand(brand)} />
        )}
      />
      {selectedBrand && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdateBrand}
          data={brandFormData}
          title={"Edit Brand"}
          mode={"edit"}
          renderContent={() => (
            <EditBrandContent
              brand={brandFormData as IBrand}
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
            Are you sure you want to Delete this Brand?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleDeleteBrand} color="primary" autoFocus>
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

export default BrandContent;
