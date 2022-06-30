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
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import { getInvestments, getStaticInvestments } from '../../redux/actions/data';
import { fCurrency, fPercent } from '../../utils/formatNumber';
import { PATH_ADMIN } from '../../routes/paths';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'property', label: 'Property', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'user', lable: 'User', alignRight: false },
  { id: 'eth token', lable: 'ETH Token', alignRight: false },
  { id: 'earning', label: 'Earning', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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
    return filter(array, (_investment) => _investment?.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AllInvestments() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStaticInvestments());
  }, [dispatch]);
  const { staticInvestments } = useSelector((state) => state.data);
  console.log(staticInvestments);

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
      const newSelecteds = staticInvestments.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - staticInvestments.length) : 0;

  const filteredInvestment = applySortFilter(staticInvestments, getComparator(order, orderBy), filterName);

  const isInvestmentNotFound = filteredInvestment.length === 0;

  return (
    <Page title="Investments">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Investments
          </Typography>
        </Stack>
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={staticInvestments.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredInvestment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, charge, amount, property, ethToken, user, incrementAmount } = row;
                    const isItemSelected = selected.indexOf(property?.title) !== -1;
                    return (
                      <TableRow
                        hover
                        key={row?._id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        component={RouterLink}
                        to={`${PATH_ADMIN.investments}/${row?._id}?id=${user?._id}`}
                      >
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={property?.title} src={property?.images[0]} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {property?.title}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{fCurrency(amount)}</TableCell>
                        <TableCell align="left">
                          <Typography variant="subtitle2" noWrap>
                            {' '}
                            {user?.firstName} {user?.lastName}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{ethToken}</TableCell>
                        <TableCell align="left">{fCurrency(0)}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={
                              (charge?.timeline?.at(-1).status === 'NEW' && 'warning') ||
                              (charge?.timeline?.at(-1).status === 'PENDING' && 'warning') ||
                              (charge?.timeline?.at(-1).status === 'COMPLETED' && 'success')
                            }
                          >
                            {charge?.timeline?.at(-1).status && charge?.timeline?.at(-1).status}
                          </Label>
                        </TableCell>
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
            rowsPerPageOptions={[]}
            component="div"
            count={staticInvestments.length}
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
