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
  SettingsPage
} from './pages';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <PublicRoute restricted={true} component={LoginPage} path="/login" exact />
          <PublicRoute restricted={true} component={SignupPage} path="/signup" exact />
          <PublicRoute component={HomePage} path="/" exact />
          <PrivateRoute component={ProfilePage} path="/" exact />
          <PublicRoute component={SettingsPage} path="/settings" exact />
        </Switch>
        <Footer />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
