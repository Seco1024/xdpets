import React, { useState, useEffect } from "react";
import axios from "axios";
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
  IconButton,
  Card,
  CardMedia,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useUid } from "../UidContext"; // Adjust the path if necessary
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog";
import { petTypes, genders, sizes, ligations, cities } from '../petMenu';
import DeleteDialog from "../MatchPage/DeleteDialog";

function SendAdoptionBox({ defaultValues }) {
  const { uid } = useUid();
  const { pet_id } = useParams();
  const navigate = useNavigate();
  const [petname, setPetName] = useState(defaultValues.petname || "");
  const [breed, setBreed] = useState(defaultValues.breed || "");
  const [type, setType] = useState(defaultValues.type || "");
  const [gender, setGender] = useState(defaultValues.gender || "");
  const [size, setSize] = useState(defaultValues.size || "");
  const [haircolor, setHairColor] = useState(defaultValues.haircolor || "");
  const [age, setAge] = useState(defaultValues.age || "");
  const [ligation, setLigation] = useState(defaultValues.ligation || "");
  const [city, setCity] = useState(defaultValues.city || "");
  const [area, setArea] = useState(defaultValues.area || "");
  const [discription, setDiscription] = useState(defaultValues.discription || "");
  // const [name, setName] = useState(defaultValues.name || "");
  // const [phonenumber, setPhonenumber] = useState(defaultValues.phonenumber || "");
  // const [love_adoption_book, setLove_Adoption_Book] = useState(defaultValues.love_adoption_book || "");
  // const [accept_followup, setAccept_Followup] = useState(defaultValues.accept_followup || "");
  // const [adult_or_not, setAdult_or_not] = useState(defaultValues.adult_or_not || "");
  // const [family_agrees, setFamily_Agrees] = useState(defaultValues.family_agrees || "");
  const [images, setImages] = useState(defaultValues.images || []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [snackbarMessage, setDeleteSnackbarMessage] = useState("");
  const [snackbarSeverity, setDeleteSnackbarSeverity] = useState("success");

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
  // const handleNameChange = (event) => setName(event.target.value);
  // const handlePhonenumberChange = (event) => setPhonenumber(event.target.value);
  // const handleLoveAdoptionBookChange = (event) =>setLove_Adoption_Book(event.target.value);
  // const handleAcceptFollowupChange = (event) =>setAccept_Followup(event.target.value);
  // const handleAdultOrNotChange = (event) => setAdult_or_not(event.target.value);
  // const handleFamilyAgreesChange = (event) =>setFamily_Agrees(event.target.value);

  useEffect(() => {
    // Fetch the default values from an API
    async function fetchDefaultValues() {
      try {
        const response = await axios.get(`http://35.201.245.108:8000/pet/getPet/?pet_id=${pet_id}`);
        const data = response.data["PetInformation"];
        const [city, area] = data.region.split(' ');
        setPetName(data.pet_name);
        setBreed(data.breed);
        setType(data.category);
        setGender(data.gender);
        setSize(data.size);
        setHairColor(data.coat_color);
        setAge(data.age);
        setLigation(data.ligation);
        setCity(city);
        setArea(area);
        setDiscription(data.discription);
        // setName(data.name);
        // setPhonenumber(data.phonenumber);
        setImages(data.images);
      } catch (error) {
        console.error("Error fetching default values", error);
      }
    }

    fetchDefaultValues();
  }, []);

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
    // setLigation(ligation === "Yes" ? true : false);
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
    formData.append("ligated", "True");
    formData.append("info", discription);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      const response = await axios.post(
        "http://35.201.245.108:8000/user/updatePet/",
        {
          ownerId: uid,
          petId: pet_id
        },
        formData
      );

      if (response.status === 200 && response.data.success) {
        console.log("Pet added successfully:", response.data.pet_info);
        navigate("/sentadoptioninfo");
      } else {
        console.error("Error adding pet:", response.data.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
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

  const handleDeleteDialogOpen = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };  

  const handleDeleteConfirm = async () => {
    try {
      let request = await axios.post(
        "http://35.201.245.108:8000/user/deletePet/",
        {
          ownerId: uid,
          petId: deleteId,
        }
      );

      if (request.status === 200) {
        setDeleteSnackbarMessage("刪除成功");
        setDeleteSnackbarSeverity("success");
        setDeleteSnackbarOpen(true);
        handleDeleteDialogClose();
      }
    } catch (error) {
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

  const handleDelete = async () => {
    console.log(`Delete item with id: ${pet_id}`);
    // Implement your delete functionality here
    handleDeleteDialogOpen(pet_id);
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ flexGrow: 1 }}
      >
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
            <Box component="section" sx={{ mt: 3, ml: 2 }}>
              照片上傳 - 請務必上傳 ( 最多四張 )
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              {images.map((photo, index) => (
                <Grid item key={index}>
                  <Card sx={{ position: 'relative', width: 264, height: 400 }}>
                    <CardMedia
                      component="img"
                      image={photo instanceof File ? URL.createObjectURL(photo) : photo}
                      sx={{ width: '100%', height: '100%' }}
                    />
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
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
                        width: 264, 
                        height: 400,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
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
            <Box component="section" sx={{ mt: 2, ml: 2, mr: 2 }}>
            </Box>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              label="Your Name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
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
              id="phonenumber"
              label="Phone Number"
              value={phonenumber}
              onChange={(e) => handlePhonenumberChange(e.target.value)}
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
          <Grid item xs={12} sm={12}>
            <Box component="section" sx={{ mt: 3, ml: 2 }}>
              領養要求
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth variant="filled" required>
              <InputLabel id="love-adoption-book-label">
                Love Adoption Book
              </InputLabel>
              <Select
                labelId="love-adoption-book-label"
                id="love_adoption_book"
                value={love_adoption_book}
                onChange={(e) => handleLoveAdoptionBookChange(e.target.value)}
                label="Love Adoption Book"
              >
                <MenuItem value="yes">Needed</MenuItem>
                <MenuItem value="no">No need</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth variant="filled" required>
              <InputLabel id="accept-followup-label">
                Accept Follow-up
              </InputLabel>
              <Select
                labelId="accept-followup-label"
                id="accept_followup"
                value={accept_followup}
                onChange={(e) => handleAcceptFollowupChange(e.target.value)}
                label="Accept Followup"
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth variant="filled" required>
              <InputLabel id="adult-or-not-label">Adult or Not</InputLabel>
              <Select
                labelId="adult-or-not-label"
                id="adult-or-not"
                value={adult_or_not}
                onChange={(e) => handleAdultOrNotChange(e.target.value)}
                label="Adult or not"
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth variant="filled" required>
              <InputLabel id="family-agrees-label">Family Agrees</InputLabel>
              <Select
                labelId="family-agrees-label"
                id="accept_followup"
                value={family_agrees}
                onChange={(e) => handleFamilyAgreesChange(e.target.value)}
                label="Family Agrees"
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <Box component="section" sx={{ mt: 3, ml: 2 }}>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="submit" variant="contained" color="primary" sx={{ width: 200, mr: 2, ml: 32 }}>
              Submit Revise
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button onClick={handleDelete} variant="contained" color="primary" sx={{ width: 200, mr: 30, ml: 8 }}>
              Delete Pet
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmAction}
        message={dialogMessage}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
}

// export default SendAdoptionBox;

// Mock data to test the component
const defaultValues = {
  petname: "Buddy",
  breed: "Golden Retriever",
  type: "dog",
  gender: "male",
  size: "large",
  haircolor: "Golden",
  age: "3 years",
  ligation: "yes",
  city: "Taipei",
  area: "Daan",
  discription: "Friendly and energetic",
  name: "John Doe",
  phonenumber: "0987654321",
  love_adoption_book: "yes",
  accept_followup: "yes",
  adult_or_not: "yes",
  family_agrees: "yes",
  Images: ["https://http.cat/301", "https://http.cat/302"],
  pet_id: "12345"
};

// Usage example
function App() {
  return (
    <div>
      <SendAdoptionBox defaultValues={defaultValues} />
    </div>
  );
}

export default App;