import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppLayout from './components/AppLayout.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import Blog from './pages/Blog';
import HomePage from './pages/HomePage';
import Publish from './pages/Publish';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { queryClient } from './utils/helperFn';

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={true} buttonPosition='bottom-left' />
				<BrowserRouter>
					<Toaster />
					<Routes>
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<HomePage />} />
							<Route path='/publish' element={<Publish />} />
							<Route path='/blog/:id' element={<Blog />} />
						</Route>
						<Route path='/login' element={<Signin />} />
						<Route path='/signup' element={<Signup />} />
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</>
	);
}

export default App;
