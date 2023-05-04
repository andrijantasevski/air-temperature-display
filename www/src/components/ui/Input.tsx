import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const input = cva(["bg-transparent", "border", "rounded-lg", "shadow-sm"], {
  variants: {
    intent: {
      primary: ["border-gray-300", "focus:ring-primary-400", "focus:border-primary-400"],
      error: ["text-error-600", "border-error-600", "focus:ring-error-500", "focus:border-error-500", "placeholder:text-error-600"],
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

interface Props extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof input> {
  id: string;
  children: React.ReactNode;
  type: "text" | "email" | "password" | "url" | "tel" | "date";
  errorMessage: string;
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({ id, children, fullWidth, intent, errorMessage, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="block font-medium" htmlFor={id}>
          {children}
        </label>

        {intent === "error" && <span className="text-error-500 font-medium">{errorMessage}</span>}
      </div>

      <div className="relative">
        <input ref={ref} id={id} className={input({ fullWidth, intent })} {...props} />
      </div>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
