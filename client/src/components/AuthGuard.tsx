import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {isAuth} from '../services/accountService';


function RouteGuard({component: Component, /*auth,*/ ...rest}) {
    const account = useSelector(state => state.account);

    return(
        <Route 
            {...rest} 
            render={(props) => (
                isAuth(account) ? <Component {...props} /> : <Redirect to='/login' />
            )}
        />
    );
}

export default RouteGuard;






////////////////////////////////////////////////////////////////////////////////
// DEPRECATED below
////////////////////////////////////////////////////////////////////////////////

// import React, { useContext, createContext, useState } from "react";
// import {
//     BrowserRouter as Router, 
//     Route, 
//     Switch,
//     Link,
//     Redirect,
//     useHistory,
//     useLocation
//   } from 'react-router-dom';

// const fakeAuth = {
//   isAuthenticated: false,
//   signin(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

// /** For more details on
//  * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
//  * refer to: https://usehooks.com/useAuth/
//  */
// const authContext = createContext({
//   user: null
// });

// // Provider component that wraps your app and makes auth object ...
// // ... available to any child component that calls useAuth().
// export function ProvideAuth({ children }) {
//     const auth = useProvideAuth();
//     return (
//         <authContext.Provider value={auth}>
//         {children}
//         </authContext.Provider>
//     );
// }

// function useProvideAuth() {
//   const [user, setUser] = useState(null);

//   const signin = cb => {
//     return fakeAuth.signin(() => {
//       setUser("user");
//       cb();
//     });
//   };

//   const signout = cb => {
//     return fakeAuth.signout(() => {
//       setUser(null);
//       cb();
//     });
//   };

//   return {
//     user,
//     signin,
//     signout
//   };
// }


// // A wrapper for <Route> that redirects to the login
// // screen if you're not yet authenticated.
// export function PrivateRoute({ children, ...rest }) {
//   let auth = useAuth();
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         auth.user ? (children) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

// function useAuth() {
//   return useContext(authContext);
// }
