import { RouterProvider, createHashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import Orders from './pages/Orders/Orders'
import WareHouse from './pages/WareHouse/WareHouse'
import AddOrder from './pages/AddOrder/AddOrder'
import Finance from './pages/Finance/Finance'
import OrdersOfConsolidatedOrder from './pages/OrdersOfConsolidatedOrder/OrdersOfConsolidatedOrder'
import Issuance from './pages/Issuance/Issuance'
import Account from './pages/Account/Account'
import 'react-toastify/dist/ReactToastify.css'

const router = createHashRouter([
	{ path: '/', element: <Login /> },
	{ path: '/register', element: <Register /> },
	{
		path: '/profile',
		element: <Profile />,
		children: [
			{ path: 'orders', element: <Orders /> },
			{ path: 'warehouse', element: <WareHouse /> },
			{ path: 'new_order', element: <AddOrder /> },
			{ path: 'order/:id', element: <OrdersOfConsolidatedOrder /> },
			{ path: 'finance', element: <Finance /> },
			{ path: 'issuance', element: <Issuance /> },
			{ path: 'account', element: <Account /> },
		],
	},
])

const queryClient = new QueryClient()
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}

export default App
