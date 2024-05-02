/* 
ROUTE CONFIGURATION 
- path: The URL path 
- component: The component to render when the path is matched
- index: If true, the path is the index route.
No * path is needed.
*/

import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import PatientInfo from "../pages/PatientInfo";
import Patients from "../pages/Patients";

export const routeConfig = [
    {
        index: true,
        path: "dashboard",
        component: <Dashboard />,
    },
    {
        path: "patients",
        component: <Patients />,
    },
    {
        path: "employees",
        component: <Employees />,
    },
    {
        path: "patients/:id",
        component: <PatientInfo />,
    },
];
