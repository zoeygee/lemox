import { Icon } from '@iconify/react';
// material
import { styled } from '@mui/material/styles';
import { Box, alpha, Container, OutlinedInput, InputAdornment, Typography } from '@mui/material';
//

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundImage: 'url(/static/overlay.svg), url(/static/faqs/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 320,
  color: theme.palette.common.white,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    backgroundColor: alpha(theme.palette.common.white, 0.04),
    [theme.breakpoints.up('md')]: {
      width: 480,
    },
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

export default function FaqsHero() {
  return (
    <section className="pt-6 pt-md-11">
      <div className="container-lg">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 text-center">
            <h6 className="text-uppercase text-primary mb-5">FAQ</h6>

            <h2 className="display-3 mb-4">
              <h1>FAQS Page</h1>
            </h2>

            <p className="fs-lg text-muted">Browse through the most frequently asked questions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
