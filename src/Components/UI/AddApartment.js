import { useState } from "react";
import useInput from "../hooks/use-input";
import { storage } from "../Firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { getAuth } from "firebase/auth";
import ReusableButton from "../Common/ReusableButton";
import {
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  MenuItem,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Trans, useTranslation } from "react-i18next";
import ReusableAlert from "../Common/ReusableAlert";

const AddApartment = (props) => {
  useTranslation();
  const [openSnack, setOpenSnack] = useState(false);
  const [imageUpload, setImageUpload] = useState("");
  const [imageError, setImageError] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);
  const authentication = getAuth();
  const userId = authentication.currentUser.uid;
  const email = authentication.currentUser.email;
  const { onClose } = props;
  const URL =
    "https://find-apartment-79d12-default-rtdb.europe-west1.firebasedatabase.app/Apartments/" +
    userId +
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
  } = useInput(isEmpty);

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput(isEmpty);

  const {
    value: location,
    isValid: locationIsValid,
    hasError: locationHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
    reset: resetLocationInput,
  } = useInput(isEmpty);

  const {
    value: price,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPriceInput,
  } = useInput(isEmpty);

  const {
    value: type,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resetTypeInput,
  } = useInput(isEmpty);

  const {
    value: sqm,
    isValid: sqmIsValid,
    hasError: sqmHasError,
    valueChangeHandler: sqmChangeHandler,
    inputBlurHandler: sqmBlurHandler,
    reset: resetSqmInput,
  } = useInput(isEmpty);

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

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (formIsValid) {
      if (!imageUpload) {
        setImageError(true);
        return;
      }
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, imageUpload);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setIsLoading(true);
        },
        (error) => setUploadError(true),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (urlImage) => {
            fetch(URL, {
              method: "POST",
              body: JSON.stringify({
                title: title,
                description: description,
                location: location,
                price: price,
                type: type,
                sqm: sqm,
                image: urlImage,
                status: "New",
                email: email,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                setIsLoading(false);
                setOpenSnack(true);
                onClose();
              })
              .catch((error) => {
                alert(error);
                setHttpError(true);
              });
          });
        }
      );
      resetInputs();
    }
  };

  return (
    <Grid
      margin="auto"
      onClick={props.onClick}
      maxWidth="90%"
      textAlign="center"
    >
      <Typography component="h1" variant="h4" color="orange">
        <Trans i18nKey={"addApartment"} />
      </Typography>
      <Box component="form" onSubmit={submitHandler}>
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
          sx={{ input: { color: "orange" } }}
          helperText={sqmHasError && <Trans i18nKey={"validSqm"} />}
        />
        <TextField
          style={{
            color: "orange",
            justifyContent: "auto",
            alignItems: "center",
          }}
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
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="addAPhoto"
          multiple
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <label htmlFor="addAPhoto">
          <Button
            fullWidth
            size="large"
            component="span"
            startIcon={<AddAPhotoIcon />}
            variant="contained"
            disabled={!formIsValid}
            sx={{
              mt: "10px",
              color: "orange",
              backgroundColor: "#DCDCDC",
            }}
          >
            {<Trans i18nKey={"button9"} />}
          </Button>
        </label>
        <ReusableAlert severity="warning">
          <Trans i18nKey="noChange" />
        </ReusableAlert>
        <ReusableButton
          fullWidth
          variant="contained"
          color="warning"
          sx={{ mt: "20px" }}
          disabled={!formIsValid}
        >
          {<Trans i18nKey={"button10"} />}
        </ReusableButton>
        {isLoading && (
          <CircularProgress
            color="warning"
            margin="auto"
            style={{
              m: "auto",
              mt: "20px",
              justifyContent: "center",
              textAlign: "center",
            }}
          />
        )}
        {imageError && (
          <ReusableAlert severity="error">
            <Trans i18nKey="chooseAPhoto" />
          </ReusableAlert>
        )}
        {uploadError && (
          <ReusableAlert severity="error">
            <Trans i18nKey="cantUpload" />
          </ReusableAlert>
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

export default AddApartment;
