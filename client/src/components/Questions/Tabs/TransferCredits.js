import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

const MAX_TRANSFER_CREDITS = 9;

export default function TransferCredits({ tabInfo, setTabInfo }) {
  const handleChange = (e) => {
    if (Number(e.target.value) < 0 || !e.target.value) e.target.value = 0;
    if (Number(e.target.value) > MAX_TRANSFER_CREDITS)
      e.target.value = MAX_TRANSFER_CREDITS;
    if (e.target.value.startsWith("0"))
      e.target.value = e.target.value.substring(1);
    setTabInfo({ ...tabInfo, transfer: Number(e.target.value) });
  };

  return (
    <Container
      sx={{
        marginTop: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
      }}
    >
      <Typography variant="h2">Approved Transfered Credits</Typography>
      <Typography
        sx={{
          marginTop: (theme) => theme.spacing(2),
          marginBottom: (theme) => theme.spacing(3),
        }}
      >
        Enter the number of transfer credits that you are approved for but do
        not associate with a class in the Completed Courses. Maximum of{" "}
        {MAX_TRANSFER_CREDITS} credits allowed.
      </Typography>
      <TextField
        id="transfer-credits"
        label="# of Transfer Credits"
        type="number"
        value={tabInfo.transfer}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
    </Container>
  );
}
