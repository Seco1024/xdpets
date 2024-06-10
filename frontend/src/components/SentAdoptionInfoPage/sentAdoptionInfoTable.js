import React, { useState, useEffect } from "react";
import axios from "axios"; // Add this line to import axios
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DeleteDialog from "../MatchPage/DeleteDialog";
import { useUid } from "../UidContext"; // Adjust the path if necessary
import { useNavigate } from "react-router-dom";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import qs from "qs";
function PetTable({ items, onEdit, onDelete }) {
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
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Breed</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((pet) => (
              <TableRow key={pet.pet_id}>
                <TableCell>
                  {/* <IconButton
                    aria-label="edit"
                    onClick={() => onEdit(pet.pet_id)}
                  >
                    <EditIcon />
                  </IconButton> */}
                  <IconButton
                    aria-label="delete"
                    onClick={() => onDelete(pet.pet_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{pet.pet_name}</TableCell>
                <TableCell>{pet.category}</TableCell>
                <TableCell>{pet.breed}</TableCell>
                <TableCell>{pet.gender}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="link"
                    onClick={() =>
                      window.open(`http://localhost:3000/pets/${pet.pet_id}`)
                    }
                  >
                    寵物連結
                    <InsertLinkIcon />
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
  const { uid } = useUid();
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [snackbarMessage, setDeleteSnackbarMessage] = useState("");
  const [snackbarSeverity, setDeleteSnackbarSeverity] = useState("success");

  useEffect(() => {
    // Fetch the default values from an API
    async function fetchDefaultValues() {
      try {
        const response = await axios.get(
          `http://localhost:8000/pet/getMyPets/?user_id=${uid}`,
          {
            withCredentials: true,
          }
        );
        setPets(response.data["PetInformation"]);
        console.log(
          "Successfully fetched pet data:",
          response.data["PetInformation"]
        );
      } catch (error) {
        console.error("Error fetching default values", error);
      }
    }

    fetchDefaultValues();
  }, [uid]);

  const handleDeleteDialogOpen = (pet_id) => {
    setDeleteId(pet_id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      let request = await axios.post(
        "http://localhost:8000/user/deletePet/",
        qs.stringify({
          ownerId: uid,
          petId: deleteId,
        }),
        { withCredentials: true }
      );

      if (request.status === 200) {
        setDeleteSnackbarMessage("刪除成功，頁面即將刷新");
        setDeleteSnackbarSeverity("success");
        setDeleteSnackbarOpen(true);
        handleDeleteDialogClose();

        // reload the page after 2 seconds

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting pet", error);
      if (error.response.meassage === "Preference not found") {
        setDeleteSnackbarMessage("無此寵物");
        setDeleteSnackbarSeverity("error");
        setDeleteSnackbarOpen(true);
      } else {
        setDeleteSnackbarMessage("刪除失敗，請稍後再試");
        setDeleteSnackbarSeverity("error");
        setDeleteSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteSnackbarOpen(false);
  };

  const handleEdit = (pet_id) => {
    console.log(`Edit pet with pet_id: ${pet_id}`);
    // Implement your edit functionality here
    navigate(`/editsentadoptioninfo/${pet_id}`);
  };

  const handleDelete = (pet_id) => {
    console.log(`Delete pet with pet_id: ${pet_id}`);
    // Implement your delete functionality here
    handleDeleteDialogOpen(pet_id);
  };

  const handleAddAdoption = () => {
    console.log("Add Adoption button clicked");
    // Implement your add adoption functionality here
    navigate("/sendadoption");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddAdoption}
        sx={{ mb: 2 }}
      >
        新增送養
      </Button>
      <PetTable items={pets} onEdit={handleEdit} onDelete={handleDelete} />
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SentAdoptionInfoTable;
