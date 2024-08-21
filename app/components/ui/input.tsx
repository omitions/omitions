import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const inputVariants = cva(
  "flex h-11 w-full font-medium bg-white px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none placeholder:text-muted-foreground placeholder:font-normal disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 shadow-sm border rounded-lg",
        destructive:
          "bg-red-100/50 border-red-500 focus:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30 shadow-sm border rounded-lg",
        ghost: "border-b rounded-none outline-none focus:border-primary p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
