import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import { mix } from './utils/colorUtils';

const white = '#ffffff';
const black = '#000000';

const primary = colors.lightBlue[900];

const theme = createMuiTheme({
  palette: {
    primary: {
      veryLight: mix(white, primary, 70),
      light: mix(white, primary, 35),
      main: primary,
      dark: mix(black, primary, 30),
    },
    secondary: {
      main: colors.deepOrange[700],
    },
    background: {
      default: mix(primary, colors.grey[100], 3),
    },
  },
  typography: {
    body2: {
      fontWeight: 700,
    },
  },
  spacing: {
    grid: 24,
  },
});

export default theme;
