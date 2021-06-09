import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/HttpException";
import TodoNotFoundException from "../exception/todoNotFoundException";
import { Todo } from "../model/todo";

exports.create = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }
  const { title, description, endDate, completed } = req.body;

  const todo = Todo.createToDo({ title, description, endDate, completed });
  try {
    const data = await todo.save();
    res.status(201).send(data);
  } catch (error) {
    next(
      new HttpException(
        500,
        error.message || "Some error occurred when creating new Todo item"
      )
    );
  }
};

exports.find = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (req.params.id) {
    const id = req.params.id;

    try {
      const data = await Todo.findById(id);
      if (!data) {
        next(new TodoNotFoundException(id));
      } else {
        res.status(200).send(data);
      }
    } catch (error) {
      next(
        new HttpException(
          500,
          error.message ||
            `Some error occured when retrieving todo with id ${id}`
        )
      );
    }
  } else {
    try {
      const data = await Todo.find({});
      res.status(200).send(data);
    } catch (error) {
      next(
        new HttpException(
          500,
          error.message || `Some error occured when retrieving todos`
        )
      );
    }
  }
};

exports.update = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = request.params.id;
  const todo = request.body;
  try {
    const data = await Todo.findByIdAndUpdate(id, todo, { new: true });
    if (data) {
      response.status(200).send(data);
    } else {
      next(new TodoNotFoundException(id));
    }
  } catch (error) {
    next(
      new HttpException(
        500,
        error.message || `Some error occured when retrieving todo with id ${id}`
      )
    );
  }
};

exports.delete = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const data = await Todo.findByIdAndDelete(id);
    console.log(data);

    console.log("data");
    if (!data) {
      next(new HttpException(404, `Cannot Delete todo with id ${id}`));
    } else {
      res.status(200).send({
        message: "Todo deleted successfully!",
      });
    }
  } catch (error) {
    next(new TodoNotFoundException(id));
  }
};
