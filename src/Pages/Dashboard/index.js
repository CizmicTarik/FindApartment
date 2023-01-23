import AvailableApartments from "./AvailableApartments";
import { Card, Container } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Card
        sx={{
          textAlign: "center",
          backgroundColor: "#DCDCDC",
          m: "auto",
          height: "auto",
          minHeight: "100vh",
        }}
      >
        <Container
          sx={{
            textAlign: "center",
            backgroundColor: "#DCDCDC",
            p: "15px 0",
            width: "100%",
          }}
        >
          <AvailableApartments />
        </Container>
      </Card>
    </>
  );
};

export default Dashboard;
