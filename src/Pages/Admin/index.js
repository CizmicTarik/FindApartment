import { useState, useEffect } from "react";
import ApartmentsList from "./ApartmentsList";
import { CircularProgress, Container, Card } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import ReusableAlert from "../../Components/Common/ReusableAlert";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [httpError2, setHttpError2] = useState(false);
  useTranslation();

  const URL =
    "https://find-apartment-79d12-default-rtdb.europe-west1.firebasedatabase.app/Users.json";

  useEffect(() => {
    const fetchUsersIds = async () => {
      const response = await fetch(URL);

      if (!response.ok) {
        setHttpError(true);
      }

      const responseData = await response.json();

      const loadedIds = [];

      for (const key in responseData) {
        loadedIds.push({
          id: key,
        });
      }
      setIsLoading(false);
    };
    fetchUsersIds().catch((error) => {
      setIsLoading(false);
      setHttpError2(true);
    });
  }, []);

  return (
    <Card
      sx={{
        textAlign: "center",
        backgroundColor: "#DCDCDC",
        m: "auto",
        minHeight: "100vh",
      }}
      sm={6}
      md={9}
      lg={12}
      spacing={4}
    >
      <Container
        sx={{
          textAlign: "center",
          backgroundColor: "#DCDCDC",
          p: "15px 0",
          w: "100%",
        }}
        spacing={4}
      >
        <ApartmentsList />
        {isLoading && (
          <CircularProgress color="warning" sx={{ m: "auto", mt: "20px" }} />
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
      </Container>
    </Card>
  );
};

export default Admin;
