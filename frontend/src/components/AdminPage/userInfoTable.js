import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ConfirmationDialog from "../ConfirmationDialog";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import PeopleDetail from "./peopleDetail";

function UserInfo({ items, onDelete, onShow }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedItems = items.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((item) => (
              <TableRow key={item.userId}>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => onDelete(item.userId)}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <DeleteIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">Delete</Typography>
                  </IconButton>
                </TableCell>
                <TableCell>{item.userId}</TableCell>
                <TableCell>{item.userName}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="show"
                    onClick={() => onShow(item.userId)}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <VisibilityIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">詳細資訊</Typography>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

function UserInfoTable() {
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [peopleDetails, setPeopleDetails] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    // fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/administrator/getAllUsers",
          { withCredentials: true }
        );

        if (response.status === 200) {
          console.log(response.data["userList"]);
          setData(response.data["userList"]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setSnackbarMessage("無法獲取用戶資訊");
        setAlertSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchData();
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDeleteId(null);
  };

  const handleConfirmAction = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/administrator/deleteUser`,
        { userId: deleteId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setData((prevData) =>
          prevData.filter((item) => item.userId !== deleteId)
        );
        setSnackbarMessage(`刪除成功`);
        setAlertSeverity("success");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setSnackbarMessage(`刪除失敗`);
      setAlertSeverity("error");
    }
    setDialogOpen(false);
    setSnackbarOpen(true);
    // Implement your delete functionality here
  };

  const handleDelete = (userId) => {
    const item = data.find((item) => item.userId === userId);
    setDialogMessage(`你確定要刪除 ${item.userName} 嗎？`);
    setDeleteId(userId);
    setDialogOpen(true);
  };

  const handleShow = async (userId) => {
    const item = data.find((item) => item.userId === userId);
    try {
      const response = await axios.get(
        `http://localhost:8000/user/getInformation/?uid=${item.userId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setPeopleDetails(response.data["data"]);
        setDetailsOpen(true);
      }
    } catch (error) {
      console.error("Error fetching pet details:", error);
      setSnackbarMessage("無法獲取詳細資訊");
      setAlertSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  return (
    <div>
      <UserInfo items={data} onDelete={handleDelete} onShow={handleShow} />
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmAction}
        message={dialogMessage}
      />
      <PeopleDetail
        open={detailsOpen}
        onClose={handleDetailsClose}
        peopleDetails={peopleDetails}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={alertSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  );
}

export default UserInfoTable;
