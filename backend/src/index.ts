import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { blogRouter } from './routes/post.routes';
import { userRouter } from './routes/user.routes';

// Create the main Hono app
const app = new Hono();

app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'http://localhost:3000',
			'http://localhost:4173',
			'https://p62-blog-medium.vercel.app/',
		],
		credentials: true,
	})
);
app.get('/', (c) => {
	return c.json({
		msg: 'working',
	});
});
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);


export default app;
