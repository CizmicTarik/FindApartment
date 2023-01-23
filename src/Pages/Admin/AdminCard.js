import { useState } from "react";
import {
  CardContent,
  CardActions,
  CardMedia,
  Dialog,
  DialogContent,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Apartment from "../../Components/UI/Apartment";
import UpdateApartment from "../../Components/UI/UpdateApartment";
import DeleteApartment from "../../Components/UI/DeleteApartment";
import ReusableButton from "../../Components/Common/ReusableButton";
import CardLayout from "../../Components/Layout/CardLayout";

const AdminCardUI = (props) => {
  const { apartment, fetchApartments } = props;
  const [openUpdateApartment, setOpenUpdateApartment] = useState(false);
  const [openDeleteApartment, setOpenDeleteApartment] = useState(false);

  return (
    <CardLayout>
      <CardContent>
        <Apartment
          id={apartment.id}
          key={apartment.id}
          description={apartment.description}
          image={
            <CardMedia
              component="img"
              image={apartment.image}
              alt="Apartment Image"
              height="200"
              sx={{ borderRadius: "10px" }}
            />
          }
          type={apartment.type}
          location={apartment.location}
          price={apartment.price}
          title={apartment.title}
          sqm={apartment.sqm}
          status={apartment.status}
        />
      </CardContent>
      <CardActions>
        <Stack direction="row" justifyContent="center" m="auto" spacing={1}>
          <ReusableButton
            color="primary"
            sx={{ border: "1px solid" }}
            onClick={() => setOpenUpdateApartment(true)}
          >
            <UpdateIcon />
          </ReusableButton>
          <Dialog
            open={openUpdateApartment}
            onClose={() => setOpenUpdateApartment(false)}
          >
            <DialogContent
              sx={{
                backgroundColor: "#DCDCDC",
                border: "5px solid",
                borderColor: "orange",
              }}
            >
              <UpdateApartment
                apartment={apartment}
                fetchApartments={fetchApartments}
                onClose={() => setOpenUpdateApartment(false)}
              />
            </DialogContent>
          </Dialog>
          <ReusableButton
            color="primary"
            sx={{ border: "1px solid" }}
            onClick={() => setOpenDeleteApartment(true)}
          >
            <DeleteIcon />
          </ReusableButton>
          <Dialog
            open={openDeleteApartment}
            onClose={() => setOpenDeleteApartment(false)}
          >
            <DialogContent
              sx={{
                backgroundColor: "#DCDCDC",
                border: "5px solid",
                borderColor: "orange",
              }}
            >
              <DeleteApartment
                apartmentId={apartment.id}
                fetchApartments={fetchApartments}
                onClose={() => setOpenDeleteApartment(false)}
              />
            </DialogContent>
          </Dialog>
        </Stack>
      </CardActions>
    </CardLayout>
  );
};

export default AdminCardUI;
