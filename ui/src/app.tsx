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
  CreatePostPage,
  AdDetailPage
} from './pages';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <AppContainer>
<<<<<<< HEAD
          <Switch>
            <PublicRoute component={HomePage} path="/" exact />
            <PublicRoute restricted component={ForgotPasswordPage} path="/forgot-password/:token?" exact />
            <PrivateRoute component={SettingsPage} path="/settings/:page?" exact />
            <PrivateRoute component={ProfilePage} path="/profile" exact />
            <PrivateRoute component={CreatePostPage} path="/create-post" exact />
            <PrivateRoute component={AdDetailPage} path="/ad-detail" exact />
            {/* Html Routes - for nilesh */}
          </Switch>
=======
            <Switch>
              <PublicRoute component={HomePage} path="/" exact />
              <PublicRoute component={CreateAdPage} path="/create-ad-page" exact />
              <PublicRoute component={AdDetailPage} path="/ad-page" exact />
              
              
              <PublicRoute restricted  component={ForgotPasswordPage} path="/forgot-password/:token?" exact />
              {/* Html Routes - for nilesh */}
              <PrivateRoute component={SettingsPage} path="/settings/:page?" exact />
              <PrivateRoute component={ProfilePage} path="/profile" exact />
              
            </Switch>
>>>>>>> 42fea1d... Added Ad post detail page html
        </AppContainer>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
