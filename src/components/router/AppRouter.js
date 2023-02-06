import React from 'react';
import {Route, Navigate, Routes} from 'react-router-dom'
import {privateRoutes, publicRoutes} from "../../routes";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../utils/auth";

const AppRouter = () => {

    const [user,loading] = useAuthState(auth)

    return user ? (
        <Routes>
            {privateRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={Component} />
            ))}
            <Route path='*' element={<Navigate to={CHAT_ROUTE} replace />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={Component} />
            ))}
            <Route path='*' element={<Navigate to={LOGIN_ROUTE} replace />} />
        </Routes>
    )
};

export default AppRouter;
