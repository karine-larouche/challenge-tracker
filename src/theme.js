import { createMuiTheme } from '@material-ui/core/styles';
import brown from '@material-ui/core/colors/brown';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: brown[700],
    },
    secondary: {
      main: deepOrange[700],
    },
    background: {
      default: orange[100],
      paper: orange[50],
    },
  },
  typography: {
    body2: {
      fontWeight: 700,
    },
  },
});

export default theme;
