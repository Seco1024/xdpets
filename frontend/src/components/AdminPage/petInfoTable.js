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
import axios from "axios";
import DetailsDialog from "./DetailDialog";

function PetInfo({ items, onDelete, onShow }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatShowems = items.slice(
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
              <TableCell>Pet ID</TableCell>
              <TableCell>Pet Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatShowems.map((item) => (
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
                <TableCell>{item.petID}</TableCell>
                <TableCell>{item.petName}</TableCell>
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

function PetInfoTable() {
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
      try {
        let response = await axios.get(
          "http://backend:8000/administrator/getJudgedPets",
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const formatData = response.data["petList"].map((item, index) => ({
            id: item.petId,
            // status depends on the API response item.isLegal
            status: item.isLegal ? "已上架" : "未上架",
            userID: item.userId,
            petID: item.petId,
            petName: item.petName,
          }));
          setData(formatData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDeleteId(null);
  };

  const handleShow = async (id) => {
    try {
      const response = await axios.get(
        `http://backend:8000/pet/getPet/?pet_id=${id}`
      );
      if (response.status === 200) {
        setPetDetails(response.data["PetInformation"]);
        setDetailsOpen(true);
      }
    } catch (error) {
      console.error("Error fetching pet details:", error);
      setSnackbarMessage("無法獲取詳細資訊");
      setAlertSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleConfirmAction = async () => {
    try {
      const response = await axios.post(
        `http://backend:8000/administrator/deletePet`,
        {
          petId: deleteId,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setData((prevData) => prevData.filter((item) => item.id !== deleteId));
        setSnackbarMessage(`刪除成功`);
        setAlertSeverity("success");
      }
    } catch (error) {
      setSnackbarMessage(`刪除失敗`);
      setAlertSeverity("error");
    }
    setDialogOpen(false);
    setSnackbarOpen(true);
    // Implement your delete functionality here
  };
  const handleDelete = (id) => {
    const item = data.find((item) => item.id === id);
    setDialogMessage(`你確定要刪除 ${item.petName} 嗎？`);
    setDeleteId(id);
    setDialogOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };
  return (
    <div>
      <PetInfo items={data} onDelete={handleDelete} onShow={handleShow} />
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
        <Alert severity={alertSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default PetInfoTable;
