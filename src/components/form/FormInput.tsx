import { useId } from "react";

interface Props {
  label: string;
  description?: string;
  type: "text" | "email" | "textarea";
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function FormInput({
  label,
  description,
  type,
  value,
  onChange,
}: Props) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input
        name={id}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm  focus:border-blue-500"
      />
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}
