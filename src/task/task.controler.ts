import type { Request, Response, NextFunction } from 'express'
import { Task } from './task.entity'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function sanitizeTaskInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    title: req.body.title,
    description: req.body.description,
    idUser: req.body.idUser,
  }
  //more checks here
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const tasks = await prisma.task.findMany()
    res.status(200).json({ message: 'found all tasks', data: tasks })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(req.params.id)
      },
      include: {
        user: true
      }
    })
    res.status(200).json({ message: 'found task', data: task })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const task = await prisma.task.create({
      data: req.body
    })
    res.status(201).json({ message: 'task created', data: task })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const taskToUpdate = await prisma.task.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
      include: {
        user: true
      },
    })
    res
      .status(200)
      .json({ message: 'task updated', data: taskToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const task = await prisma.task.delete({
      where: {
        id: Number(req.params.id),
      }
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeTaskInput, findAll, findOne, add, update, remove }