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
          <PrivateRoute component={HomePage} path="/" exact />
          {/* Html Routes - for nilesh */}
          <PublicRoute component={SettingsPage} path="/settings" exact />
        </Switch>
        <Footer />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
