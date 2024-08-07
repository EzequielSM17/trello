interface ToDo {
  title: string;
  description: string;
  img: string | null;
  id: number;
  state: number;
  date: string;
  people: string[];
}

interface ToDoState {
  name: string;
  id: number;
}
interface User {
  email: string;
  id: number | null;
}

interface MyNotification {
  type: string;
  text: string;
}

type TodoAction = { type: "UPDATE_TODO"; payload: number };
interface ToDoContext {
  toDo: ToDo | null;
  updateToDo: (id: number) => void;
}
