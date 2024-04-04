import { Hono } from 'hono';
import { blogRouter } from './routes/post.routes';
import { userRouter } from './routes/user.routes';

// Create the main Hono app
const app = new Hono();

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app;
