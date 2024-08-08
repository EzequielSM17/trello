function Select({
  options,
  label,
  multiple,
  required,
  name,
  id,
}: {
  options: any;
  label: string;
  multiple: boolean;
  required: boolean;
  name: string;
  id: string;
}) {
  const onMouseDown = (event: any) => {
    event.preventDefault();
    event.target.selected = !event.target.selected;
  };
  return (
    <label
      htmlFor={name}
      className="font-bold flex flex-col gap-3 items-center my-5"
    >
      <span className="text-lg">{label}</span>
      <select
        name={name}
        id={id}
        multiple={multiple}
        required={required}
        className="scroll bg-white bg-opacity-20 border  rounded-lg overflow-y-scroll px-2 focus:bg-opacity-10 w-80 h-12  items-center"
      >
        {options.map((option: any) => {
          return (
            <option
              key={option.id}
              onMouseDown={onMouseDown}
              className="border-b border-white py-2 font-semibold bg-slate-500 p-3 my-2"
              value={option.id}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export default Select;
