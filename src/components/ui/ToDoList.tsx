import {
  useCallback,
  useEffect,
  useState,
  useTransition,
  type DragEvent,
} from "react";
import ToDo from "./ToDo";
import { getToDos, updateToDo } from "../../utils/api";
import ToDoLoading from "./ToDoLoading";

function ToDoList({ state }: { state: ToDoState }) {
  const [dragClass, setDragClass] = useState("bg-gray-800");

  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      getToDos(state.id.toString(), setToDos);
    });
  }, [startTransition, getToDos]);

  const onDrop = useCallback(
    async (event: DragEvent) => {
      event.preventDefault();
      console.log("drop");
      console.log({ state });
      const id = event.dataTransfer.getData("text");
      const moveToDo = toDos.find((todo) => parseInt(id) === todo.id);
      if (!moveToDo) {
        await updateToDo(id, state.id);
        await getToDos(state.id.toString(), setToDos);
        setDragClass("bg-gray-800");
      }
    },
    [state]
  );
  const onDragOver = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      setDragClass("bg-gray-700");
    },
    [state]
  );
  const onDragEnter = () => {
    setDragClass("bg-gray-700");
  };
  const onDragLeave = () => {
    setDragClass("bg-gray-800");
  };

  async function resetList(event: any) {
    setTimeout(() => getToDos(state.id.toString(), setToDos), 50);
    console.log("end");
    console.log({ state });
  }
  return (
    <section
      className={"w-1/4 flex flex-wrap py-10 rounded-xl p-4 " + dragClass}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
    >
      <h1 className="text-center w-full font-semibold text-xl mb-8">
        {state.name}
      </h1>

      {isPending ? (
        <ToDoLoading></ToDoLoading>
      ) : (
        toDos.length > 0 &&
        toDos.map((todo) => (
          <ToDo key={todo.id} todo={todo} resetList={resetList}></ToDo>
        ))
      )}

      <a
        href="/"
        className="w-full h-32 rounded-xl border border-dashed border-gray-500 p-4 my-4 cursor-pointer overflow-hidden items-center justify-center  flex hover:scale-95 transition-all self-end"
      >
        <h4 className="text-xl font-bold my-3">Nueva tarea +</h4>
      </a>
    </section>
  );
}

export default ToDoList;
