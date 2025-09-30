import express, { Application } from 'express';
import { json } from 'body-parser';
import { setProductRoutes } from './routes/productRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(json());

setProductRoutes(app);

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});