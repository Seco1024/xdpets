import { Paper, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ContactCard from "./contactCard";
import ShareComponent from "./shareComponet";
function PetInfo({ catData }) {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        ml: 2,
      }}
    >
      <Stack spacing={0}>
        <Typography variant="h1" gutterBottom>
          {catData["pet_name"]}
        </Typography>
        <Typography variant="h6" gutterBottom>
          種類: {catData["category"]}
        </Typography>
        <Typography variant="h6" gutterBottom>
          品種: {catData["breed"]}
        </Typography>
        <Typography variant="h6" gutterBottom>
          性別: {catData["gender"]}
        </Typography>
        <Typography variant="h6" gutterBottom>
          體型: {catData["size"]}
        </Typography>
        <Typography variant="h6" gutterBottom>
          毛色: {catData["coat_color"]}
        </Typography>
        <Typography variant="h6" gutterBottom>
          年紀: {catData["age"]}
        </Typography>
        <Typography variant="h6" gutterBottom>
          絕育: {catData["ligated"] ? "已絕育" : "未絕育"}
        </Typography>
        <Typography variant="h6" gutterBottom>
          所在地: {catData["region"]}
        </Typography>
        <Typography variant="h6" gutterBottom>
          刊登日期: {catData["post_date"]}
        </Typography>
        <Typography variant="body">
          <CloseIcon /> 不需要簽署愛心認養切結書
        </Typography>
        <Typography variant="body">
          <CheckIcon /> 需要同意接受後續追蹤
        </Typography>
        <Typography variant="body">
          <CheckIcon /> 需要年滿20歲
        </Typography>
        <Typography variant="h6" gutterBottom>
          <CheckIcon /> 需要家人同意
        </Typography>
        <ContactCard
          sx={{
            padding: 2,
            mt: 2,
          }}
          owner_id={catData["owner_id"]}
        />
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            ml: 2,
            mt: 5,
            backgroundColor: "secondar",
          }}
        >
          <ShareComponent />
        </Paper>
      </Stack>
    </Paper>
  );
}

export default PetInfo;
