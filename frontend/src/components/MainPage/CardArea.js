import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AnimalCard from "./AnimalCard";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import ComboBox from "./ComboBox";
import { Button, Stack } from "@mui/material";
import axios from "axios";

const filterRegionOption = {
  label: "區域",
  options: [
    "不限區域",
    "臺北市",
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
  options: ["不限性別", "公", "母"],
};

const filterSpeciesOption = {
  label: "種類",
  options: ["不限種類", "貓", "狗", "鳥"],
};

export default function CardArea() {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [CatData, setCatData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("不限區域");
  const [selectedGender, setSelectedGender] = useState("不限性別");
  const [selectedSpecies, setSelectedSpecies] = useState("不限種類");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await axios.get(
          "http://backend:8000/pet/getAllPets"
        );

        if (response.status === 200) {
          const formattedData = response.data["allPetInformation"].map(
            (item, index) => ({
              img: "http://backend:8000/" + item["image_url"],
              title: item["pet_name"],
              category: item["category"],
              gender: item["gender"],
              region: item["region"],
              breed: item["breed"],
              pet_id: item["pet_id"],
              user_id: item["user_id"],
            })
          );
          setCatData(formattedData);
          setFilteredData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching cat data:", error);
      }
    };

    fetchCatData();
  }, []);

  const handleSearch = () => {
    let newFilteredData = CatData;

    if (selectedRegion !== "不限區域") {
      newFilteredData = newFilteredData.filter((item) =>
        item.region.includes(selectedRegion)
      );
    }
    if (selectedGender !== "不限性別") {
      newFilteredData = newFilteredData.filter((item) =>
        item.gender.includes(selectedGender)
      );
    }
    if (selectedSpecies !== "不限種類") {
      newFilteredData = newFilteredData.filter((item) =>
        item.category.includes(selectedSpecies)
      );
    }

    setFilteredData(newFilteredData);
    setCurrentPage(1);
  };

  return (
    <Container
      id="testimonials"
      sx={{
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          mt: 2,
          width: "100%",
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Stack direction="row" spacing={2}>
          <ComboBox
            {...filterRegionOption}
            value={selectedRegion}
            onChange={(event, newValue) => setSelectedRegion(newValue)}
          />
          <ComboBox
            {...filterGenderOption}
            value={selectedGender}
            onChange={(event, newValue) => setSelectedGender(newValue)}
          />
          <ComboBox
            {...filterSpeciesOption}
            value={selectedSpecies}
            onChange={(event, newValue) => setSelectedSpecies(newValue)}
          />
          <Button variant="contained" onClick={handleSearch}>
            搜尋
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={2}>
        {currentItems.map((testimonial, index) => (
          <Grid item xs={12} sm={3} md={3} key={index} sx={{ display: "flex" }}>
            <AnimalCard
              title={testimonial.title}
              img={testimonial.img}
              breed={testimonial.breed}
              gender={testimonial.gender}
              region={testimonial.region}
              category={testimonial.category}
              pet_id={testimonial.pet_id}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(filteredData.length / itemsPerPage)}
        page={currentPage}
        onChange={(event, page) => setCurrentPage(page)}
        variant="outlined"
        shape="rounded"
      />
    </Container>
  );
}
