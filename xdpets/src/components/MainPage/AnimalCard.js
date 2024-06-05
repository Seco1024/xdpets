import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function AnimalCard(CardInfo) {
  const navigate = useNavigate();

  const naviageteToDetail = (pet_id) => {
    navigate(`/pets/${pet_id}`);
  };
  return (
    <Card sx={{ maxWidth: 345, minWidth: 230 }}>
      <CardMedia sx={{ height: 200 }} image={CardInfo.img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {CardInfo.title}
        </Typography>
        <Stack spacing={0}>
          <Typography variant="body2" color="text.secondary">
            種類: {CardInfo.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            性別: {CardInfo.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            地區: {CardInfo.region}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            品種: {CardInfo.breed}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          size="medium"
          sx={{
            // center the button
            marginLeft: "auto",
            marginRight: "auto",
            width: "70%",
            backgroundColor: "#F4A261",
            color: "white",
            "&:hover": {
              backgroundColor: "#E76F51",
            },
          }}
          onClick={() => naviageteToDetail(CardInfo.pet_id)}
        >
          詳細資訊
        </Button>
      </CardActions>
    </Card>
  );
}
