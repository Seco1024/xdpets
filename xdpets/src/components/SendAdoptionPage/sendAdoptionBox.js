import React, { useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Snackbar,
  IconButton,
  Card,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import { useUid } from "../UidContext"; // Adjust the path if necessary
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog";
import { petTypes, genders, sizes, ligations, cities } from "../petMenu";

const SendAdoptionBox = ({ isCheckboxChecked }) => {
  const { uid } = useUid();
  const navigate = useNavigate();
  const [petname, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [haircolor, setHairColor] = useState("");
  const [age, setAge] = useState("");
  const [ligation, setLigation] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [discription, setDiscription] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [love_adoption_book, setLove_Adoption_Book] = useState("");
  const [accept_followup, setAccept_Followup] = useState("");
  const [adult_or_not, setAdult_or_not] = useState("");
  const [family_agrees, setFamily_Agrees] = useState("");
  const [images, setImages] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handlePetNameChange = (event) => setPetName(event.target.value);
  const handleBreedChange = (event) => setBreed(event.target.value);
  const handleTypeChange = (event) => setType(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleSizeChange = (event) => setSize(event.target.value);
  const handleHairColorChange = (event) => setHairColor(event.target.value);
  const handleAgeChange = (event) => setAge(event.target.value);
  const handleLigationChange = (event) => setLigation(event.target.value);
  const handleCityChange = (event) => {
    setCity(event.target.value);
    setArea(""); // Reset area when city changes
  };
  const handleAreaChange = (event) => setArea(event.target.value);
  const handleDiscriptionChange = (event) => {
    const words = event.target.value.split(/\s+/).filter(Boolean);
    if (words.length <= 1000) {
      setDiscription(event.target.value);
    }
  };
  const handleNameChange = (event) => setName(event.target.value);
  const handlePhonenumberChange = (event) => setPhonenumber(event.target.value);
  const handleLoveAdoptionBookChange = (event) =>
    setLove_Adoption_Book(event.target.value);
  const handleAcceptFollowupChange = (event) =>
    setAccept_Followup(event.target.value);
  const handleAdultOrNotChange = (event) => setAdult_or_not(event.target.value);
  const handleFamilyAgreesChange = (event) =>
    setFamily_Agrees(event.target.value);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleImagesChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length > 4) {
      setSnackbarMessage("You can only upload up to 4 images.");
      setSnackbarOpen(true);
    } else {
      setImages(selectedImages);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDialogMessage(`你確定要送養此寵物嗎？`);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmAction = async () => {
    const formData = new FormData();
    const region = `${city} ${area}`;

    // Add form data
    formData.append("ownerId", uid);
    formData.append("name", petname);
    formData.append("breed", breed);
    formData.append("category", type);
    formData.append("gender", gender);
    formData.append("size", size);
    formData.append("region", region);
    formData.append("age", age);
    formData.append("coat_color", haircolor);

    if (ligation === "是") {
      formData.append("ligated", "True");
    } else {
      formData.append("ligated", "False");
    }

    formData.append("info", discription);
    formData.append("post_date", new Date().toISOString());

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/user/addNewPet/",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200 && response.data.success) {
        console.log("Pet added successfully:", response.data.pet_info);
        navigate("/sentadoptioninfo");
      } else {
        console.error("Error adding pet:", response.data.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
      setSnackbarOpen(true);
      setSnackbarMessage("請檢查您的資料，或稍後在試試看");
    }
  };

  const handleFileChange = (event) => {
    const newImages = Array.from(event.target.files);
    if (images.length + newImages.length > 4) {
      alert("You can upload a maximum of 4 Images");
    } else {
      setImages([...images, ...newImages]);
    }
  };

  const handleDeletePhoto = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const wordCount = discription.length;

  return (
    <Container>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Send for Adoption
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="petname"
              label="Pet Name"
              value={petname}
              onChange={handlePetNameChange}
              fullWidth
              InputProps={{
                style: {
                  fontSize: 15,
                  height: 54,
                  padding: "10px 10px 3px 10px",
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="breed"
              label="Breed"
              value={breed}
              onChange={handleBreedChange}
              fullWidth
              InputProps={{
                style: {
                  fontSize: 15,
                  height: 54,
                  padding: "10px 10px 3px 10px",
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="filled" required>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                value={type}
                onChange={handleTypeChange}
                label="Type"
              >
                {petTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="filled" required>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={gender}
                onChange={handleGenderChange}
                label="Gender"
              >
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="filled" required>
              <InputLabel id="size-label">Size</InputLabel>
              <Select
                labelId="size-label"
                id="size"
                value={size}
                onChange={handleSizeChange}
                label="Size"
              >
                {sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="hair color"
              label="Hair Color"
              value={haircolor}
              onChange={handleHairColorChange}
              fullWidth
              InputProps={{
                style: {
                  fontSize: 15,
                  height: 54,
                  padding: "10px 10px 3px 10px",
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="age"
              label="Age"
              value={age}
              type="number"
              onChange={handleAgeChange}
              fullWidth
              InputProps={{
                style: {
                  fontSize: 15,
                  height: 54,
                  padding: "10px 10px 3px 10px",
                },
              }}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="filled" required>
              <InputLabel id="Ligation">Ligation</InputLabel>
              <Select
                labelId="ligation"
                id="Ligation"
                value={ligation}
                onChange={handleLigationChange}
                label="Ligation"
              >
                {ligations.map((ligation) => (
                  <MenuItem key={ligation} value={ligation}>
                    {ligation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="filled" required>
              <InputLabel id="city-label">City</InputLabel>
              <Select
                labelId="city-label"
                id="city"
                value={city}
                onChange={handleCityChange}
                label="City"
              >
                {cities.map((city) => (
                  <MenuItem key={city.name} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="filled" required>
              <InputLabel id="area-label">Area</InputLabel>
              <Select
                labelId="area-label"
                id="area"
                value={area}
                onChange={handleAreaChange}
                label="Area"
                disabled={!city}
              >
                {cities
                  .find((c) => c.name === city)
                  ?.areas.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box component="section" sx={{ p: 2, border: "1px" }}>
              由於所有送養訊息均須經過審核後才會公開，請確實檢查以上資料是否正確，送出後將無法修改內容。
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ position: "relative" }}>
              <TextField
                required
                id="discription"
                label="Description"
                value={discription}
                onChange={handleDiscriptionChange}
                fullWidth
                multiline
                rows={5}
                variant="filled"
              />
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  color: wordCount > 1000 ? "red" : "text.secondary",
                }}
              >
                {wordCount} / 1000 words
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box component="section" sx={{ p: 0, mt: 3, ml: 2 }}>
              照片上傳 - 請務必上傳 ( 最多四張 )
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              {images.map((photo, index) => (
                <Grid item key={index}>
                  <Card sx={{ position: "relative", width: 165, height: 210 }}>
                    <CardMedia
                      component="img"
                      image={
                        photo instanceof File
                          ? URL.createObjectURL(photo)
                          : photo
                      }
                      sx={{ width: "100%", height: "100%" }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "red",
                      }}
                      onClick={() => handleDeletePhoto(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
              {images.length < 4 && (
                <Grid item>
                  <input
                    accept="image/*"
                    id="upload-photo"
                    type="file"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="upload-photo">
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{
                        width: 165,
                        height: 210,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <AddPhotoAlternateIcon />
                    </Button>
                  </label>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box component="section" sx={{ p: 0, mt: 2, ml: 2, mr: 2 }}></Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box component="section" sx={{ p: 0, mt: 2, ml: 2 }}>
              資訊送出後需經過審核，因此不會立即出現在列表中，請耐心等待審核勿重覆刊登
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box component="section" sx={{ p: 0, mt: 2, mb: 2, ml: 2, mr: 2 }}>
              ★
              近期有會員回報平台，有些領養人會留下假個資給送養人，為避免日後無法聯絡，請務必在送養當下確認領養人資料及聯絡方式是否正確！
              <br></br>★
              每一個生命都應被珍惜，社會上虐貓/犬、棄貓/犬等案件層出不窮，作為送養人請務必謹慎
              (
              如：領養人年紀、生活環境、經濟能力、家人是否同意、可否後續家訪、後續追蹤、協議書簽定…等。
              )<br></br>
              謹慎才能防止善良被利用，希望毛孩們都能找到溫暖的家。
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!isCheckboxChecked}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmAction}
        message={dialogMessage}
      />
    </Container>
  );
};

export default SendAdoptionBox;
