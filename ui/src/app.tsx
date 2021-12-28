import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import './app.scss';
import { PrivateRoute, PublicRoute } from './components/routes';
import { AppContextProvider } from './contexts';
import {
  AppContainer,
} from './components';
import {
  HomePage,
  SettingsPage,
  ForgotPasswordPage,
  ProfilePage,
  CreatePostPage,
  AdDetailPage,
  ÇategoryPage,
  VerifyEmailPage,
} from './pages';
import { theme } from './theme';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppContainer>
            <Switch>
              <PublicRoute component={HomePage} path="/" exact />
              <PublicRoute component={ÇategoryPage} path="/category-listing" exact />

              <PublicRoute restricted component={HomePage} path="/login" exact />
              <PublicRoute restricted component={ForgotPasswordPage} path="/forgot-password/:token?" exact />
              <PublicRoute component={VerifyEmailPage} path="/email/verify" exact />
              <PrivateRoute component={SettingsPage} path="/settings/:page?" exact />
              <PrivateRoute component={ProfilePage} path="/profile" exact />
              <PrivateRoute component={CreatePostPage} path="/create-post" exact />
              <PrivateRoute component={AdDetailPage} path="/ad-detail" exact />
              {/* Html Routes - for nilesh */}
            </Switch>
          </AppContainer>
        </ThemeProvider>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
