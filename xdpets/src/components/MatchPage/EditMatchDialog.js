import React from "react";
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
  Box,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

function EditMatchDialog({ open, onClose, data }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const { handleSubmit, control, reset } = useForm();

  React.useEffect(() => {
    console.log(data);
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const handleDialogClose = () => {
    onClose();
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
      userId: "0844d0789054469b9daf9f1d4b1d4cd5",
      preferenceId: data.id,
      matchInfo: {
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
        "http://localhost:8000/match/updatePreference",
        postData
      );
      if (response.status === 200) {
        setSnackbarMessage("更新偏好已成功提交，頁面將自動刷新！");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        handleDialogClose();

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      if (
        error.response.data.message ==
        "Updating preference will cause duplication."
      ) {
        setSnackbarMessage(`提交失敗：更新偏好會造成重複偏好`);
      } else {
        setSnackbarMessage(`提交失敗：請在嘗試一次`);
      }
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>更新媒合資料</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="種類"
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    >
                      <MenuItem value="">未選擇</MenuItem>
                      <MenuItem value="貓">貓</MenuItem>
                      <MenuItem value="狗">狗</MenuItem>
                      <MenuItem value="兔">兔</MenuItem>
                      <MenuItem value="鼠">鼠</MenuItem>
                      <MenuItem value="龜">龜</MenuItem>
                      <MenuItem value="鳥">鳥</MenuItem>
                      <MenuItem value="其他">其他</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="color"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="毛色"
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    >
                      <MenuItem value="">未選擇</MenuItem>
                      <MenuItem value="黑">黑</MenuItem>
                      <MenuItem value="白">白</MenuItem>
                      <MenuItem value="黄">黄</MenuItem>
                      <MenuItem value="灰">灰</MenuItem>
                      <MenuItem value="其他">其他</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="性别"
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    >
                      <MenuItem value="">未選擇</MenuItem>
                      <MenuItem value="公">公</MenuItem>
                      <MenuItem value="母">母</MenuItem>
                      <MenuItem value="其他">其他</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="figure"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="體型"
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    >
                      <MenuItem value="">未選擇</MenuItem>
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
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="地區"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="age"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="年齡"
                      type="number"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="sterilization"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="結紮"
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    >
                      <MenuItem value="">未選擇</MenuItem>
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
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="品種"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            取消
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            color="primary"
          >
            提交
          </Button>
        </DialogActions>
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
    </Box>
  );
}

export default EditMatchDialog;
