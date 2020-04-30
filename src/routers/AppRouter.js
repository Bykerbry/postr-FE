import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from '../components/Header'
import FeedPage from '../components/FeedPage'
import ProfilePage from '../components/ProfilePage'
import HelpPage from '../components/HelpPage'
import LoginPage from '../components/LoginPage'
import RequireAuth from '../components/RequireAuth'
import CreateAccountPage from '../components/CreateAccountPage'


const AppRouter = () => (
    <div>
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact={true} path='/help'>
                    <HelpPage />
                </Route>
                <Route exact={true} path='/login'>
                    <LoginPage />
                </Route>
                <Route exact={true} path='/create-account'>
                    <CreateAccountPage />
                </Route>
                <RequireAuth>
                    <Route exact={true} path='/'>
                        <ProfilePage />
                    </Route>
                    <Route exact={true} path='/feed'>
                        <FeedPage />
                    </Route>
                </RequireAuth>
            </Switch>
        </BrowserRouter>
    </div>
)

export default AppRouter