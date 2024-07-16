import { RouterProvider, createHashRouter } from 'react-router-dom';
import Login from './pages/Login/Login';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Orders from './pages/Orders/Orders';
import WareHouse from './pages/WareHouse/WareHouse';
import AddOrder from './pages/AddOrder/AddOrder';
import OrdersOfConsolidatedOrder from './pages/OrdersOfConsolidatedOrder/OrdersOfConsolidatedOrder';
import 'react-toastify/dist/ReactToastify.css';

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
			{ path: 'finance', element: <h1>Заказы</h1> },
			{ path: 'subscribes', element: <h1>Подписки</h1> },
		],
	},
]);

const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
