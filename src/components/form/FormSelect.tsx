import { useId } from "react";

interface Props {
  label: string;
  options: string[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export default function FormSelect({ label, options, value, onChange }: Props) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <select
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm  focus:border-blue-500"
      >
        {options.map((option, index) => (
          <option key={`${id}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
