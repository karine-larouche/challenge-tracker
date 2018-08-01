import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import { mix } from './utils/colorUtils';

const primary = colors.lightBlue[900];
const background = mix(primary, colors.grey[100], 3);
const paperSecondary = mix(primary, colors.grey[100], 10);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: colors.deepOrange[700],
    },
    background: {
      default: background,
      paperSecondary,
    },
  },
  typography: {
    body2: {
      fontWeight: 700,
    },
  },
});

export default theme;
