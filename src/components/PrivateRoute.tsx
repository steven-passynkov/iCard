import { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const { isLoggedIn } = useContext(AuthContext);

  // when logged in and trying to access login page it should be blank *** need to deside if i will keep
  //{rest.path === "/login" || rest.path === "/signup" && isLoggedIn === true ?

  return (
    <>
      {isLoggedIn !== undefined ? (
        <>
          <Route
            {...rest}
            render={(props) =>
              isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
            }
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default PrivateRoute;
