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
  ResetPasswordPage,
  ProfilePage,
  CreatePostPage,
  SavedSearchesPage,
  ProductDetailPage,
  ProductListingPage,
  VerifyEmailPage,
  ChatPage,
  PackagesPage,
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
              <PublicRoute restricted component={HomePage} path="/login" exact />
              <PublicRoute restricted component={ForgotPasswordPage} path="/forgot-password" exact />
              <PublicRoute restricted component={ResetPasswordPage} path="/password/reset" />
              <PublicRoute component={VerifyEmailPage} path="/email/verify" exact />
              <PrivateRoute component={SettingsPage} path="/settings/:page?" exact />
              <PrivateRoute component={ProfilePage} path="/profile" exact />
              <PrivateRoute component={CreatePostPage} path="/create-post" exact />
              <PrivateRoute component={SavedSearchesPage} path="/saved-search" exact />
              <PublicRoute component={ProductListingPage} path="/product-listing/:categoryId" exact />
              <PublicRoute component={ProductDetailPage} path="/product-detail/:productId/:slug" exact />
              <PrivateRoute component={ChatPage} path="/chat/:chatType/:chatId?" exact />
              {/* Html Routes - for nilesh */}
            </Switch>
          </AppContainer>
        </ThemeProvider>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
