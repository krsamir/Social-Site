import React from "react";
import { Route, Redirect } from "react-router-dom";
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (
            window.localStorage.getItem("sid") !== undefined &&
            window.localStorage.getItem("sid") !== "" &&
            window.localStorage.getItem("sid") !== null
          ) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    </div>
  );
};

export default ProtectedRoute;
