/* 
ROUTE CONFIGURATION 
- path: The URL path 
- component: The component to render when the path is matched
- index: If true, the path is the index route.
No * path is needed.
*/

import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/Dashboard";
import Staffs from "../pages/Staffs";
import Login from "../pages/Login";
import PatientInfo from "../pages/PatientInfo";
import Patients from "../pages/Patients";
import Doctors from "../pages/Doctors";

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
        path: "staffs",
        component: <Staffs />,
    },
    {
        path: "patients/:id",
        component: <PatientInfo />,
    },
    {
        path: "login",
        component: <Login />,
        customLayout: <AuthLayout />,
    },
    {
        path: "doctors",
        component: <Doctors />,
    },
];
