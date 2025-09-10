import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRoutes from "./user/user.routes.js";
import taskRoutes from "./task/task.routes.js";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', taskRoutes);
app.listen(3000, () => {
    console.log('Servidor andando');
});
//# sourceMappingURL=app.js.map