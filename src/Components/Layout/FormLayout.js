import { useMediaQuery, Grid } from "@mui/material";
import WelcomeImage from "../../Assets/WelcomeImage.webp";

const FormLayout = (props) => {
  const matches = useMediaQuery("max-width:600px");
  return (
    <Grid
      m="auto"
      item
      xs={12}
      sm={6}
      sx={{
        background: `url(${WelcomeImage})`,
        backgroundSize: "100% 100%",
        minHeight: "100vh",
        p: "15px 0",
      }}
    >
      {matches && (
        <Grid
          m="auto"
          width="60%"
          maxWidth="90%"
          item
          xs={12}
          sm={6}
          border="5px solid orange"
          backgroundColor="#DCDCDC"
          textAlign="center"
          padding="15px 0"
        >
          {props.children}
        </Grid>
      )}
      {!matches && (
        <Grid
          m="auto"
          item
          xs={12}
          sm={6}
          maxWidth="60%"
          border="5px solid orange"
          backgroundColor="#DCDCDC"
          textAlign="center"
          width="auto"
          padding="15px 0"
          mb="15px"
        >
          {props.children}
        </Grid>
      )}
    </Grid>
  );
};

export default FormLayout;
