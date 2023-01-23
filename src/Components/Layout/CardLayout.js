import { Grid, Card } from "@mui/material";

const CardLayout = (props) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "orange",
        }}
      >
        {props.children}
      </Card>
    </Grid>
  );
};

export default CardLayout;
