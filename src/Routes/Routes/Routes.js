import BillingPage from "../../components/BillingPage/BillingPage";
import Login from "../../components/Share/Login/Login";
import Register from "../../components/Share/Register/Register";

const { createBrowserRouter } = require("react-router-dom");
const { default: Mian } = require("../../components/Layout/Mian/Mian");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Mian></Mian>,
        children: [
            {
                path: '/',
                element: <Register></Register>
            },
            {
                path: '/billingpage',
                element: <BillingPage></BillingPage>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])

export default router;