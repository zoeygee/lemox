// material
import { Button, Typography, TextField, Stack } from '@mui/material';
//

// ----------------------------------------------------------------------

export default function FaqsForm() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Haven't found the right help?</Typography>

      <TextField fullWidth label="Name" />

      <TextField fullWidth label="Email" />

      <TextField fullWidth label="Subject" />

      <TextField fullWidth label="Enter your message here." multiline rows={4} />

      <Button size="large" variant="contained">
        Submit Now
      </Button>
    </Stack>
  );
}
