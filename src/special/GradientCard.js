import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const GradientCard = ({ 
  text, 
  gradientColors, 
  height, 
  textColor 
}) => {
  const gradientStyle = `linear-gradient(45deg, ${gradientColors[0]} 30%, ${gradientColors[1]} 90%)`;

  return (
    <Card sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      height: height, 
      background: gradientStyle, 
      color: textColor,
      boxShadow: 3,
    }}>
      <CardContent>
        <Typography variant="h5" align="center">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Define prop types to ensure all required props are provided
GradientCard.propTypes = {
  text: PropTypes.string.isRequired,
  gradientColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.number.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default GradientCard;
