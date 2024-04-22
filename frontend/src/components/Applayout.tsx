import { Outlet } from 'react-router-dom';
import Header from './Header';

function Applayout() {
	return (
		<div>
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default Applayout;
