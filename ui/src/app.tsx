import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './app.css';
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
} from './pages';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <AppContainer>
            <Switch>
              <PublicRoute component={HomePage} path="/" exact />
              <PublicRoute restricted  component={ForgotPasswordPage} path="/forgot-password/:token?" exact />
              {/* Html Routes - for nilesh */}
              <PrivateRoute component={SettingsPage} path="/settings/:page?" exact />
              <PrivateRoute component={ProfilePage} path="/profile" exact />
            </Switch>
        </AppContainer>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
