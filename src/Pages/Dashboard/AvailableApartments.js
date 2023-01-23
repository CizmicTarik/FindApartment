import { useState, useEffect } from "react";
import Filter from "./Filter";
import DashboardCard from "./DashboardCard";
import { CircularProgress, Grid } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import ReusableAlert from "../../Components/Common/ReusableAlert";

const AvailableApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  useTranslation();
  const URL =
    "https://find-apartment-79d12-default-rtdb.europe-west1.firebasedatabase.app/Apartments.json";

  const filterByLocation = (locationValue) => {
    if (locationValue === "") {
      setFilteredApartments(apartments);
    } else {
      const filteredApartmentsByLocation = apartments.filter((apartment) =>
        apartment.location.includes(locationValue)
      );
      setFilteredApartments(filteredApartmentsByLocation);
    }
  };

  const filterByFromPrice = (enteredValue) => {
    if (enteredValue === "") {
      setFilteredApartments(apartments);
    } else {
      const filteredApartmentsByFromPrice = apartments.filter(
        (apartment) => Number(apartment.price) >= enteredValue
      );
      setFilteredApartments(filteredApartmentsByFromPrice);
    }
  };

  const filterByToPrice = (enteredValue) => {
    if (enteredValue === "") {
      setFilteredApartments(apartments);
    } else {
      const filteredApartmentsByToPrice = apartments.filter(
        (apartment) => Number(apartment.price) <= enteredValue
      );
      setFilteredApartments(filteredApartmentsByToPrice);
    }
  };

  const fetchApartments = async () => {
    const response = await fetch(URL);

    if (!response.ok) {
      setHttpError(true);
    }

    const userList = await response.json();

    const loadedApartments = [];

    for (const user in userList) {
      const apartments = userList[user];
      for (const apartmentKey in apartments) {
        const apartment = apartments[apartmentKey];
        if (apartment.status === "Active") {
          loadedApartments.push({
            apartmentKey: apartmentKey,
            id: user,
            ...apartment,
          });
        }
      }
    }
    setApartments(loadedApartments);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchApartments().catch((error) => {
      setIsLoading(false);
      setHttpError(true);
    });
  }, []);

  const list =
    filteredApartments.length !== 0 ? filteredApartments : apartments;
  const apartmentsList = list.map((apartment, index) => (
    <DashboardCard key={index} apartment={apartment} />
  ));

  return (
    <>
      <Filter
        filterByLocation={filterByLocation}
        filterByFromPrice={filterByFromPrice}
        filterByToPrice={filterByToPrice}
      />
      <Grid container spacing={2}>
        {apartmentsList}
        {!apartmentsList && <Trans i18nKey={"loading"} />}
        {apartmentsList.length === 0 && (
          <ReusableAlert severity="warning">
            <Trans i18nKey="noApartments" />
          </ReusableAlert>
        )}
        {isLoading && (
          <CircularProgress
            color="warning"
            style={{ m: "auto", mt: "20px" }}
          />
        )}
        {httpError && (
          <ReusableAlert severity="error">
            <Trans i18nKey="cantLoadData" />
          </ReusableAlert>
        )}
      </Grid>
    </>
  );
};

export default AvailableApartments;
