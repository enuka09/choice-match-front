import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Snackbar } from "@mui/material";
import * as theme from "../../../theme";
import { IUser } from "../../../models";
import { DataGrid, ActionButtons, Modal, Column } from "../../../components";
import { UserContent } from "../../../pages";
import AxiosInstance from "../../../config/axiosInstance";

const ViewUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFormData] = useState<IUser | {}>({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    AxiosInstance.get("/users/find-all")
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch(error => console.error("Failed to fetch users:", error));
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = users.filter(
      user =>
        user.fullName.toLowerCase().includes(searchTermLower) ||
        user.email.toLowerCase().includes(searchTermLower) ||
        user.phone.toString().includes(searchTerm),
    );
    setFilteredUsers(filtered);
  };

  const handleViewUser = (user: IUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const requestDeleteUser = (user: IUser) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await AxiosInstance.delete(`/users/delete-by-id/${userToDelete._id}`);
      setSuccessMessageOpen(true);
      setSnackbarMessage("User successfully deleted");
      fetchUsers();
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleSnackbarClose = () => {
    setSuccessMessageOpen(false);
  };

  const columns: Column<IUser>[] = [
    { id: "fullName" as keyof IUser, label: "Name", minWidth: 100 },
    { id: "email" as keyof IUser, label: "Email", minWidth: 100 },
    { id: "dob" as keyof IUser, label: "Date of Birth", minWidth: 100 },
    { id: "phone" as keyof IUser, label: "Phone", minWidth: 100 },
    { id: "activeState" as keyof IUser, label: "Active State", minWidth: 100 },
  ];

  return (
    <div className={theme.adminFunction.pagePaddings}>
      <h2 className={theme.adminFunction.topic}>all users</h2>
      <div className={theme.adminFunction.contentContainer}>
        <div className={theme.adminFunction.buttonContainer + " h-12 w-full"}>
          <input
            type="text"
            className={theme.adminFunction.searchInput}
            placeholder="Search Here..."
            onChange={e => handleSearch(e.target.value)}
          />
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
        data={filteredUsers}
        columns={columns}
        renderActions={user => (
          <ActionButtons onView={() => handleViewUser(user)} onDelete={() => requestDeleteUser(user)} />
        )}
      />
      {selectedUser && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          data={userFormData}
          title={"User Details"}
          mode={"view"}
          renderContent={() => UserContent(selectedUser)}
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
            Are you sure you want to Delete this User?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="primary" autoFocus>
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

export default ViewUsers;
