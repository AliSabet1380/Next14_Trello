import { XCircle } from "lucide-react";

type Props = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

const FormErrors = ({ id, errors }: Props) => {
  if (!errors) return null;

  return (
    <div className="mt-2 text-xs text-rose-700" id={id}>
      {errors?.[id]?.map((error: string) => (
        <div
          className="bg-rose-700/10 flex items-center gap-2 p-2 rounded-md"
          key={error}
        >
          <XCircle className="w-4 h-4" />
          {error}
        </div>
      ))}
    </div>
  );
};
export default FormErrors;
