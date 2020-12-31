import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './container/home/home';
import Signin from './container/signin/signin';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isLogin } from './action/auth_Action';
import PrivateRoute from './Hoc/PrivateRoute';
import Signup from './container/signup/signup';
import Category from './container/category/category';
import { initialData } from './action/initialdata';
import Product from './container/product/product';
function App() {
  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(isLogin());
    dispatch(initialData());
  }, [])
  



  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/product" component={Product} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    
    </div>
  );
}

export default App;
