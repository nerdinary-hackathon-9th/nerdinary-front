interface AuthInputProps {
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  error?: string | null;
  success?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  className?: string;
  renderButton?: () => React.ReactNode;
}

export const AuthInput = ({
  label,
  placeholder,
  value,
  type = 'text',
  error,
  success,
  onChange,
  maxLength,
  className = '',
  renderButton,
}: AuthInputProps) => {
  const getBorderColor = () => {
    if (error) return 'border-red-500';
    if (success) return 'border-green-500';
    return 'border-gray-300';
  };

  return (
    <div>
      {label && <label className="block text-base text-gray-700 mb-3">{label}</label>}
      <div className={renderButton ? 'flex gap-2' : ''}>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxLength}
          className={`${renderButton ? 'flex-1' : 'w-full'} border ${getBorderColor()} rounded-lg px-4 py-3.5 text-base placeholder:text-gray-400 ${className}`}
        />
        {renderButton && renderButton()}
      </div>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      {success && <p className="text-sm text-green-600 mt-2">{success}</p>}
    </div>
  );
};
