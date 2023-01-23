import { useState, useEffect, useContext, useCallback } from "react";
import { Typography, Grid, CircularProgress } from "@mui/material";
import AuthContext from "../../Components/Store/auth-context";
import AdminCard from "./AdminCard";
import { Trans, useTranslation } from "react-i18next";
import ReusableAlert from "../../Components/Common/ReusableAlert";

const ApartmentsList = () => {
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);
  const [httpError2, setHttpError2] = useState(false);
  useTranslation();
  const authContext = useContext(AuthContext);
  const userId = authContext.token;
  const URL =
    "https://find-apartment-79d12-default-rtdb.europe-west1.firebasedatabase.app/Apartments/" +
    userId +
    ".json";

  const fetchApartments = useCallback(async () => {
    const response = await fetch(URL);
    setIsLoading(true);
    if (!response.ok) {
      setHttpError(true);
    }

    const responseData = await response.json();

    const loadedApartments = [];
    for (const key in responseData) {
      const information = responseData[key];
      loadedApartments.push({
        id: key,
        ...information,
      });
    }
    setApartments(loadedApartments);
    setIsLoading(false);
  }, [URL]);

  useEffect(() => {
    if (userId) {
      fetchApartments(userId).catch((error) => {
        setIsLoading(false);
        setHttpError2(true);
      });
    }
  }, [fetchApartments, userId]);

  const apartmentsList = apartments.map((apartment, index) => (
    <AdminCard
      key={index}
      apartment={apartment}
      fetchApartments={fetchApartments}
    />
  ));

  return (
    <Grid container spacing={2}>
      {apartmentsList}
      {!apartmentsList && (
        <Typography color="orange" m="auto" pt="20px" gutterBottom variant="h4">
          <Trans i18nKey={"loading"} />
        </Typography>
      )}
      {apartmentsList.length === 0 && (
        <ReusableAlert severity="warning">
          <Trans i18nKey="noApartments" />
        </ReusableAlert>
      )}
      {httpError && (
        <ReusableAlert severity="error">
          <Trans i18nKey="noUserFound" />
        </ReusableAlert>
      )}
      {httpError2 && (
        <ReusableAlert severity="error">
          <Trans i18nKey="cantLoadData" />
        </ReusableAlert>
      )}
      {isLoading && (
        <CircularProgress color="warning" sx={{ m: "auto", mt: "20px" }} />
      )}
    </Grid>
  );
};

export default ApartmentsList;
