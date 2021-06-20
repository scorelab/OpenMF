import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';


// Custom material ui theme for this application
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#264d2c",
            light: "#36623c",
            extraLight: "#2b7935"
        },
        secondary: {
            main: "#19857b"
        },
        text: {
            main: "#fff"
        },
        error: {
            main: red.A700
        },
        background: {
            default: "#fff"
        }
    },
    spacing: 10
})

export default theme