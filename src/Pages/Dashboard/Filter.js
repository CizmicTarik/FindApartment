import { useState } from "react";
import {
  Grid,
  Stack,
  Box,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { makeStyles } from "@material-ui/core/styles";
import { Trans, useTranslation } from "react-i18next";
import ReusableButton from "../../Components/Common/ReusableButton";

const useStyles = makeStyles({
  content: {
    justifyContent: "center",
    fontSize: "25px",
  },
});

const Filter = (props) => {
  const { filterByLocation, filterByFromPrice, filterByToPrice } = props;
  const [enteredLocation, setEnteredLocation] = useState("");
  const [fromPriceValue, setFromPriceValue] = useState("");
  const [toPriceValue, setToPriceValue] = useState("");
  const classes = useStyles();
  useTranslation();

  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
    filterByLocation(event.target.value);
  };

  const fromPriceChangeHandler = (event) => {
    setFromPriceValue(event.target.value);
    filterByFromPrice(event.target.value);
  };
  const toPriceChangeHandler = (event) => {
    setToPriceValue(event.target.value);
    filterByToPrice(event.target.value);
  };

  const submitFilter = (event) => {
    event.preventDefault();
    filterByLocation();
    filterByFromPrice();
    filterByToPrice();
  };

  return (
    <Box pb="20px">
      <Accordion
        sx={{
          backgroundColor: "orange",
          m: "20px auto",
        }}
      >
        <AccordionSummary
          classes={{ content: classes.content }}
          sx={{ color: "#DCDCDC" }}
        >
          Filter <FilterListIcon sx={{ pl: "10px", pt: "8px" }} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid width="60%" m="auto">
            <TextField
              sx={{ input: { color: "orange" } }}
              fullWidth
              label={<Trans i18nKey={"enterLocation"} />}
              color="warning"
              style={{ backgroundColor: "#DCDCDC" }}
              value={enteredLocation}
              onChange={locationChangeHandler}
            />
            <Stack mt="20px" direction="row" justifyContent="space-between">
              <Typography variant="h5" color="primary" m="auto" mr="20px">
                {<Trans i18nKey={"priceRange"} />}
              </Typography>
              <Stack direction="row" spacing={2}>
                <TextField
                  type="number"
                  sx={{ input: { color: "orange" } }}
                  label={<Trans i18nKey="from" />}
                  color="warning"
                  style={{
                    backgroundColor: "#DCDCDC",
                  }}
                  value={fromPriceValue}
                  onChange={fromPriceChangeHandler}
                />
                <TextField
                  type="number"
                  sx={{ input: { color: "orange" } }}
                  label={<Trans i18nKey="to" />}
                  color="warning"
                  style={{
                    backgroundColor: "#DCDCDC",
                  }}
                  value={toPriceValue}
                  onChange={toPriceChangeHandler}
                />
              </Stack>
            </Stack>
            <ReusableButton
              onClick={submitFilter}
              color="warning"
              variant="contained"
              sx={{ mt: "20px" }}
            >
              Filter
            </ReusableButton>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Filter;
