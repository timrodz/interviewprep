interface Props {
  label: string;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function FormButton({ label, onClick, disabled }: Props) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className="rounded border-2 border-indigo-500 bg-indigo-500 px-4 py-2 text-white hover:underline"
    >
      {label}
    </button>
  );
}
