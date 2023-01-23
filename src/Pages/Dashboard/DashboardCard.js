import { useState, useEffect } from "react";
import Apartment from "../../Components/UI/Apartment";
import { Trans, useTranslation } from "react-i18next";
import {
  Typography,
  CardContent,
  CardMedia,
  CardActions,
  Dialog,
  Box,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import ReusableButton from "../../Components/Common/ReusableButton";
import ReusableAlert from "../../Components/Common/ReusableAlert";
import CardLayout from "../../Components/Layout/CardLayout";

const DashboardCardUI = (props) => {
  useTranslation();
  const { apartment } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [openSellerInformation, setOpenSellerInformation] = useState(false);
  const URL =
    "https://find-apartment-79d12-default-rtdb.europe-west1.firebasedatabase.app/Users.json";

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(URL);

      if (!response.ok) {
        setHttpError(true);
      }

      const userList = await response.json();

      const loadedUsers = [];

      for (const user in userList) {
        loadedUsers.push({
          id: user,
        });
      }
      setIsLoading(false);
    };
    fetchUsers().catch((error) => {
      setIsLoading(false);
      setHttpError(true);
    });
  }, []);

  return (
    <CardLayout>
      <CardContent>
        <Apartment
          key={apartment.id}
          id={apartment.id}
          description={apartment.description}
          image={
            <CardMedia
              component="img"
              image={apartment.image}
              alt="Apartment Image"
              height="200"
              sx={{ borderRadius: "5px" }}
            />
          }
          type={apartment.type}
          location={apartment.location}
          price={apartment.price}
          title={apartment.title}
          sqm={apartment.sqm}
          status={apartment.status}
          email={apartment.email}
        />
      </CardContent>
      <CardActions sx={{ m: "auto" }}>
        <ReusableButton
          color="primary"
          sx={{ border: "1px solid" }}
          onClick={() => setOpenSellerInformation(true)}
        >
          <Trans i18nKey={"button7"} />
        </ReusableButton>
        <Dialog
          open={openSellerInformation}
          onClose={() => setOpenSellerInformation(false)}
        >
          <Box textAlign="center" border="5px solid orange">
            <DialogContent sx={{ backgroundColor: "#DCDCDC" }}>
              <Typography variant="h4" color="orange" gutterBottom>
                <Trans i18nKey={"button7"} />
              </Typography>
              <Typography
                variant="h5"
                color="orange"
                gutterBottom
                textAlign="center"
              >
                Email: {apartment.email}
              </Typography>
              <ReusableButton
                sx={{ color: "orange", border: "1px solid" }}
                onClick={() => setOpenSellerInformation(false)}
              >
                <Trans i18nKey={"button8"} />
              </ReusableButton>
            </DialogContent>
            {isLoading && (
              <CircularProgress
                color="warning"
                sx={{ m: "auto", mt: "20px" }}
              />
            )}
            {httpError && (
              <ReusableAlert severity="error">
                <Trans i18nKey="cantLoadData" />
              </ReusableAlert>
            )}
          </Box>
        </Dialog>
      </CardActions>
    </CardLayout>
  );
};

export default DashboardCardUI;
