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
import AddPatient from "../pages/AddPatient";
import AddAppointment from "../pages/AddAppointment";
import EditAppointment from "../pages/EditAppointment";
import Equipment from "../pages/Equipment";
import AddEquipment from "../pages/AddEquipment";
import EquipmentInfo from "../pages/EquipmentInfo";
import Medicines from "../pages/Medicines";
import AddMedicine from "../pages/AddMedicine";
import MedicineInfo from "../pages/MedicineInfo";
import DoctorInfo from "../pages/DoctorInfo";
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
        path: "add-patient",
        component: <AddPatient />,
    },
    {
        path: "add-appointment/:id",
        component: <AddAppointment />,
    },
    {
        path: "edit-appointment/:pid/:id",
        component: <EditAppointment />,
    },
    {
        path: "equipments",
        component: <Equipment />,
    },
    {
        path: "add-equipment",
        component: <AddEquipment />,
    },
    {
        path: "equipments/:id",
        component: <EquipmentInfo />,
    },
    {
        path: "medicines",
        component: <Medicines />,
    },
    {
        path: "add-medicine",
        component: <AddMedicine />,
    },
    {
        path: "medicines/:id",
        component: <MedicineInfo />,
    },
    {
        path: "doctors",
        component: <Doctors />,
    },
    {
        path: "doctors/:id",
        component: <DoctorInfo />,
    },
];
