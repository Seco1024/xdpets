import * as React from 'react';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';


import Typography from '@mui/material/Typography';
export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'black',
        bgcolor: '#D3D3D3',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
          為什麼會有 畢業小隊 ？
          </Typography>
          <Typography variant="body1" sx={{ color: 'black' }}>
          Wepet 是由一對夫妻獨力經營，在曾經陪伴十五年的狗狗離開後，希望能將對牠的愛延續下去，因此創建這個寵物送領養的平台，冀望能藉由這個平台讓更多的浪浪能擁有一個家，讓有意願領養動物的人都可以輕鬆的找到願意接納的寵物。目前我們傾向不收費用盡已所能的運作方向，但為了維持網站運作會放置 Google 廣告，尚請見諒。 另外，也歡迎相關公益團體或法人與我們聯絡提案合作，我們願意盡量支持與配合。
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
