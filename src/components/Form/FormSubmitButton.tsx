"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  type?: "submit" | "button" | "reset";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  variant?:
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "default"
    | "lime";
};

const FormSubmitButton = ({
  type = "submit",
  className,
  disabled,
  children,
  variant = "default",
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type={type}
      className={cn("", className)}
      disabled={pending || disabled}
      variant={variant}
      size={"sm"}
    >
      {children}
    </Button>
  );
};
export default FormSubmitButton;
