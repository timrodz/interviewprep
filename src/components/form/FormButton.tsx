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
      className="rounded-lg border-2 border-blue-500 bg-blue-500 px-4 py-2 text-white hover:border-blue-600 hover:bg-blue-600 hover:underline"
    >
      {label}
    </button>
  );
}
