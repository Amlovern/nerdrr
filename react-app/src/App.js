import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import MainNavBar from './components/MainNavBar';
import InnerNavBar from './components/InnerNavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import SplashPage from './components/SplashPage';
import GigDetail from './components/GigDetail';
import AddGigForm from './components/AddGigForm';
import UpdateGigForm from './components/UpdateGigForm';
import AddOrderForm from './components/AddOrderForm';
import OrderConfirmation from './components/OrderConfirmation';
import OrdersPage from './components/OrdersPage';
import UpdateOrderForm from './components/UpdateOrderForm';
import AboutPage from './components/AboutPage';
import SearchResultsPage from './components/SearchResultsPage';
import MyGigsPage from './components/MyGigsPage';
import CategoryPage from './components/CategoryPage';

import { authenticate } from './store/session';

import * as categoryActions from './store/category'

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();

    // Eager load Categories
    dispatch(categoryActions.getAllCategoriesThunk()).catch((res) => console.log(res));
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <MainNavBar />
      <InnerNavBar />
      <Switch>
        <Route path='/about' exact={true}>
          <AboutPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/orders' exact={true} >
          <OrdersPage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/my-gigs' exact={true}>
          <MyGigsPage />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <ProtectedRoute path='/gigs/new' exact={true} >
          <AddGigForm />
        </ProtectedRoute>
        <ProtectedRoute path='/gigs/:gigId/update' exact={true}>
          <UpdateGigForm />
        </ProtectedRoute>
        <ProtectedRoute path='/gigs/:gigId/new-order' exact={true}>
          <AddOrderForm />
        </ProtectedRoute>
        <Route path='/gigs/:gigId' >
          <GigDetail />
        </Route>
        <ProtectedRoute path='/orders/:orderId' exact={true}>
          <OrderConfirmation />
        </ProtectedRoute>
        <ProtectedRoute path='/orders/:orderId/update' exact={true}>
          <UpdateOrderForm />
        </ProtectedRoute>
        <Route path='/search/:query' >
          <SearchResultsPage />
        </Route>
        <Route path='/category/:categoryName' >
          <CategoryPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
