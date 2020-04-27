import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from '../components/Header'
import FeedPage from '../components/FeedPage'
import HomePage from '../components/HomePage'
import HelpPage from '../components/HelpPage'
import LoginPage from '../components/LoginPage'


const AppRouter = () => (
    <div>
        <BrowserRouter>
        <Header />
            <Switch>
                <Route exact={true} path='/'>
                    <HomePage />
                </Route>
                <Route exact={true} path='/feed'>
                    <FeedPage />
                </Route>
                <Route exact={true} path='/help'>
                    <HelpPage />
                </Route>
                <Route exact={true} path='/login'>
                    <LoginPage />
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
)

export default AppRouter