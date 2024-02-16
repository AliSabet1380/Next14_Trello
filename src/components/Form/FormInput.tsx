"use client";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormErrors from "./FormErrors";

type Props = {
  placeholder?: string;
  type?: string;
  id: string;
  requried?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
  label?: string;
  onBlur?: () => void;
  errors?: Record<string, string[] | undefined>;
};

const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      placeholder,
      className,
      defaultValue = "",
      disabled,
      requried,
      type = "text",
      label,
      errors,
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-800"
            >
              {label}
            </Label>
          )}
          <Input
            onBlur={onBlur}
            ref={ref}
            type={type}
            className={cn("text-sm px-2 py-1 h-10", className)}
            id={id}
            name={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
            required={requried}
            disabled={pending || disabled}
          />
          <FormErrors id={id} errors={errors} />
        </div>
      </div>
    );
  }
);

FormInput.displayName = "FromInput";

export default FormInput;
