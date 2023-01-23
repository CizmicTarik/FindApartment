import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Trans, useTranslation } from "react-i18next";
import {
  CardHeader,
  Typography,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";

const Apartment = (props) => {
  useTranslation();
  return (
    <>
      <CardHeader
        sx={{ color: "#DCDCDC" }}
        title={props.title}
        subheader={
          <Accordion
            sx={{
              backgroundColor: "#DCDCDC",
              mt: "10px",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon color="warning" />}>
              <Typography color="orange">
                <Trans i18nKey={"description2"} />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="orange">{props.description}</Typography>
            </AccordionDetails>
          </Accordion>
        }
      />
      <CardMedia>{props.image}</CardMedia>
      <Typography color="primary" padding="5px">
        <LocationOnIcon />
        {props.location}
      </Typography>
      <Stack backgroundColor="#DCDCDC" borderRadius="10px">
        <Stack
          direction="row"
          justifyContent="space-between"
          padding="10px 20px"
        >
          <Typography color="orange">
            <Trans i18nKey={"typeCard"} />
            {props.type}
          </Typography>
          <Typography color="orange">Status: {props.status}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" padding="0 20px">
          <Typography color="orange">
            <Trans i18nKey={"m2"} />
            {props.sqm}
          </Typography>
          <Typography color="orange" pb="20px">
            <Trans i18nKey={"price"} />
            {props.price}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Apartment;
