import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../Components/Store/auth-context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useInput from "../../Components/hooks/use-input";
import FormLayout from "../../Components/Layout/FormLayout";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Trans, useTranslation } from "react-i18next";
import ReusableButton from "../../Components/Common/ReusableButton";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Stack,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import ReusableAlert from "../../Components/Common/ReusableAlert";

const Login = () => {
  useTranslation();
  const VALUE_LENGTH_NUMBER = 5;
  const [httpError, setHttpError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const authentication = getAuth();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  let formIsValid = false;

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
    return value.length > VALUE_LENGTH_NUMBER;
  };

  const closeSnack = () => {
    setOpenSnack(false);
  };

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

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const resetInputs = () => {
    resetEmailInput();
    resetPasswordInput();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (formIsValid) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          setIsLoading(false);
          setOpenSnack(true);
          authContext.login(authentication.currentUser.uid);
          localStorage.setItem("User Email", email);
          setTimeout(() => {
            history.push("/admin");
          }, 2000);
        })
        .catch((error) => {
          setIsLoading(false);
          setHttpError(true);
        });
      resetInputs();
    }
  };

  return (
    <>
      <FormLayout>
        <Box component="form" onSubmit={submitHandler}>
          <Avatar sx={{ backgroundColor: "orange", m: "auto" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            variant="h3"
            color="orange"
            gutterBottom
            textAlign="center"
          >
            <Trans i18nKey={"loginText"} />
          </Typography>
          <Stack alignItems="center">
            <Stack spacing={1} width="80%" maxWidth="80%">
              <TextField
                label="Email"
                color="warning"
                required
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={email}
                error={emailHasError}
                helperText={emailHasError && <Trans i18nKey={"validEmail"} />}
                sx={{ input: { color: "orange" } }}
              />
              <TextField
                label={<Trans i18nKey={"password"} />}
                type="password"
                color="warning"
                required
                value={password}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                error={passwordHasError}
                helperText={
                  passwordHasError && <Trans i18nKey={"validPassword"} />
                }
                sx={{ input: { color: "orange" } }}
              />
              <ReusableButton
                variant="contained"
                color="warning"
                disabled={!formIsValid}
              >
                {<Trans i18nKey={"loginText"} />}
              </ReusableButton>
              <Link to="/register" color="secondary" underline="hover">
                {<Trans i18nKey={"noAccountRegister"} />}
              </Link>
            </Stack>
            {isLoading && (
              <CircularProgress
                color="warning"
                sx={{ m: "auto", mt: "20px" }}
              />
            )}
            {httpError && (
              <ReusableAlert severity="error">
                <Trans i18nKey="noUserFound" />
              </ReusableAlert>
            )}
          </Stack>
        </Box>
        <Snackbar
          message={<Trans i18nKey={"loginSnackbar"} />}
          autoHideDuration={2000}
          open={openSnack}
          onClose={closeSnack}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </FormLayout>
    </>
  );
};

export default Login;
