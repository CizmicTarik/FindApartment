import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../Store/auth-context";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import AddApartment from "../UI/AddApartment";
import MenuIcon from "@mui/icons-material/Menu";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ReusableButton from "../Common/ReusableButton";
import {
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  useMediaQuery,
  AppBar,
  Toolbar,
  Stack,
  IconButton,
  Typography,
  Drawer,
  Box,
} from "@mui/material";

export const Options = () => {
  const styles = makeStyles({
    input: {
      color: "primary",
      "& .MuiSvgIcon-root": {
        color: "#DCDCDC",
      },
    },
  });

  const classes = styles();
  const [openAddApartment, setOpenAddApartment] = useState(false);
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;
  const { i18n } = useTranslation();
  const defaultLanguage = localStorage.getItem("i18nextLng");
  const languages = {
    eng: { nativeName: "ENG" },
    bos: { nativeName: "BOS" },
  };

  return (
    <>
      <Select
        sx={{ color: "#DCDCDC" }}
        className={classes.input}
        value={defaultLanguage}
        variant="standard"
        disableUnderline
      >
        {Object.keys(languages).map((language) => (
          <MenuItem
            sx={{
              color: "orange",
              fontWeight:
                i18n.resolvedLanguage === language ? "bold" : "normal",
            }}
            key={language}
            value={language}
            type="submit"
            onClick={() => i18n.changeLanguage(language)}
          >
            {languages[language].nativeName}
          </MenuItem>
        ))}
      </Select>
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <ReusableButton color="primary">
          <Trans i18nKey={"button1"} />
        </ReusableButton>
      </Link>
      {isLoggedIn && (
        <>
          <ReusableButton
            color="primary"
            onClick={() => setOpenAddApartment(true)}
          >
            <Trans i18nKey={"button6"} />
          </ReusableButton>
          <Dialog
            open={openAddApartment}
            onClose={() => setOpenAddApartment(false)}
          >
            <DialogContent
              sx={{
                backgroundColor: "#DCDCDC",
                border: "5px solid",
                borderColor: "orange",
              }}
            >
              <AddApartment onClose={() => setOpenAddApartment(false)} />
            </DialogContent>
          </Dialog>
        </>
      )}
      {!isLoggedIn && (
        <Link to="/register" style={{ textDecoration: "none" }}>
          <ReusableButton color="primary">
            <Trans i18nKey={"button2"} />
          </ReusableButton>
        </Link>
      )}
      {!isLoggedIn && (
        <Link to="/login" style={{ textDecoration: "none" }}>
          <ReusableButton color="primary">
            <Trans i18nKey={"button3"} />
          </ReusableButton>
        </Link>
      )}
      {isLoggedIn && (
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <ReusableButton color="primary">
            <Trans i18nKey={"button4"} />
          </ReusableButton>
        </Link>
      )}
      {isLoggedIn && (
        <ReusableButton onClick={authContext.logout} color="primary">
          <Trans i18nKey={"button5"} />
        </ReusableButton>
      )}
    </>
  );
};

const NavigationBar = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <AppBar position="relative" color="warning">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack direction="row">
          <Link to="/welcome">
            <IconButton>
              <ApartmentIcon fontSize="large" edge="start" color="primary" />
            </IconButton>
          </Link>
          <Link to="/welcome" style={{ textDecoration: "none" }}>
            <Typography
              pt="5px"
              pl="15px"
              variant="h4"
              component="div"
              color="primary"
            >
              Find Apartment
            </Typography>
          </Link>
        </Stack>
        {matches && (
          <>
            <IconButton onClick={() => setIsDrawerOpen(true)}>
              <MenuIcon size="large" color="primary"/>
            </IconButton>
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              PaperProps={{
                sx: { width: 220, height: "auto" },
              }}
            >
              <Box
                textAlign="center"
                role="presentation"
                sx={{
                  backgroundColor: "orange",
                }}
              >
                <Stack direction="column">
                  <Options sx={{ backgroundColor: "orange" }} />
                </Stack>
              </Box>
            </Drawer>
          </>
        )}
        {!matches && (
          <Box alignItems="right" justifyContent="space-between">
            <Options />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
