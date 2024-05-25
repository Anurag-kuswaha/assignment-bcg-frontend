import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import WebRoutes from './Router';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
function App() {
  const themeConfiguration = () => {
    return {
      colorScheme: 'light',
      colors: {
        primary: ['#00D095'],
        secondary: ['#1D5E6D'],
        tertiary: ['#E1F4F5'],
        error: ['#ED2424'],
        background: [
          '#E3F0ED',
          '#EDF2F3',
          '#F8F8FA',
          '#FFE9E9',
          '#D5F3B7',
          '#F7F9FA',
        ],
        outline: ['#B3E7D8', '#BCCACD', '#D9E2E4', '#FCD9D9'],
        text: ['#2C2C30', '#616161', '#E6E6E6', '#000000', '#84AABA', '#FC5858', '#64B216','F5DBDB'],
        red: [
          '#FFF5F5',
          '#FFE3E3',
          '#FFC9C9',
          '#FFA8A8',
          '#FF8787',
          '#FF6B6B',
          '#ED2424',
          '#F03E3E',
          ' #E03131',
          '#C92A2A',
        ],
        white: ['#ffffff'],
        disabledBtn: ['#9C9C9C', '#DBDBDB'],
      },
  
      shadows: {
        md: '1px 1px 3px rgba(0, 0, 0, .25)',
        xl: '5px 5px 3px rgba(0, 0, 0, .25)',
      },
  
      headings: {
        fontFamily: 'Roboto, sans-serif, Poppins',
        sizes: {
          h1: { fontSize: '2rem' },
        },
      },
      theme: {
        components: {
          InputWrapper: {
            styles: (theme) => ({
              label: {
                backgroundColor: '#D6EBF0',
              },
            }),
          },
  
          Input: {
            styles: (theme) => ({
              input: {
                background: '0 0',
                borderBottom: '1px solid black',
                padding: '0.6rem 0',
                color: '#fff',
              },
            }),
          },
        },
      },
    };
  };
  return (
    <MantineProvider  withGlobalStyles
    withNormalizeCSS theme={themeConfiguration()}>
   
  
    <div className="App">
      <BrowserRouter>
      <Notifications/>
        <WebRoutes/>
      </BrowserRouter>
    </div>
    </MantineProvider>
  );
}

export default App;
