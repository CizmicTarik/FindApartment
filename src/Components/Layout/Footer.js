import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      backgroundColor="orange"
      p="10px"
    >
      <Typography variant="h6" color="primary" textAlign="center">
        Find Apartment - © Tarik Čizmić, {new Date().getFullYear()}., Serapion
      </Typography>
    </Box>
  );
};

export default Footer;
