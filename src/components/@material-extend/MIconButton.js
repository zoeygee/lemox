import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { IconButton } from '@mui/material';
//

// ----------------------------------------------------------------------

const MIconButton = forwardRef(({ children, ...other }, ref) => (
  <IconButton ref={ref} {...other}>
    {children}
  </IconButton>
));

MIconButton.propTypes = {
  children: PropTypes.node,
};

export default MIconButton;
