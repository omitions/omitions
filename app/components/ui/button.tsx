import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"
import { AnchorOrLink } from "~/utils/misc"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap font-bold tracking-tight ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-30",
  {
    variants: {
      variant: {
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline",

        outline: "border border-input bg-background shadow-sm hover:border-primary hover:ring-2 hover:ring-primary/30",
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        ghost: 'hover:bg-secondary focus-visible:bg-secondary',
      },
      size: {
        default: "h-10 px-4 py-3 rounded-lg",
        sm: "h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8",
        icon: "h-8 w-8 rounded-full",
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
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

/**
 * A button that looks like a link
 */
const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithRef<typeof AnchorOrLink> & ButtonProps
>(function ButtonLink({ children, ...props }, ref) {
  const { variant, size, disabled } = props
  return (
    <Button asChild variant={variant} size={size} className={props.className}>
      <AnchorOrLink ref={ref} disabled={disabled} {...props}>
        {children}
      </AnchorOrLink>
    </Button>
  )
})
ButtonLink.displayName = 'ButtonLink'

export { Button, ButtonLink, buttonVariants }
