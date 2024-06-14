import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useUid } from "../UidContext";
const filterRegionOption = {
  label: "區域",
  options: [
    "台北市",
    "新北市",
    "桃園市",
    "台中市",
    "台南市",
    "高雄市",
    "基隆市",
    "新竹市",
    "新竹縣",
    "苗栗縣",
    "彰化縣",
    "南投縣",
    "雲林縣",
    "嘉義縣",
    "嘉義市",
    "屏東縣",
    "宜蘭縣",
    "花蓮縣",
    "台東縣",
    "澎湖縣",
    "金門縣",
    "連江縣",
  ],
};

const filterGenderOption = {
  label: "性別",
  options: ["公", "母"],
};

const filterSpeciesOption = {
  label: "種類",
  options: ["貓", "狗", "鳥", "其他"],
};

function FormDialog({ setRows, rows }) {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const { handleSubmit, control, reset } = useForm();
  const { uid } = useUid();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const onSubmit = async (data) => {
    const postData = {
      userId: uid,
      PreferenceInfo: {
        breed: data.breed,
        category: data.type,
        gender: data.gender,
        size: data.figure,
        region: data.region,
        age: data.age,
        coat_color: data.color,
        ligated: data.sterilization === "是",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/match/addPreference",
        postData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setSnackbarMessage("偏好已成功提交，頁面將自動刷新！");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        handleClose();

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      if (error.response.data.message == "Preference already exists.") {
        setSnackbarMessage(`提交失敗：偏好已存在`);
      } else {
        setSnackbarMessage(`提交失敗：請在嘗試一次`);
      }
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        新增媒合
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新增媒合</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label={filterSpeciesOption.label}
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                    >
                      {filterSpeciesOption.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="color"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="毛色"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                    ></TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label={filterGenderOption.label}
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                    >
                      {filterGenderOption.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="figure"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="體型"
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                    >
                      <MenuItem value="米你">米你</MenuItem>
                      <MenuItem value="小">小</MenuItem>
                      <MenuItem value="中">中</MenuItem>
                      <MenuItem value="大">大</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="region"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label={filterRegionOption.label}
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                    >
                      {filterRegionOption.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              {/* <Grid item xs={6}>
                <Controller
                  name="age"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="年齡"
                      type="number"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                    />
                  )}
                />
              </Grid> */}
              <Grid item xs={6}>
                <Controller
                  name="sterilization"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="結紮"
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                    >
                      <MenuItem value="是">是</MenuItem>
                      <MenuItem value="否">否</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="breed"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="品種"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              取消
            </Button>
            <Button type="submit" color="primary">
              提交
            </Button>
          </DialogActions>
        </form>
      </Dialog>
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

export default FormDialog;
