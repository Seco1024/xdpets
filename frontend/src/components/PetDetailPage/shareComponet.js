import React, { useState } from "react";
import { Stack, Typography, Snackbar, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkIcon from "@mui/icons-material/Link";
import ShareIcon from "@mui/icons-material/Share";

const ShareComponent = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  // Mock authentication function

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "分享這篇文章",
          text: "看看這篇有趣的內容！",
          url: window.location.href,
        })
        .then(() => console.log("分享成功"))
        .catch((error) => console.log("分享失敗", error));
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setSnackbar({ open: true, message: "鏈接已複製到剪貼板！" });
      })
      .catch((err) => {
        console.error("複製失敗: ", err);
        setSnackbar({ open: true, message: "複製鏈接失敗" });
      });
  };

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h6" gutterBottom>
          分享出去
        </Typography>
        <IconButton onClick={() => window.open(`https://www.facebook.com/`)}>
          <FacebookIcon />
        </IconButton>
        <IconButton onClick={() => window.open(`https://www.instagram.com/`)}>
          <InstagramIcon />
        </IconButton>
        <IconButton onClick={handleCopyLink}>
          <LinkIcon />
        </IconButton>

        <IconButton onClick={handleShare}>
          <ShareIcon />
        </IconButton>
      </Stack>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </>
  );
};

export default ShareComponent;
