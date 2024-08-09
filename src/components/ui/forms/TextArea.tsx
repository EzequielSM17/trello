function TextArea({
  name,
  label,
  required,
  minLength,
  maxLength,
  className,
  value,
}: {
  name: string;
  label: string;
  required: boolean | undefined;
  minLength: number | undefined;
  maxLength: number | undefined;
  className: string | undefined | null;
  value: string | undefined;
}) {
  return (
    <label className="flex flex-col my-3 w-2/3">
      <span className="mb-2 font-bold text-lg">{label}</span>
      <textarea
        name={name}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        defaultValue={value ? value : ""}
        className={
          className
            ? className
            : " rounded-lg  bg-gray-300 bg-opacity-30 p-2 focus:bg-opacity-40 transition-all cursor-text text-lg h-44"
        }
      ></textarea>
    </label>
  );
}

export default TextArea;
