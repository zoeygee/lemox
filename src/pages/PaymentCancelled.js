import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Stack,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Link,
} from '@mui/material';
import Iconify from '../components/Iconify';
import { getProperty } from '../redux/actions/data';
import { fPercent, fCurrency, fNumber } from '../utils/formatNumber';

export default function PaymentCancelled() {
  const dispatch = useDispatch();
  const [chargeData, setChargeData] = React.useState([]);

  const { id, charge } = useParams();
  React.useEffect(() => {
    dispatch(getProperty(id));
  }, [dispatch]);
  React.useEffect(() => {
    const fetchCharge = async (currentCharge) => {
      axios
        .get(`https://api.commerce.coinbase.com/charges/${currentCharge}`)
        .then((res) => {
          const { data } = res;
          setChargeData(data.data);
        })
        .catch((error) => console.log(error));
    };
    fetchCharge(charge);
  }, [charge]);
  const { property } = useSelector((state) => state.data);
  return (
    <Container className="py-10">
      <Grid container>
        <Grid item sm={12} md={6} justifyContent="center" alignItems="baseline">
          <Stack spacing={1} mb={5} maxWidth="400px">
            <Typography variant="h1" color="warning.main">
              ...
            </Typography>
            <Typography variant="h3">Awaiting transaction</Typography>
            <Typography variant="body1">
              We're constantly monitoring the transaction made on investment for <strong>{property?.title}</strong>.
            </Typography>
          </Stack>
          <Link component={RouterLink} to={`/marketplace/${id}`}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Iconify icon="ep:back" />
              <Typography variant="body1">Go back</Typography>
            </Stack>
          </Link>
        </Grid>
        <Grid item sm={12} md={6}>
          <Card sx={{ backgroundColor: 'grey.300' }}>
            <CardContent>
              <Typography variant="body1">Transaction summary</Typography>
              <Typography variant="body2">{chargeData?.id}</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Payment type</TableCell>
                      <TableCell>PAYMENT GATEWAY</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Transaction status</TableCell>
                      <TableCell>Pending</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Amount</TableCell>
                      <TableCell>
                        {chargeData?.pricing?.local?.amount && fCurrency(chargeData?.pricing?.local?.amount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Property ID</TableCell>
                      <TableCell>{property?._id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="caption" color="warning.main">
                          *Awaiting transaction
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
