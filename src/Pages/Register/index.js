import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useInput from "../../Components/hooks/use-input";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import FormLayout from "../../Components/Layout/FormLayout";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Trans, useTranslation } from "react-i18next";
import ReusableButton from "../../Components/Common/ReusableButton";
import {
  Box,
  Avatar,
  Typography,
  Stack,
  TextField,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import ReusableAlert from "../../Components/Common/ReusableAlert";

const Register = () => {
  useTranslation();
  const VALUE_LENGTH_NUMBER_5 = 5;
  const VALUE_LENGTH_NUMBER_8 = 8;
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const authentication = getAuth();
  const history = useHistory();
  const URL =
    "https://find-apartment-79d12-default-rtdb.europe-west1.firebasedatabase.app/Users.json";

  const isEmpty = (value) => {
    return value.trim() !== "";
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateValueLength = (value) => {
    return value.length > VALUE_LENGTH_NUMBER_5;
  };

  const validateValueLength2 = (value) => {
    return value.length > VALUE_LENGTH_NUMBER_8;
  };

  const closeSnack = () => {
    setOpenSnack(false);
  };

  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput(isEmpty);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(isEmpty);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => isEmpty && validateEmail(value));

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => isEmpty && validateValueLength(value));

  const {
    value: confirmedPassword,
    isValid: confirmedPasswordIsValid,
    hasError: confirmedPasswordHasError,
    valueChangeHandler: confirmedPasswordChangeHandler,
    inputBlurHandler: confirmedPasswordBlurHandler,
    reset: resetConfirmedPasswordInput,
  } = useInput(
    (value) => isEmpty && validateValueLength(value) && value === password
  );

  const {
    value: phoneNumber,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumberInput,
  } = useInput((value) => isEmpty && validateValueLength2(value));

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmedPasswordIsValid &&
    phoneNumberIsValid
  ) {
    formIsValid = true;
  }

  const resetInputs = () => {
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
    resetPasswordInput();
    resetConfirmedPasswordInput();
    resetPhoneNumberInput();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (formIsValid) {
      await createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          setOpenSnack(true);
          setIsLoading(false);
          setTimeout(() => {
            history.push("/login");
          }, 2000);
        })
        .catch((error) => {
          setHttpError(true);
          setIsLoading(false);
        });

      await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmedPassword,
          phoneNumber,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        setHttpError(true);
      });

      resetInputs();
    }
  };

  return (
    <FormLayout>
      <Box component="form" onSubmit={submitHandler}>
        <Avatar sx={{ backgroundColor: "orange", m: "auto" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h3" color="orange" gutterBottom overflow="hidden">
          {<Trans i18nKey={"registerText"} />}
        </Typography>
        <Stack alignItems="center">
          <Stack spacing={1} width="80%" maxWidth="80%">
            <TextField
              label={<Trans i18nKey={"firstName"} />}
              color="warning"
              required
              value={firstName}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              error={firstNameHasError}
              helperText={
                firstNameHasError && <Trans i18nKey={"validFirstName"} />
              }
            />
            <TextField
              label={<Trans i18nKey={"lastName"} />}
              color="warning"
              required
              value={lastName}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              error={lastNameHasError}
              helperText={
                lastNameHasError && <Trans i18nKey={"validLastName"} />
              }
            />
            <TextField
              label="Email"
              color="warning"
              required
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={email}
              error={emailHasError}
              helperText={emailHasError && <Trans i18nKey={"validEmail"} />}
            />
            <TextField
              label={<Trans i18nKey={"password"} />}
              color="warning"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={
                passwordHasError && <Trans i18nKey={"validPassword"} />
              }
            />
            <TextField
              label={<Trans i18nKey={"confirmPassword"} />}
              color="warning"
              type="password"
              required
              value={confirmedPassword}
              onChange={confirmedPasswordChangeHandler}
              onBlur={confirmedPasswordBlurHandler}
              error={confirmedPasswordHasError}
              helperText={
                confirmedPasswordHasError && (
                  <Trans i18nKey={"validConfirmedPassword"} />
                )
              }
            />
            <TextField
              label={<Trans i18nKey={"phoneNumber"} />}
              type="number"
              color="warning"
              required
              value={phoneNumber}
              onChange={phoneNumberChangeHandler}
              onBlur={phoneNumberBlurHandler}
              error={phoneNumberHasError}
              helperText={
                phoneNumberHasError && <Trans i18nKey={"validPhoneNumber"} />
              }
            />
            <ReusableButton
              color="warning"
              variant="contained"
              disabled={!formIsValid}
            >
              {<Trans i18nKey={"registerText"} />}
            </ReusableButton>
            <Link to="/login" color="secondary" underline="hover">
              <Trans i18nKey={"haveAccountLogin"} />
            </Link>
          </Stack>
          {isLoading && (
            <CircularProgress color="warning" sx={{ m: "auto", mt: "20px" }} />
          )}
          {httpError && (
            <ReusableAlert severity="error">
              <Trans i18nKey="emailInUse" />
            </ReusableAlert>
          )}
        </Stack>
      </Box>
      <Snackbar
        message={<Trans i18nKey={"registerSnackbar"} />}
        autoHideDuration={2000}
        open={openSnack}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </FormLayout>
  );
};

export default Register;
