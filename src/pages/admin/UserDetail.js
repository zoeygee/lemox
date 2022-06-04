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
import { editUser, getIdentities, updateIdentities, getUserDetail, getIdentity } from '../../redux/actions/data';
import { fToNow } from '../../utils/formatTime';
import Iconify from '../../components/Iconify';

export default function UserDetail() {
  const { id, identityId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserDetail(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIdentity(identityId));
  }, [dispatch, identityId]);

  const { userDetail, isLoading, identity } = useSelector((state) => state.data);
  const { _id, createdAt, firstName, lastName, profilePic, verified, tel, dateOfBirth, country, state, email } =
    userDetail;
  const [customer, setCustomer] = useState(false);
  console.log(userDetail);

  const acceptConfig = {
    verified: 'true',
  };
  const declineConfig = {
    verified: 'false',
  };

  const handleDeclineUser = () => {
    dispatch(editUser(_id, declineConfig));
    setCustomer('false');
  };

  const handleAcceptUser = () => {
    dispatch(updateIdentities(identity._id, acceptConfig, setCustomer));
  };

  return (
    <>
      {!userDetail && isLoading ? (
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
                </Stack>
              </CardContent>
            </Card>
            <Card sx={{ marginTop: 6 }}>
              {!identityId ? (
                <p>There's no identity verification from this user</p>
              ) : (
                <CardContent>
                  <Stack spacing={2.4}>
                    <Typography variant="h4">User Identification details</Typography>
                    <Avatar src={profilePic} alt={firstName} size={70} />
                    <Typography variant="body1">SUBMITTED ON: {identity.createdAt}</Typography>
                    <Typography variant="body1">PHONE NUMBER: {identity.tel}</Typography>
                    <Typography variant="body1">EMAIL ADDRESS: {identity.email}</Typography>
                    <Typography variant="body1">DATE OF BIRTH: {identity.dateOfBirth}</Typography>

                    {/* billing address */}
                    <Stack>
                      <Typography variant="subtitle1">BILLING ADDRESS</Typography>
                      <Typography variant="body2">Country: {identity.country}</Typography>
                      <Typography variant="body2">State: {identity.state} </Typography>
                      <Typography variant="body2">City: {identity.city} </Typography>
                      <Typography variant="body2">Street: {identity.street} </Typography>
                      <Typography variant="body2">ZIP code: {identity.zipCode} </Typography>
                    </Stack>

                    {/* identification */}
                    <Typography variant="subtitle1">IDENTIFICATION</Typography>
                    <Typography variant="body2">Selfie</Typography>
                    <Stack>
                      <img src={identity.selfie} alt={identity.firstName} height="60%" width="100%" />
                      <Typography variant="body1">{identity.idType}</Typography>
                    </Stack>
                    <Stack>
                      <img src={identity.idImage} alt={identity.firstName} height="60%" width="100%" />
                      <Typography variant="body1">Coutry that issued ID: {identity.idCountry}</Typography>
                    </Stack>
                    {identity.verified === 'true' ? (
                      <Typography variant="h6" color="text.success">
                        Verified
                      </Typography>
                    ) : (
                      <Stack spacing={3} direction="row">
                        <Button
                          variant="contained"
                          label="Verify User"
                          color="success"
                          onClick={handleAcceptUser}
                          startIcon={<Iconify icon="ic:round-done" />}
                        >
                          Accept User
                        </Button>
                      </Stack>
                    )}
                  </Stack>
                </CardContent>
              )}
            </Card>
          </Container>
        </Page>
      )}
    </>
  );
}
