import { Button } from "@mui/material";

const ReusableButton = (props) => {
  return (
    <Button
      type="submit"
      size="large"
      color={props.color}
      variant={props.variant}
      onClick={props.onClick}
      disabled={props.disabled}
      sx={props.sx}
      fullWidth={props.fullWidth}
    >
      {props.children}
    </Button>
  );
};

export default ReusableButton;
