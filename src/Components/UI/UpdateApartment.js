import { useState } from "react";
import useInput from "../hooks/use-input";
import { getAuth } from "firebase/auth";
import {
  Typography,
  Grid,
  Box,
  TextField,
  MenuItem,
  Snackbar,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import ReusableButton from "../Common/ReusableButton";
import ReusableAlert from "../Common/ReusableAlert";

const UpdateApartment = (props) => {
  useTranslation();
  const [openSnack, setOpenSnack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);
  const [currentValue, setCurrentValue] = useState("New");
  const { apartment, fetchApartments, onClose } = props;
  const authentication = getAuth();
  const userId = authentication.currentUser.uid;
  const email = authentication.currentUser.email;

  const URL =
    "https://find-apartment-79d12-default-rtdb.europe-west1.firebasedatabase.app/Apartments/" +
    userId +
    "/" +
    apartment.id +
    ".json";

  const closeSnack = () => {
    setOpenSnack(false);
  };

  const isEmpty = (value) => {
    return value.trim() !== "";
  };

  const {
    value: title,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput(isEmpty, apartment.title);

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput(isEmpty, apartment.description);

  const {
    value: location,
    isValid: locationIsValid,
    hasError: locationHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
    reset: resetLocationInput,
  } = useInput(isEmpty, apartment.location);

  const {
    value: price,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPriceInput,
  } = useInput(isEmpty, apartment.price);

  const {
    value: type,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resetTypeInput,
  } = useInput(isEmpty, apartment.type);

  const {
    value: sqm,
    isValid: sqmIsValid,
    hasError: sqmHasError,
    valueChangeHandler: sqmChangeHandler,
    inputBlurHandler: sqmBlurHandler,
    reset: resetSqmInput,
  } = useInput(isEmpty, apartment.sqm);

  const resetInputs = () => {
    resetTitleInput();
    resetDescriptionInput();
    resetLocationInput();
    resetPriceInput();
    resetTypeInput();
    resetSqmInput();
  };

  let formIsValid = false;

  if (
    titleIsValid &&
    descriptionIsValid &&
    locationIsValid &&
    priceIsValid &&
    typeIsValid &&
    sqmIsValid
  ) {
    formIsValid = true;
  }

  const updateApartment = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (formIsValid) {
      fetch(URL, {
        method: "PUT",
        body: JSON.stringify({
          title,
          description,
          location,
          price,
          type,
          sqm,
          image: apartment.image,
          status: currentValue,
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          setIsLoading(false);
          setOpenSnack(true);
          fetchApartments();
          onClose();
        })
        .catch((error) => {
          setHttpError(true);
        });
      resetInputs();
    }
  };

  return (
    <Grid margin="auto" onClick={props.onClick} maxWidth="90%">
      <Typography variant="h4" color="orange" textAlign="center">
        <Trans i18nKey={"updateApartment"} />
      </Typography>
      <Box component="form" onSubmit={updateApartment}>
        <TextField
          label={<Trans i18nKey={"title"} />}
          color="warning"
          margin="normal"
          required
          fullWidth
          value={title}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
          error={titleHasError}
          helperText={titleHasError && <Trans i18nKey={"validTitle"} />}
          sx={{ input: { color: "orange" } }}
        />
        <TextField
          color="warning"
          margin="normal"
          required
          fullWidth
          label={<Trans i18nKey={"description2"} />}
          value={description}
          onChange={descriptionChangeHandler}
          onBlur={descriptionBlurHandler}
          error={descriptionHasError}
          helperText={titleHasError && <Trans i18nKey={"validDescription"} />}
          sx={{ input: { color: "orange" } }}
        />
        <TextField
          color="warning"
          margin="normal"
          required
          fullWidth
          label={<Trans i18nKey={"location"} />}
          value={location}
          onChange={locationChangeHandler}
          onBlur={locationBlurHandler}
          error={locationHasError}
          helperText={locationHasError && <Trans i18nKey={"validLocation"} />}
          sx={{ input: { color: "orange" } }}
        />
        <TextField
          type="number"
          min="1"
          max="1000000"
          color="warning"
          margin="normal"
          required
          fullWidth
          label={<Trans i18nKey={"price"} />}
          value={price}
          onChange={priceChangeHandler}
          onBlur={priceBlurHandler}
          error={priceHasError}
          helperText={priceHasError && <Trans i18nKey={"validPrice"} />}
          sx={{ input: { color: "orange" } }}
        />
        <TextField
          type="number"
          min="10"
          max="1000"
          color="warning"
          margin="normal"
          required
          fullWidth
          label={<Trans i18nKey={"m2"} />}
          value={sqm}
          onChange={sqmChangeHandler}
          onBlur={sqmBlurHandler}
          error={sqmHasError}
          helperText={sqmHasError && <Trans i18nKey={"validSqm"} />}
          sx={{ input: { color: "orange" } }}
        />
        <TextField
          fullWidth
          label={<Trans i18nKey={"type"} />}
          select
          value={type}
          onChange={typeChangeHandler}
          onBlur={typeBlurHandler}
          error={typeHasError}
          helperText={typeHasError && <Trans i18nKey={"validDescription"} />}
          color="warning"
          sx={{ input: { color: "orange" } }}
        >
          <MenuItem
            value="BUY"
            sx={{ color: "orange", backgroundColor: "#DCDCDC" }}
          >
            <Trans i18nKey={"type1"} />
          </MenuItem>
          <MenuItem
            value="RENT"
            sx={{ color: "orange", backgroundColor: "#DCDCDC" }}
          >
            <Trans i18nKey={"type2"} />
          </MenuItem>
        </TextField>
        <ReusableAlert severity="warning">
          <Trans i18nKey="noChange" />
        </ReusableAlert>
        <Typography variant="h5" color="orange" m="15px" textAlign="center">
          <Trans i18nKey={"setAs"} />
        </Typography>
        <Stack direction="row" justifyContent="center" mb="5px" spacing={1}>
          <ReusableButton
            onClick={() => setCurrentValue("Active")}
            variant="outlined"
            sx={{ color: "orange", border: "1px solid" }}
          >
            <Trans i18nKey={"button12"} />
          </ReusableButton>
          <ReusableButton
            onClick={() => setCurrentValue("Sold")}
            variant="outlined"
            sx={{ color: "orange", border: "1px solid" }}
          >
            <Trans i18nKey={"button13"} />
          </ReusableButton>
          <ReusableButton
            onClick={() => setCurrentValue("Rented")}
            variant="outlined"
            sx={{ color: "orange", border: "1px solid" }}
          >
            <Trans i18nKey={"button14"} />
          </ReusableButton>
        </Stack>
        <ReusableButton
          fullWidth
          variant="contained"
          color="warning"
          sx={{ mt: "30px" }}
          disabled={!formIsValid}
        >
          {<Trans i18nKey={"button11"} />}
        </ReusableButton>
        {isLoading && (
          <CircularProgress color="warning" sx={{ m: "auto", mt: "20px" }} />
        )}
        {httpError && (
          <ReusableAlert severity="error">Internet error</ReusableAlert>
        )}
      </Box>
      <Snackbar
        message={<Trans i18nKey={"snackbarAdd"} />}
        autoHideDuration={2000}
        open={openSnack}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Grid>
  );
};

export default UpdateApartment;
