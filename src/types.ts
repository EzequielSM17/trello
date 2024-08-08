interface ToDo {
  title: string;
  description: string;
  img: string | null;
  id: number | null;
  state: number;
  type: number;
  deadline: string;
  people: string[] | null;
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
