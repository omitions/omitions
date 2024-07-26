import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { AnchorOrLink } from "~/utils/misc"
import Loading from "../loading"
import { useNavigate } from "@remix-run/react"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap font-medium tracking-tight ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-80",
  {
    variants: {
      variant: {
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline",

        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:border-primary hover:ring-2 hover:ring-primary/30",
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:ring-2 hover:ring-ring",
        ghost: 'hover:bg-background focus-visible:bg-primary/20',
      },
      size: {
        default: "h-10 px-5 py-3 rounded-xl text-sm",
        sm: "h-10 md:h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-2xl px-8",
        icon: "h-9 w-9 md:h-8 md:w-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean,
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? <Loading /> : props.children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

/**
 * A button that looks like a link
 */
const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithRef<typeof AnchorOrLink> & ButtonProps & { delay?: number }
>(function ButtonLink({ delay = 0, ...props }, ref) {
  const { variant, size, disabled, href } = props;

  const navigate = useNavigate();
  const redirectTo = async () => {
    await wait(delay);
    if (href) navigate(href);
  }

  const Comp = delay ? Slot : AnchorOrLink
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={props.className}
    >
      <Comp
        ref={ref}
        disabled={disabled}
        onClick={() => delay ? redirectTo() : null}
        {...props}
      >
        {props.children}
      </Comp>
    </Button>
  )
})
ButtonLink.displayName = 'ButtonLink'

function wait(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export { Button, ButtonLink, buttonVariants }
