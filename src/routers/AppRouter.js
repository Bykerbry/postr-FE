import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from '../components/Header'
import FeedPage from '../components/FeedPage'
import ProfilePage from '../components/ProfilePage'
import HelpPage from '../components/HelpPage'
import LoginPage from '../components/LoginPage'
import AuthRoute from '../components/AuthRoute'
import CreateAccountPage from '../components/CreateAccountPage'


const AppRouter = () => (
    <div>
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact={true} path='/help' component={HelpPage} />
                <Route exact={true} path='/login' component={LoginPage} />
                <Route exact={true} path='/create-account' component={CreateAccountPage} />
                <AuthRoute exact={true} path='/' component={ProfilePage} />
                <AuthRoute exact={true} path='/feed' component={FeedPage} />
                <Redirect from='*' to='login' />
            </Switch>
        </BrowserRouter>
    </div>
)

export default AppRouter
