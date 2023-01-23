import { Link } from "react-router-dom";
import WelcomeImage from "../../Assets/WelcomeImage.webp";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Trans, useTranslation } from "react-i18next";
import ReusableButton from "../../Components/Common/ReusableButton";
import {
  useMediaQuery,
  Grid,
  Container,
  Stack,
  Typography,
} from "@mui/material";

const Welcome = () => {
  useTranslation();
  const matches = useMediaQuery("max-width:600px");

  return (
    <Grid
      sx={{
        background: `url(${WelcomeImage})`,
        backgroundSize: "100% 100%",
        display: "flex",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <Container
        sx={{
          border: "5px solid orange",
          backgroundColor: "transparent",
          width: "auto",
          p: "20px",
          m: "auto",
        }}
      >
        <Stack direction="row" justifyContent="center">
          <ApartmentIcon
            fontSize="large"
            color="orange"
            sx={{ color: "orange" }}
          />
          <Typography variant="h4" color="orange">
            Find Apartment
          </Typography>
        </Stack>
        <Typography variant="h2" color="orange" display="inline-block">
          <Trans i18nKey="welcome" />
        </Typography>
        <Typography variant="h4" color="orange">
          <Trans i18nKey="description" />
        </Typography>
        {!matches && (
          <Stack spacing={2} mt="20px" direction="row" justifyContent="center">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <ReusableButton variant="contained" color="warning">
                <Trans i18nKey="button1" />
              </ReusableButton>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <ReusableButton variant="contained" color="warning">
                <Trans i18nKey="button2" />
              </ReusableButton>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <ReusableButton variant="contained" color="warning">
                <Trans i18nKey="button3" />
              </ReusableButton>
            </Link>
          </Stack>
        )}
        {matches && (
          <Stack
            spacing={2}
            mt="20px"
            direction="column"
            justifyContent="center"
          >
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <ReusableButton>
                <Trans i18nKey="button1" />
              </ReusableButton>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <ReusableButton>
                <Trans i18nKey="button2" />
              </ReusableButton>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <ReusableButton>
                <Trans i18nKey="button3" />
              </ReusableButton>
            </Link>
          </Stack>
        )}
      </Container>
    </Grid>
  );
};

export default Welcome;
