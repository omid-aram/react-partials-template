import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
// jss
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { faIR } from '@material-ui/core/locale';



const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


export default function ThemeProvider({ theme, children }) {

  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        {children}
      </StylesProvider>
    </MuiThemeProvider>
  );
}


//this is a development time theme. the main them come from main project
export const devTheme = createMuiTheme(
  {
    direction: "rtl",
    typography: {
      fontFamily: ["IRANSans"].join(",")
    },

    palette: {
      contrastThreshold: 3,
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#5d78ff"
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        // light: will be calculated from palette.primary.main,
        main: "#0abb87",
        // dark: will be calculated from palette.primary.main,
        contrastText: "#ffffff"
      },
      error: {
        // light: will be calculated from palette.primary.main,
        main: "#fd397a"
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      }
    },

    /**
     * @see https://material-ui.com/customization/globals/#default-props
     */
    props: {
      // Name of the component ⚛️
      MuiButtonBase: {
        // The properties to apply
        disableRipple: true // No more ripple, on the whole application 💣!
      },
      // Set default elevation to 1 for popovers.
      MuiPopover: {
        elevation: 1
      }
    },
    overrides: {

      MuiTableCell: {
        sizeSmall: {
          padding: "7px 6px 7px 5px"
        }
      }, MuiTablePagination: {
        toolbar: {
          minHeight: '43px'
        },
        spacer: {
          flex: "1 1 0%"
        }
      }
    }
  }, faIR
);