import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";
import CardAnimalHouse from "./CardAnimalHouse";
import Paper from "@mui/material/Paper";

const userTestimonials = [
  {
    img: "/images/台北動物之家.png",
    title: "台北動物之家",
    website:
      "https://www.tcapo.gov.taipei/Content_List.aspx?n=8A474D4AA59E06B7",
  },
  {
    img: "/images/台南動物之家.png",
    title: "台南動物之家",
    website: "https://ahipo.tainan.gov.tw/cp.aspx?n=5386",
  },
  {
    img: "/images/宜蘭動物之家.jpg",
    title: "宜蘭動物之家",
    website: "https://www.facebook.com/shelteranimal",
  },
  {
    img: "/images/澎湖動物之家.jpg",
    title: "澎湖動物之家",
    website: "https://www.phldcc.gov.tw/home.jsp?id=24",
  },
];

export default function Testimonials() {
  const theme = useTheme();

  return (
    <Container
      id="testimonials"
      sx={{
        // pt: { xs: 4, sm: 12 },
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
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      ></Box>
      <Paper
        sx={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          marginBottom: "20px",
          backgroundColor: "#FFDAC5",
        }}
      >
        重要提醒！ 每一個生命都應被珍惜，社會上虐貓/犬、棄貓/犬等案件層出不窮，作為送養人請務必謹慎(如：領養人年紀、生活環境、經濟能力、家人是否同意、可否後續家訪、後續追蹤、協議書簽定…等)
        謹慎才能防止善良被利用，希望毛孩們都能找到溫暖的家。＊自 112/12/21
        起領養人電話均經過簡訊驗證，可依法提供檢察或司法警察機關調閱，除此之外，不會提供給任何第三方使用。
      </Paper>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={3} md={3} key={index} sx={{ display: "flex" }}>
            <CardAnimalHouse
              title={testimonial.title}
              imgUrl={testimonial.img}
              website={testimonial.website}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
