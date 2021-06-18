import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';


// Custom material ui theme for this application
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6'
        },
        secondary: {
            main: "#19857b"
        },
        error: {
            main: red.A700
        },
        background: {
            default: "#fff"
        }
    }
})

export default theme