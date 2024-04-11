/* 
ROUTE CONFIGURATION 
- path: The URL path 
- component: The component to render when the path is matched
- index: If true, the path is the index route.
No * path is needed.
*/

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

export const routeConfig = [
    {
        index: true,
        component: <Dashboard />,
    },
    {
        path: "login",
        component: <Login />,
    },
];
