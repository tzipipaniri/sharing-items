import React from 'react';
import { Box, Typography } from '@mui/material';

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4" component="div" sx={{ color: '#000' }}>
        AGORA
      </Typography>
    </Box>
  );
};

export default Logo;
