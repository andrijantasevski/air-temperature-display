import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "react-router-dom";

const button = cva(["font-medium", "transition-colors", "shadow-sm", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2", "border", "inline-flex", "items-center"], {
  variants: {
    intent: {
      primary: ["bg-primary-600", "text-white", "hover:bg-primary-700", "focus:ring-primary-500", "border-transparent"],
      secondary: ["bg-primary-100", "text-primary-700", "hover:bg-primary-200", "focus:ring-primary-500", "border-transparent"],
      white: ["bg-white", "text-gray-700", "hover:bg-gray-50", "focus:ring-primary-500", "border-gray-300"],
      success: ["bg-success-600", "text-white", "hover:bg-success-700", "focus:ring-success-500", "border-transparent"],
      warning: ["bg-warning-400", "text-warning-900", "hover:bg-warning-500", "focus:ring-warning-400", "border-transparent"],
      error: ["bg-error-600", "text-error-50", "hover:bg-error-700", "focus:ring-error-500", "border-transparent"],
      loading: ["bg-primary-900", "text-white", "border-transparent"],
      disabled: ["bg-gray-100", "text-gray-400", "cursor-auto", "border-transparent"],
    },
    size: {
      xs: ["text-sm", "px-2.5", "py-1.5", "rounded"],
      sm: ["text-sm", "px-3", "py-2", "rounded-md", "leading-4"],
      base: ["text-sm", "px-4", "py-2", "rounded-md"],
      l: ["text-base", "px-4", "py-2", "rounded-md"],
      xl: ["text-base", "px-6", "py-3", "rounded-md"],
    },
    fullWidth: {
      true: ["w-full", "justify-center"],
    },
    withIcon: {
      leading: ["flex-row-reverse", "gap-1"],
      trailing: ["flex-row", "gap-1"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "base",
  },
});

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  href?: string;
}

export default function Button({ intent, size, fullWidth, withIcon, children, href, ...props }: Props) {
  if (href) {
    return (
      <Link to={href} className={button({ intent, size, fullWidth, withIcon })}>
        {children}
      </Link>
    );
  }

  return (
    <button className={button({ intent, size, fullWidth, withIcon })} {...props}>
      {children}
    </button>
  );
}
