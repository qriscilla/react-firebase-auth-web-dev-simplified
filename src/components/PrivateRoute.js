import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// This private route is basically just a wrappeer around the current route.
// It takees in all the props via ...res as if it would as a normal route would

const PrivateRoute = ({ component: Component, ...rest}) => {
    const { currentUser } = useAuth();

    return (
        <Route 
            {...rest} 
            render={props => {
                return currentUser 
                    ? <Component {...props} /> 
                    : <Redirect to='/login' />
            }}>
        </Route>
    )
}

export default PrivateRoute;