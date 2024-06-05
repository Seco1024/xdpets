import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

// Custom styling for individual buttons
const CustomButton = styled(Button)(({ theme, isActive }) => ({
  margin: "0 75px", // 50px interval between buttons (25px margin on each side)
  borderRadius: "10px", // Makes each button appear more independent
  width: "200px", // Set the width of the buttons
  border: '1px solid #1976d2', // Add border to make it look separate
  backgroundColor: isActive ? '#1976d2' : 'white',
  color: isActive ? 'white' : theme.palette.primary.main,
  '&:hover': {
    backgroundColor: isActive ? '#1565c0' : '#e3f2fd',
  },
}));

function Toggle({ status, onStatusChange }) {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <CustomButton 
        isActive={status === "status1"} 
        onClick={() => onStatusChange("status1")}
        >
        管理員審核
        </CustomButton>
        <CustomButton 
        isActive={status === "status2"} 
        onClick={() => onStatusChange("status2")}
        >
        查看寵物
        </CustomButton>
        <CustomButton 
        isActive={status === "status3"} 
        onClick={() => onStatusChange("status3")}
        >
        查看使用者
        </CustomButton>
    </Box>
  );
}

export default Toggle;
