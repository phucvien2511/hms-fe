import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import MainLayout from "../layouts/MainLayout";
import { memo } from "react";
import { Page404 } from "../pages/Page404";

const RouteManager = memo(({ routes }) => {
    return (
        <Routes>
            {routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path="/"
                        element={route.customLayout || <MainLayout />}
                    >
                        <Route path="*" element={<Page404 />} />
                        {route.index ? (
                            <Route
                                key={index}
                                index
                                element={route.component}
                            />
                        ) : (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.component}
                            />
                        )}
                    </Route>
                );
            })}
        </Routes>
    );
});

// Prop types validation
RouteManager.propTypes = {
    routes: PropTypes.array.isRequired,
};

// Display name for fast refresh using memo
RouteManager.displayName = "RouteManager";

export default RouteManager;
