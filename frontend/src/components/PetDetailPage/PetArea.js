import * as React from "react";

import Container from "@mui/material/Container";

import { useTheme } from "@mui/system";
import StandardImageList from "./ImageList";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material";
import { Grid } from "@mui/material";
import PetInfo from "./PetInfo";
export default function CardArea({ catData }) {
  const theme = useTheme();
  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 8, sm: 16 },
        pb: { xs: 4, sm: 8 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <StandardImageList catData={catData} />
        </Grid>
        <Grid item xs={5}>
          <PetInfo catData={catData} />
        </Grid>
      </Grid>
    </Container>
  );
}
