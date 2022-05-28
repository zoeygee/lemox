import { Icon } from '@iconify/react';
// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.darker,
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white,
}));

// ----------------------------------------------------------------------

export default function AppReferral({ content, icon, title }) {
  return (
    <RootStyle>
      <Box sx={{ ml: 3, color: 'common.white' }}>
        <Typography variant="h4"> {content}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
      </Box>
      <IconStyle icon={icon} />
    </RootStyle>
  );
}
