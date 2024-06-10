import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const StyledImageListItem = styled(ImageListItem)(({ theme, selected }) => ({
  cursor: "pointer",
  opacity: selected ? 1 : 0.5,
  "&:hover": {
    opacity: 1,
  },
}));

export default function StandardImageList({ catData }) {
  const [itemData, setItemData] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  React.useEffect(() => {
    if (catData["images_urls"] && catData["images_urls"].length > 0) {
      const fullUrlItemData = catData["images_urls"].map(
        (url) => `http://localhost:8000${url}`
      );
      setItemData(fullUrlItemData);
      setSelectedImage(fullUrlItemData[0]);
    }
  }, [catData]);

  const handleImageClick = (img, index) => {
    setSelectedImage(img);
    setSelectedImageIndex(index);
  };

  return (
    <Stack direction="row" spacing={1}>
      <ImageList
        sx={{ width: 200, height: 400, overflow: "hidden" }}
        cols={1}
        rowHeight={200}
      >
        {itemData.map((item, index) => (
          <StyledImageListItem
            key={index}
            selected={selectedImageIndex === index}
            onClick={() => handleImageClick(item, index)}
          >
            <img
              srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item}?w=164&h=164&fit=crop&auto=format`}
              loading="lazy"
              alt={`Image ${index + 1}`}
            />
          </StyledImageListItem>
        ))}
      </ImageList>
      <Box sx={{ width: "100%", height: "100%" }}>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </Box>
    </Stack>
  );
}
