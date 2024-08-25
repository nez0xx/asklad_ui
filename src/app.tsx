import {createHashRouter, RouterProvider} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'


import Profile from '@pages/Profile/Profile'
import Orders from '@pages/Orders/Orders'
import WareHouse from '@pages/WareHouse/WareHouse'
import Files from '@pages/Files/Files'
import Finance from '@pages/Finance/Finance'
import OrdersOfConsolidatedOrder from '@pages/OrdersOfConsolidatedOrder/OrdersOfConsolidatedOrder'
import Account from '@pages/Account/Account'
import ResetPassword from '@pages/ResetPassword/ResetPassword'
import SuccessfulRegistration from '@pages/SuccessfulRegistration/SuccessfulRegistration'
import ConfirmEmail from '@pages/ConfirmEmail/ConfirmEmail'
import EnterEmail from '@pages/EnterEmail/EnterEmail'
import EmailSent from '@pages/EmailSent/EmailSent'
import ConfirmEmployee from '@pages/ConfirmEmployee/ConfirmEmployee'
import RegistrationEmailSent from '@pages/RegistrationEmailSent/RegistrationEmailSent'
import Landing from '@pages/Landing/Landing'
import ProtectedRoute from '@pages/ProtectedRoute/ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css'
import Login from "@pages/Login/Login";
import HamburgerProvider from "@modules/HamburgerProvider/HamburgerProvider";
import Register from "@pages/Register/Register";

const router = createHashRouter([
	{ path: '/', element: <Landing /> },
	{
		path: '/login',
		element: (
			<ProtectedRoute>
				<Login />
			</ProtectedRoute>
		),
	},
	{
		path: '/register',
		element: (
			<ProtectedRoute>
				<Register />
			</ProtectedRoute>
		),
	},
	{
		path: '/reset_password/:token',
		element: <ResetPassword />,
	},
	{
		path: '/enter_email',
		element: <EnterEmail />,
	},
	{
		path: '/email_sent',
		element: <EmailSent />,
	},
	{
		path: '/confirm_email_sent',
		element: <RegistrationEmailSent />,
	},
	{
		path: '/successful_registration',
		element: <SuccessfulRegistration />,
	},
	{
		path: '/confirm_email/:token',
		element: <ConfirmEmail />,
	},
	{
		path: '/confirm_employee/:token',
		element: <ConfirmEmployee />,
	},
	{
		path: '/profile',
		element: (
			<ProtectedRoute>
				<Profile />
			</ProtectedRoute>
		),
		children: [
			{
				path: 'orders',
				element: <Orders />,
			},
			{
				path: 'warehouse',
				element: <WareHouse />,
			},
			{
				path: 'files',
				element: <Files />,
			},
			{
				path: 'order/:id',
				element: <OrdersOfConsolidatedOrder />,
			},
			{
				path: 'finance',
				element: <Finance />,
			},
			{
				path: 'account',
				element: <Account />,
			},
		],
	},
])

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<HamburgerProvider>
				<RouterProvider router={router} />
			</HamburgerProvider>
		</QueryClientProvider>
	)
}


export default App
