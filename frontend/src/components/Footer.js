import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const logoStyle = {
  width: "140px",
  height: "auto",
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"© 2024 Copyright graduate.tw"}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 4 },
          width: "100%",
        }}
      >
        <div>
          <Link color="text.secondary" href="#">
            本站所有資訊來源為政府資料開放平台及會員自行刊登，本站對資訊內容無法確實檢查，僅就一般正常情理做審核，如有遺漏或侵犯它人權益由刊登者自行負擔相關責任。如有任何疑問請與我們聯絡 
          </Link>

          <Copyright />
        </div>
      </Box>
    </Container>
  );
}
