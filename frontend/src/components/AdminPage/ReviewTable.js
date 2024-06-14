import React, { useState } from "react";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TablePagination from "@mui/material/TablePagination";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ConfirmationDialog from "../ConfirmationDialog";
import { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import DetailsDialog from "./DetailDialog";
function ReviewTable({ items, onCheck, onDelete, onShow }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatCheckonCheckems = items.slice(
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
            {paginatCheckonCheckems.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ width: "270px" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      aria-label="Check"
                      onClick={() => onCheck(item.id)}
                      sx={{ display: "flex", alignItems: "center", mr: 1 }}
                    >
                      <CheckBoxIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">通過</Typography>
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDelete(item.id)}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <DeleteIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">刪除</Typography>
                    </IconButton>
                  </Box>{" "}
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

function SentAdoptionInfoTable() {
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [actionId, setActionId] = useState(null);
  const [actionType, setActionType] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [petDetails, setPetDetails] = useState({});

  useEffect(() => {
    // fetch data from API
    const fetchData = async () => {
      try {
        let response = await axios.get(
          "http://localhost:8000/administrator/getUnjudgedPets",
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const formatData = response.data["petList"].map((item, index) => ({
            id: item.petId,
            status: "待審核",
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
    setActionId(null);
  };

  const handleConfirmAction = async () => {
    setDialogOpen(false);
    if (actionType === "check") {
      try {
        const response = await axios.put(
          `http://localhost:8000/administrator/judgePet`,
          {
            petId: actionId,
            isLegal: true,
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setData((prevData) =>
            prevData.filter((item) => item.id !== actionId)
          );
          setSnackbarMessage(`通過成功`);
          setAlertSeverity("success");
        } else {
          setSnackbarMessage(`通過失敗`);
          setAlertSeverity("error");
        }
      } catch (error) {
        setSnackbarMessage(`通過失敗`);
        setAlertSeverity("error");
      }
      setSnackbarOpen(true);
    } else if (actionType === "delete") {
      try {
        const response = await axios.put(
          `http://localhost:8000/administrator/judgePet`,
          {
            petId: actionId,
            isLegal: false,
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setData((prevData) =>
            prevData.filter((item) => item.id !== actionId)
          );
          setSnackbarMessage(`刪除成功`);
          setAlertSeverity("success");
        } else {
          setSnackbarMessage(`刪除失敗`);
          setAlertSeverity("error");
        }
      } catch (error) {
        setSnackbarMessage(`刪除失敗`);
        setAlertSeverity("error");
      }
      setSnackbarOpen(true);
    }
  };

  const handleCheck = (id) => {
    const item = data.find((item) => item.id === id);
    setDialogMessage(`你確定要通過 ${item.petName} 嗎？`);
    setActionId(id);
    setActionType("check");
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    const item = data.find((item) => item.id === id);
    setDialogMessage(`你確定要刪除嗎${item.petName}？`);
    setActionId(id);
    setActionType("delete");
    setDialogOpen(true);
  };

  const handleShow = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/pet/getPet/?pet_id=${id}`
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
  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <ReviewTable
        items={data}
        onCheck={handleCheck}
        onDelete={handleDelete}
        onShow={handleShow}
      />
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

export default SentAdoptionInfoTable;
