import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import { mix } from 'colour-utils';

const white = '#ffffff';
const black = '#000000';

const primary = colors.lightBlue[900];

const theme = createMuiTheme({
  palette: {
    primary: {
      veryLight: mix(white, primary, 0.3),
      light: mix(white, primary, 0.65),
      main: primary,
      dark: mix(black, primary, 0.7),
    },
    secondary: {
      main: colors.yellow[700],
    },
    background: {
      paper: white,
      default: mix(primary, colors.grey[100], 0.97),
    },
  },
  typography: {
    useNextVariants: true,
    subtitle2: {
      fontWeight: 700,
    },
  },
  spacing: {
    grid: 24,
  },
});

export default theme;
