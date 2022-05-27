import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Stack,
  Button,
  Link,
  Chip,
  Avatar,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import Page from '../../components/Page';
import { getSingleWithdrawal, editUser } from '../../redux/actions/data';
import { fToNow } from '../../utils/formatTime';
import Iconify from '../../components/Iconify';

export default function WithdrawalDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getSingleWithdrawal(id));
  }, [dispatch]);

  const { withdrawal, isLoading } = useSelector((state) => state.data);
  const { _id, createdAt, firstName, lastName, profilePic, verified, tel, dateOfBirth, country, state, email } =
    withdrawal;

  console.log(withdrawal);

  return (
    <>
      {!withdrawal && isLoading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <Page title={`${firstName} ${lastName}`}>
          <Container>
            <Box>
              <Link onClick={() => navigate(-1)} sx={{ cursor: 'pointer' }}>
                Go back
              </Link>
            </Box>
            <Card>
              <CardContent>
                <Stack spacing={2.4}>
                  <Typography variant="h4">
                    {firstName} {lastName}
                  </Typography>
                  <Avatar src={profilePic} alt={firstName} size={70} />
                  <Typography variant="body1">REGISTERED ON: {createdAt}</Typography>
                  <Typography variant="body1">PHONE NUMBER: {tel}</Typography>
                  <Typography variant="body1">EMAIL ADDRESS: {email}</Typography>
                  <Typography variant="body1">DATE OF BIRTH: {dateOfBirth}</Typography>
                  <Typography variant="body1">COUNTRY: {country}</Typography>
                  <Typography variant="body1">STATE: {state}</Typography>
                  <Typography variant="body1">
                    VERIFICATION:
                    <Chip variant="filled" icon={<Iconify icon="ic:round-done" />} color="success" label="approved" />
                  </Typography>
                  <Stack spacing={3} direction="row">
                    <Button
                      variant="contained"
                      label="Verify User"
                      color="success"
                      startIcon={<Iconify icon="ic:round-done" />}
                    >
                      Accept User
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      label="Decline User"
                      startIcon={<Iconify icon="iconoir:cancel" />}
                    >
                      Decline User
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Container>
        </Page>
      )}
    </>
  );
}
