/* 
ROUTE CONFIGURATION 
- path: The URL path 
- component: The component to render when the path is matched
- index: If true, the path is the index route.
No * path is needed.
*/

import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";

export const routeConfig = [
    {
        index: true,
        component: <Dashboard />,
    },
    {
        path: "patients",
        component: <Patients />,
    },
];
