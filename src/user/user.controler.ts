import type { Request, Response, NextFunction } from 'express'
import { User } from './user.entity'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function sanitizeUserInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    email: req.body.email,
    name: req.body.name,
    tasks: req.body.tasks,
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
    const user = await prisma.user.findMany()
    res.status(200).json({ message: 'found all users', data: user })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id)
      },
      include: {
        tasks: true
      }
    })
    res.status(200).json({ message: 'found user', data: user })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const user = await prisma.user.create({
      data: req.body
    })
    res.status(201).json({ message: 'user created', data: user })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const userToUpdate = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
      include: {
        tasks: true
      },
    })
    res
      .status(200)
      .json({ message: 'user updated', data: userToUpdate })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      }
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeUserInput, findAll, findOne, add, update, remove }