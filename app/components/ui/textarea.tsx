import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const textareaVariants = cva(
  "flex w-full min-h-[70px] font-medium rounded-lg shadow-sm border bg-transparent px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none placeholder:text-muted-foreground placeholder:font-medium disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30",
        destructive:
          "bg-red-100/50 border-red-500 focus:border-red-500 focus-visible:ring-red-500/30",
        ghost:
          "border-transparent border-b-border rounded-none outline-none focus:border-b-primary p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
