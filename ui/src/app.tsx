import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './app.css';
import { PrivateRoute, PublicRoute } from './components/routes';
import { AppContextProvider } from './contexts';
import { Header } from './components/layout/';
import { LoginPage  } from './pages/login-page';
import { SignupPage } from './pages/signup-page';
import { ProfilePage } from './pages/profile-page';
import { HomePage } from './pages/home-page';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <PublicRoute restricted={true} component={LoginPage} path="/login" exact />
          <PublicRoute restricted={true} component={SignupPage} path="/signup" exact />
          <PublicRoute component={HomePage} path="/" exact />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
