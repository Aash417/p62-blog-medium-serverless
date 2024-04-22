import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Applayout from './components/Applayout';
import Blogs from './pages/Blogs';
import Publish from './pages/Publish';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000,
		},
	},
});

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						{/* <Route path='/' element={<Test />} /> */}

						<Route element={<Applayout />}>
							<Route index element={<Blogs />} />
							<Route path='/publish' element={<Publish />} />
							{/* Route path='/signup' element={<Signup />} />
					<Route path='/signin' element={<Signin />} />
					<Route path='/blog/:id' element={<Blog />} /> */}
							{/* <Route path='/blogs' element={<Blogs />} /> */}
						</Route>
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</>
	);
}

export default App;
