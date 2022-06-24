import { Toaster } from 'react-hot-toast';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import NoInternetConnection from './components/NoInternetConnection';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <NoInternetConnection>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
        <Toaster />
      </NoInternetConnection>
    </ThemeProvider>
  );
}
