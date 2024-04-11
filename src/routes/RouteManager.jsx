import { Routes, Route } from "react-router-dom";
import PropsTypes from "prop-types";
import MainLayout from "../layouts/MainLayout";
import { memo } from "react";
import { Page404 } from "../pages/Page404";

const RouteManager = memo(({ routes }) => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="*" element={<Page404 />} />
                {routes.map((route, index) =>
                    route.index ? (
                        <Route key={index} index element={route.component} />
                    ) : (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.component}
                        />
                    )
                )}
            </Route>
        </Routes>
    );
});

// Prop types validation
// Ref: https://www.npmjs.com/package/prop-types
RouteManager.propTypes = {
    routes: PropsTypes.array.isRequired,
};

// Display name for fast refresh using memo
RouteManager.displayName = "RouteManager";

export default RouteManager;
