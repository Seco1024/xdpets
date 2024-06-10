import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CardAnimalHouse(AninmalHouse) {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "分享這篇文章",
          text: "看看這篇有趣的內容！",
          url: window.location.href,
        })
        .then(() => console.log("分享成功"))
        .catch((error) => console.log("分享失敗", error));
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: {
          xs: "100%",
        },
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {AninmalHouse.title}
        </Typography>
        <CardMedia
          sx={{
            height: {
              xs: 200,
            },
          }}
          image={AninmalHouse.imgUrl}
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleShare}>
          Share
        </Button>
        <Button href={AninmalHouse.website} size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
