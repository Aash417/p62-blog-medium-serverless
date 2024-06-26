import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { bookmarkRouter } from './routes/bookmark.route';
import { likeRouter } from './routes/like.routes';
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
			'https://p62-blog-medium.vercel.app',
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
app.route('/api/v1/like', likeRouter);
app.route('/api/v1/bookmark', bookmarkRouter);


export default app;
