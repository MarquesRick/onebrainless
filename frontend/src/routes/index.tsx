import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../services/api';
//Suspense e Lazy serve para carregar por demanda os componentes e não tudo de uma vez..

//Magic comments - comentários para identificar ou manipular o webpackage (chunk)
const Login = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "login" */ '../pages/Login'
    ),
);

const Home = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "home" */ '../pages/Home'
    ),
);

const MakeOrder = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "makeOrder" */ '../pages/MakeOrder'
    ),
);

const MakeOrderPizzaDay = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "makeOrderPizzaDay" */ '../pages/MakeOrderPizzaDay'
    ),
);

const UserOrder = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "order" */ '../pages/UserOrder'
    ),
);

export const Routes: React.FC = () => {
  return (
    <Suspense fallback={'Loading...'}>
      <Switch>
        <Route component={Login} path="/" exact />
        <Route
          component={() => (!isLoggedIn() ? <Redirect to="/" /> : <Home />)}
          path="/home"
        />
        <Route
          component={() =>
            !isLoggedIn() ? <Redirect to="/" /> : <MakeOrder />
          }
          path="/makeOrder"
        />
        <Route
          component={() =>
            !isLoggedIn() ? <Redirect to="/" /> : <MakeOrderPizzaDay />
          }
          path="/makeOrderPizzaDay"
        />
        <Route
          component={() =>
            !isLoggedIn() ? <Redirect to="/" /> : <UserOrder />
          }
          path="/userOrder"
        />
      </Switch>
    </Suspense>
  );
};
