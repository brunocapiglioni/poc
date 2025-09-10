import express from 'express'
import { PrismaClient } from '@prisma/client'
import { userRouter } from "./user/user.routes.js"
import { taskRouter } from "./task/task.routes.js"
import { loggerMiddleware } from './middleware/logger.middleware'

const app = express()

app.use(loggerMiddleware)

app.use(express.json())

app.use('/api', userRouter)
app.use('/api', taskRouter)

app.listen(3000, () => {
  console.log('Servidor andando')
})
