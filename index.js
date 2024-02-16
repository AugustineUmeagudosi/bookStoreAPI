import express, { json, urlencoded } from 'express';
import 'dotenv/config';

// Bootstrap express
import expressConfig from './config/express';

const port = process.env.PORT || 8080;
const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

expressConfig(app);

app.listen(port);
logger.info(`Application started on port ${port}`);

export default app;
