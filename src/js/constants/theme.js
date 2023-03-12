import { createTheme } from '@mui/material';
import lightVariables from '../../stylesheets/imports/_variable-light.scss';
import darkVariables from '../../stylesheets/imports/_variable-dark.scss';
// import colorVariables from '../../stylesheets/imports/_variable.scss';

export default (dark) =>
  createTheme({
    palette: {
      primary: {
        main: dark ? darkVariables.primaryColor : lightVariables.primaryColor,
      },
      secondary: {
        main: dark
          ? darkVariables.secondaryColor
          : lightVariables.secondaryColor,
      },
      text: {
        primary: dark
          ? darkVariables.primaryColor
          : lightVariables.primaryColor,
        secondary: dark
          ? darkVariables.secondaryColor
          : lightVariables.secondaryColor,
        tertiary: dark
          ? darkVariables.tertiaryColor
          : lightVariables.tertiaryColor,
      },
      background: {
        default: dark
          ? darkVariables.tertiaryColor
          : lightVariables.tertiaryColor,
        paper: dark ? darkVariables.primaryColor : lightVariables.primaryColor,
      },
    },
    components: {},
  });

// export default (dark) =>
//   createTheme({
//     palette: {
//       primary: {
//         main: dark ? darkVariables.primaryColor : lightVariables.primaryColor,
//       },
//       secondary: {
//         main: dark
//           ? darkVariables.secondaryColor
//           : lightVariables.secondaryColor,
//       },
//       action: {
//         disabled: dark
//           ? darkVariables.secondaryColor
//           : lightVariables.secondaryColor,
//       },
//       text: {
//         primary: dark
//           ? darkVariables.primaryColor
//           : lightVariables.primaryColor,
//         secondary: dark
//           ? darkVariables.primaryColor
//           : lightVariables.primaryColor,
//         disabled: dark
//           ? darkVariables.secondaryColor
//           : lightVariables.secondaryColor,
//       },
//       background: {
//         default: dark
//           ? darkVariables.tertiaryColor
//           : lightVariables.tertiaryColor,
//       },
//     },
//     components: {
//       MuiPaper: {
//         styleOverrides: {
//           root: {
//             background: dark
//               ? darkVariables.tertiaryColor
//               : lightVariables.tertiaryColor,
//           },
//         },
//       },
//       MuiListItemIcon: {
//         styleOverrides: {
//           root: {
//             color: dark
//               ? darkVariables.primaryColor
//               : lightVariables.primaryColor,
//           },
//         },
//       },
//       MuiSelect: {
//         styleOverrides: {
//           iconStandard: {
//             color: dark
//               ? darkVariables.primaryColor
//               : lightVariables.primaryColor,
//           },
//         },
//       },
//       MuiList: {
//         styleOverrides: {
//           root: {
//             background: dark
//               ? darkVariables.tertiaryColor
//               : lightVariables.tertiaryColor,
//             color: dark
//               ? darkVariables.primaryColor
//               : lightVariables.primaryColor,
//           },
//         },
//       },
//       MuiTableSortLabel: {
//         styleOverrides: {
//           icon: {
//             color: dark
//               ? darkVariables.secondaryColor
//               : lightVariables.secondaryColor,
//           },
//         },
//       },
//       MuiIconButton: {
//         styleOverrides: {
//           root: {
//             ':hover': {
//               background: `${
//                 dark ? darkVariables.primaryColor : lightVariables.primaryColor
//               }19`,
//               color: dark
//                 ? darkVariables.primaryColor
//                 : lightVariables.primaryColor,
//             },
//             color: dark
//               ? darkVariables.orangeColor
//               : lightVariables.orangeColor,
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             ':hover': {
//               background: `${
//                 dark ? darkVariables.primaryColor : lightVariables.primaryColor
//               }19`,
//               color: dark
//                 ? darkVariables.primaryColor
//                 : lightVariables.primaryColor,
//             },
//           },
//         },
//       },
//     },
//   });
