import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './app.css';
import { PrivateRoute, PublicRoute } from './components/routes';
import { AppContextProvider } from './contexts';
import {
  Header,
  Footer
} from './components/layout/';
import {
  LoginPage,
  SignupPage,
  ProfilePage,
  HomePage,
  SettingsPage,
  ForgotPasswordPage,
} from './pages';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <PublicRoute component={HomePage} path="/" exact />
          <PublicRoute component={ForgotPasswordPage} path="/forgot-password/:token?" exact />
          {/* Html Routes - for nilesh */}
          <PrivateRoute component={SettingsPage} path="/settings/:page?" exact />
        </Switch>
        <Footer />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
