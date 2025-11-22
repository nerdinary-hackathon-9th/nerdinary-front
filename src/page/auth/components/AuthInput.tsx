interface AuthInputProps {
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthInput = ({
  label,
  placeholder,
  value,
  type = 'text',
  error,
  onChange,
}: AuthInputProps) => {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border rounded-md p-3 mt-1"
      />
      {error && <p className="text-xs text-red-500 mt-1 ml-2">{error}</p>}
    </div>
  );
};
