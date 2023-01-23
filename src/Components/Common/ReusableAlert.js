import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

const ReusableAlert = ( props) => {
  useTranslation();
  return (
    <Alert
      variant="filled"
      margin="auto"
      severity={props.severity}
      sx={{ mt: "20px" }}
    >
      {props.children}
    </Alert>
  );
};

export default ReusableAlert;
