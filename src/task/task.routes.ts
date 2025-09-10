import { Router } from 'express'
import { sanitizeTaskInput, findAll, findOne, add, update, remove } from './task.controler.js'

export const taskRouter = Router()

taskRouter.get('/', findAll)
taskRouter.get('/:id', findOne)
taskRouter.post('/', sanitizeTaskInput, add)
taskRouter.put('/:id', sanitizeTaskInput, update)
taskRouter.patch('/:id', sanitizeTaskInput, update)
taskRouter.delete('/:id', remove)

