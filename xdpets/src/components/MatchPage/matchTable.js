import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddMatchPopUpButton from "./addMatchPopUpButton";
import EditMatchDialog from "./EditMatchDialog";
import DeleteDialog from "./DeleteDialog";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useState, useEffect } from "react";
import qs from "qs";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  return (
    <GridToolbarContainer>
      <AddMatchPopUpButton />
    </GridToolbarContainer>
  );
}

export default function MatchTable({ preferences }) {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [EditdialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [snackbarMessage, setDeleteSnackbarMessage] = useState("");
  const [snackbarSeverity, setDeleteSnackbarSeverity] = useState("success");
  useEffect(() => {
    // Transform preferences data to match the structure expected by DataGrid
    const transformedRows = preferences.map((preference, index) => ({
      id: preference.preferenceId, // Use index as id or preference.id if available
      status: preference.status || "未通知",
      type: preference.category || "未選擇",
      breed: preference.breed || "未知",
      region: preference.region || "未知",
      gender: preference.gender || "未知",
      age: preference.age || 0,
      figure: preference.size || "未知",
      sterilization: preference.ligated ? "是" : "否",
      color: preference.coat_color || "未知",
    }));
    setRows(transformedRows);
  }, [preferences]);

  const handleEditDialogOpen = (data) => {
    setEditData(data);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditData(null);
  };
  const handleDeleteDialogOpen = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    const rowToDelete = rows.find((row) => row.id === deleteId);
    try {
      let request = await axios.post(
        "http://localhost:8000/match/deletePreference",
        {
          preferenceId: rowToDelete.id,
          userId: "0844d0789054469b9daf9f1d4b1d4cd5",
        }
      );

      if (request.status === 200) {
        setRows(rows.filter((row) => row.id !== deleteId));
        setDeleteSnackbarMessage("刪除成功");
        setDeleteSnackbarSeverity("success");
        setDeleteSnackbarOpen(true);
        handleDeleteDialogClose();
      }
    } catch (error) {
      if (error.response.meassage === "Preference not found") {
        setDeleteSnackbarMessage("無此偏好");
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

  const handleEditClick = (id) => () => {
    const rowToEdit = rows.find((row) => row.id === id);
    handleEditDialogOpen(rowToEdit);
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id) => () => {
    handleDeleteDialogOpen(id);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "管理",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "status",
      headerName: "狀態",
      width: 100,
      type: "singleSelect",
      valueOptions: ["已通知", "未通知"],
    },
    {
      field: "type",
      headerName: "種類",
      width: 100,
      type: "singleSelect",
      valueOptions: ["未選擇", "貓", "狗", "兔", "鼠", "龜", "鳥", "其他"],
    },
    { field: "breed", headerName: "品種", width: 100, editable: true },
    { field: "region", headerName: "地區", width: 100, editable: true },
    {
      field: "gender",
      headerName: "性別",
      width: 100,
      type: "singleSelect",
      valueOptions: ["公", "母", "其他"],
    },
    { field: "age", headerName: "年齡", width: 100, editable: true },
    { field: "figure", headerName: "體型", width: 100, editable: true },
    {
      field: "sterilization",
      headerName: "結紮",
      width: 100,
      editable: true,
    },
    { field: "color", headerName: "毛色", width: 100, editable: true },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
      <EditMatchDialog
        open={EditdialogOpen}
        onClose={handleEditDialogClose}
        data={editData}
      />
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
    </Box>
  );
}
