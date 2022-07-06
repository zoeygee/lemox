import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import { fCurrency, fPercent } from '../../utils/formatNumber';
import { getStaticInvestments } from '../../redux/actions/data';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fullName', label: 'Full name', alignRight: false },
  { id: 'commission', label: 'Commission', alignRight: false },
  { id: 'referralCode', label: 'Referral Code', alignRight: false },
  { id: 'peopleReferred', label: 'People referred', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  // { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_investment) => _investment?.property?.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Affiliate() {
  const [loading, setLoading] = useState(false);
  const [affiliateUsers, setAffiliateUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStaticInvestments());
  }, []);

  const { staticInvestments } = useSelector((state) => state.data);
  console.log(staticInvestments);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://lemox-affiliate.herokuapp.com/api/v1/users')
      .then(({ data }) => {
        setAffiliateUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(affiliateUsers);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('title');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = affiliateUsers.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - affiliateUsers.length) : 0;

  const filteredInvestment = applySortFilter(affiliateUsers, getComparator(order, orderBy), filterName);

  const isInvestmentNotFound = filteredInvestment.length === 0;

  return (
    <Page title="All affiliate users">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
          <Typography variant="h4" gutterBottom>
            Registered Affiliate users and their commission
          </Typography>
        </Stack>
        <Stack spacing={3} direction="row" mb={4}>
          <Typography variant="subtitle1">Total affiliate users: {affiliateUsers.length}</Typography>=
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={affiliateUsers.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredInvestment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, referralCode, email, profilePic, firstName, lastName } = row;
                    const isItemSelected = selected.indexOf(firstName) !== -1;
                    const referredUsers = staticInvestments?.filter((i) => i?.user?.referredBy === referralCode);
                    const commission = referredUsers.reduce((acc, investment) => investment + acc * 0.1, 0);

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell component="th" scope="row" padding="checkbox">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={firstName} src={profilePic} />
                            <Typography variant="subtitle2" noWrap>
                              {firstName} {lastName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{fCurrency(commission)} </TableCell>
                        <TableCell align="left">{referralCode}</TableCell>
                        <TableCell align="left">{referredUsers.length}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isInvestmentNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={affiliateUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
