import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  completed: {
    type: Boolean,
    required: false,
  },
});

interface ITodo {
  title: string;
  description: string;
  endDate: Date;
  completed: Boolean;
}

interface TodoDoc extends mongoose.Document {
  title: string;
  description: string;
  endDate: Date;
  completed: Boolean;
}

interface ITodoModel extends mongoose.Model<TodoDoc> {
  createToDo(todo: ITodo): TodoDoc;
}

todoSchema.statics.createToDo = (todo: ITodo) => {
  return new Todo(todo);
};

const Todo = mongoose.model<TodoDoc, ITodoModel>("Todo", todoSchema);

export { Todo, TodoDoc };
