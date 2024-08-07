function ToDo({ todo, resetList }: { todo: ToDo; resetList: Function }) {
  function onDragStart(event: any) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }
  async function onDragEnd(event: any) {
    resetList(todo.state.toString(), resetList);
  }

  return (
    <article
      className="w-full rounded-xl bg-gray-700 p-4 cursor-pointer overflow-hidden my-2 h-44 flex flex-col justify-items-start items-start"
      id={todo.id.toString()}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable
    >
      <h4 className="text-xl font-bold my-3">{todo.title}</h4>
      <p>{todo.description}</p>
      <div className="flex justify-between items-center mt-7 w-full">
        <span className="border border-white rounded-2xl p-1 px-4 font-bold">
          {todo.date}
        </span>
        <img
          src="/user.svg"
          className="border border-white rounded-full p-1"
        ></img>
      </div>
    </article>
  );
}

export default ToDo;
