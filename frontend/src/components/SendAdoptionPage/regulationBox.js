import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Checkbox,
  FormControlLabel,
  Container,
  Paper,
} from "@mui/material";

const RegulationBox = ({ setIsCheckboxChecked }) => {
  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Regulations for Sending Pets</Typography>
          </Toolbar>
        </AppBar>
        <Box p={3}>
          <Typography variant="body1" paragraph>
            刊登人使用由 畢業小隊
            寵物領養平台(以下簡稱「畢業小隊」)所提供之送養資訊刊登服務(以下簡稱「本服務」)時，均受到本「刊登條款」規範。
          </Typography>
          <Typography variant="body1" paragraph>
            1. 畢業小隊
            要求所有刊登送養資訊及查看送養資訊者均須加入會員且強制驗證手機號碼，是為了保證所有查看資訊的人都確實的留下紀錄，請送養人注意，如將動物送養後有查覺異常或有任何虐待事項，請立即通報政府單位，我們將配合政府單位之發文要求提供相關紀錄資料。
          </Typography>
          <Typography variant="body1" paragraph>
            2.
            送養資訊不限刊登時間，因此將動物確定送養後請回網站關閉送養資訊，避免造成自身困擾。
          </Typography>
          <Typography variant="body1" paragraph>
            3. 目前不開放剛出生或尚未開眼之動物送養。
          </Typography>
          <Typography variant="body1" paragraph>
            4. 畢業小隊
            僅為資訊交流平台，無法保證刊登內容之正確性，刊登人對其刊登內容及送養之行為應負完全之責任，刊登人應提供確實之刊登內容，並自負相關法律責任。
          </Typography>
          <Typography variant="body1" paragraph>
            5. 畢業小隊 對刊登資訊保有最終篩選、修改、刪除及決定刊登與否之權利。
          </Typography>
          <Typography variant="body1" paragraph>
            6. 畢業小隊 秉持以領養代替購買之精神，禁止以下類型之刊登內容：
            <br /> a.
            要求補貼、認養價、營養費、結紮費等一切任何額外費用或有實際販賣行為。
            <br /> b. 捏造不實資訊。
            <br /> c. 特意收集個人資料。
            <br /> 如有違反上述條款之情事，畢業小隊
            可能將其進行會員停權或封鎖之處置。
          </Typography>
          <Typography variant="body1" paragraph>
            7.
            刊登人應確定刊登之內容未使用未經授權之文字、圖片、影音或任何形式之資訊。
          </Typography>
          <Typography variant="body1" paragraph>
            8.
            刊登人同意授權於本服務刊登之資訊內容無償提供第三人分享、轉載或推廣。
          </Typography>
          <Typography variant="body1" paragraph>
            9. 資訊的審核時間約為 0 - 3 天，請耐心等候。
          </Typography>
          <FormControlLabel
            control={
              <Checkbox onChange={handleCheckboxChange} name="agreement" />
            }
            label="我已詳閱且同意本刊登條款"
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default RegulationBox;
