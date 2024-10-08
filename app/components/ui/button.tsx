import { Slot } from "@radix-ui/react-slot";
import { useNavigate } from "@remix-run/react";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";
import { AnchorOrLink } from "~/utils/misc";

import Loading from "../loading";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap font-semibold border border-transparent tracking-tight ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-70",
  {
    variants: {
      variant: {
        secondary:
          "bg-primary/30 text-primary-foreground shadow-sm hover:bg-primary/40 disabled:ring-none disabled:ring-transparent border border-black",
        link: "text-primary underline-offset-4 hover:underline",

        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input/50 bg-secondary shadow-sm hover:border-foreground hover:ring-2 hover:ring-foreground/20 focus-visible:border-foreground focus-visible:ring-foreground/30 disabled:bg-red-500",
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 ring-1 ring-foreground",
        ghost: "hover:bg-secondary hover:font-bold focus-visible:bg-primary/30",
        transparent: "",
      },
      size: {
        sm: "h-10 md:h-9 rounded-full px-6 text-xs",
        lg: "h-11 px-9 rounded-full text-sm",
        icon: "h-9 w-9 md:h-8 md:w-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  tooltip?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      asChild = false,
      tooltip = "",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    if (tooltip) {
      return (
        <Tooltip disableHoverableContent delayDuration={200}>
          <TooltipTrigger asChild>
            <Comp
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              {...props}
            >
              {loading ? <Loading /> : props.children}
            </Comp>
          </TooltipTrigger>
          <TooltipContent align="center" side="bottom" sideOffset={3}>
            <p className="font-semibold">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? <Loading /> : props.children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

/**
 * A button that looks like a link
 */
const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithRef<typeof AnchorOrLink> &
    ButtonProps & { delay?: number }
>(function ButtonLink({ delay = 0, ...props }, ref) {
  const { variant, size, href, prefetch = "intent" } = props;

  const navigate = useNavigate();
  const redirectTo = async () => {
    await wait(delay);
    if (href) navigate(href);
  };

  const Comp = delay ? Slot : AnchorOrLink;
  return (
    <Button asChild variant={variant} size={size} className={props.className}>
      <Comp
        ref={ref}
        prefetch={prefetch}
        onClick={() => (delay ? redirectTo() : null)}
        href={props.href}
        {...props}
      >
        {props.children}
      </Comp>
    </Button>
  );
});
ButtonLink.displayName = "ButtonLink";

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export { Button, ButtonLink, buttonVariants };
