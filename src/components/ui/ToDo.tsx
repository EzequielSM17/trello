import { deleteToDo } from "../../utils/api";

function ToDo({ todo, resetList }: { todo: any; resetList: Function }) {
  function onDragStart(event: any) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }
  async function onDragEnd(event: any) {
    resetList(todo.state.toString(), resetList);
  }

  async function onDelete() {
    const data = await deleteToDo(todo.id);
    resetList(todo.state.toString(), resetList);
  }

  return (
    <article
      className="w-full rounded-xl bg-gray-700 p-4 cursor-pointer overflow-hidden my-2 min-h-44 flex flex-col justify-items-start items-start"
      id={todo ? todo.id.toString() : "1"}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable
    >
      <div className="flex justify-between items-center w-full">
        <h4 className="text-xl font-bold my-3">{todo.title}</h4>
        <div className="flex flex-row items-center gap-3">
          <a href={"/update/" + todo.id.toString()}>
            <img src="/edit.svg" className=""></img>
          </a>
          <button className="w-8 h-8" onClick={onDelete}>
            <img src="/trash.svg" className=""></img>
          </button>
        </div>
      </div>

      <p className="text-ellipsis overflow-hidden h-auto text-lg min-h-16 mt-2">
        {todo.description}
      </p>
      <div className="flex justify-between items-center mt-7 w-full">
        <div>
          <span className="border border-white rounded-2xl p-1 px-4 font-bold mr-4">
            {todo?.deadline}
          </span>
          <span
            className={
              "border  rounded-2xl p-1 px-4 font-bold " + todo?.type.priority
            }
          >
            {todo?.type.name}
          </span>
        </div>

        <img
          src="/user.svg"
          className="border border-white rounded-full p-1"
        ></img>
      </div>
    </article>
  );
}

export default ToDo;
