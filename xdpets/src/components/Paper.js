import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

import Paper from '@mui/material/Paper';
const userTestimonials = [
  {
    img: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e8f1fa22f1f1bd7477b_Terra.svg',
    title: '台北動物之家',
    description:"I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable.",
  },
  {
    img: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e8f1fa22f1f1bd7477b_Terra.svg',
    title: '台南動物之家',
    description:"I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable.",
  },
  {
    img: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e8f1fa22f1f1bd7477b_Terra.svg',
    title: '宜蘭動物之家',
    description:"I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable.",
  },
  {
    img: 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e8f1fa22f1f1bd7477b_Terra.svg',
    title: '澎湖動物之家',
    description:"I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable.",
  },
];


export default function PaperMain(message) {
  const theme = useTheme();
 

  return (
    <Container
      id="testimonials"
      sx={{
        // pt: { xs: 4, sm: 12 },
        pb: { xs: 4, sm: 4 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 3 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
      </Box>
      <Paper sx={
          {
            width: '100%',
            padding: '10px',
            marginTop: '20px',
            backgroundColor: '#FFDAC5',
          }
        
        }>
            {message.description}
        </Paper>
    </Container>
  );
}
