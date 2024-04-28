import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
	return (
		<div>
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
}
