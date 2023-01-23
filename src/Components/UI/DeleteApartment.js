import { getAuth } from "firebase/auth";
import {
  Grid,
  Typography,
  Stack,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import ReusableButton from "../Common/ReusableButton";
import ReusableAlert from "../Common/ReusableAlert";

const DeleteApartment = (props) => {
  useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [httpError, setHttpError] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { apartmentId, fetchApartments, onClose } = props;
  const authentication = getAuth();
  const userId = authentication.currentUser.uid;
  const URL =
    "https://find-apartment-79d12-default-rtdb.europe-west1.firebasedatabase.app/Apartments/" +
    userId +
    "/" +
    apartmentId +
    ".json";

  const closeSnack = () => {
    setOpenSnack(false);
  };

  const deleteApartment = () => {
    fetch(URL, {
      method: "DELETE",
    })
      .then((response) => {
        setIsLoading(false);
        setOpenSnack(true);
        fetchApartments();
        onClose();
        setIsDeleted(true);
      })
      .catch((error) => {
        setHttpError(true);
      });
  };

  return (
    <Grid margin="auto" textAlign="center">
      <Typography color="orange" variant="h5">
        <Trans i18nKey="deleteText" />
      </Typography>
      <Stack
        pt="15px"
        direction="row"
        justifyContent="center"
        m="auto"
        spacing={5}
      >
        <ReusableButton
          sx={{ color: "orange", border: "1px solid" }}
          onClick={deleteApartment}
        >
          <Trans i18nKey="yesButton" />
        </ReusableButton>
        <ReusableButton
          onClick={onClose}
          sx={{ color: "orange", border: "1px solid" }}
        >
          <Trans i18nKey="noButton" />
        </ReusableButton>
        {isLoading && (
          <CircularProgress color="warning" sx={{ m: "auto", mt: "20px" }} />
        )}
        {httpError && (
          <ReusableAlert severity="error">
            Internet error
          </ReusableAlert>
        )}
        {isDeleted && (
          <Snackbar
            message={<Trans i18nKey={"apartmentDeleted"} />}
            autoHideDuration={2000}
            open={openSnack}
            onClose={closeSnack}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        )}
      </Stack>
    </Grid>
  );
};

export default DeleteApartment;
