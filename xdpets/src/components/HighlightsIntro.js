import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function HighlightsIntro(intro) {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 8 },
        pb: { xs: 4, sm: 8 },
        color: 'white',
        bgcolor: 'black',
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
        >
         <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '100%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            {intro.title}
          </Typography>
          <Typography
            textAlign="center"
            color="white"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '100%' } }}
          >
            {intro.description}
          </Typography>
         
         
        </Stack>
        </Box>
      </Container>
    </Box>
  );
}
