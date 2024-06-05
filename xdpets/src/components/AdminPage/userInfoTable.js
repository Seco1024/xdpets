import React, { useState } from "react";
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
import { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import DetailsDialog from "./DetailDialog";
import axios from "axios";
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
              <TableCell>Status</TableCell>
              <TableCell>User ID</TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => onDelete(item.id)}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <DeleteIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">Delete</Typography>
                  </IconButton>
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.userID}</TableCell>
                <TableCell>{item.petNumber}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="show"
                    onClick={() => onShow(item.id)}
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
  const [petDetails, setPetDetails] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [detailsOpen, setDetailsOpen] = useState(false);
  useEffect(() => {
    // fetch data from API
    const fetchData = async () => {
      const result = Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        status: "正常",
        userID: `0844d0789054469b9daf9f1d4b1d4cd5`,
        petName: `Pet ${index + 1}`,
      }));
      setData(result);
    };

    fetchData();
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDeleteId(null);
  };

  const handleConfirmAction = () => {
    setData((prevData) => prevData.filter((item) => item.id !== deleteId));
    setDialogOpen(false);

    // Set snackbar message and open it
    setSnackbarMessage("刪除成功");
    setAlertSeverity("success");
    setSnackbarOpen(true);

    // Implement your delete functionality here
  };

  const handleDelete = (id) => {
    setDialogMessage(`你確定要刪除 item with id: ${id} 嗎？`);
    setDeleteId(id);
    setDialogOpen(true);
  };

  const handleShow = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/user/getInformation/?uid=0844d0789054469b9daf9f1d4b1d4cd5"
      );
      if (response.status === 200) {
        setPetDetails(response.data["data"]);
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
      <DetailsDialog
        open={detailsOpen}
        onClose={handleDetailsClose}
        petDetails={petDetails}
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
