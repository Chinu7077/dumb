import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-lg font-bold transition-all duration-200 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#fbca1f] text-black border-2 border-black shadow-lg hover:translate-y-[-2px] hover:shadow-xl active:translate-y-[2px] active:shadow-md",
        destructive:
          "bg-red-500 text-white border-2 border-black shadow-lg hover:bg-red-600 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-[2px] active:shadow-md",
        outline:
          "border-2 border-black bg-transparent text-black shadow-md hover:bg-gray-200 hover:translate-y-[-2px] hover:shadow-lg active:translate-y-[2px] active:shadow-md",
        secondary:
          "bg-gray-800 text-white border-2 border-black shadow-lg hover:bg-gray-700 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-[2px] active:shadow-md",
        ghost:
          "bg-transparent text-black hover:bg-gray-100 hover:translate-y-[-2px] hover:shadow-md active:translate-y-[2px] active:shadow-sm",
        link: "text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-md px-4",
        lg: "h-14 rounded-lg px-10",
        icon: "h-12 w-12",
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

export { Button, buttonVariants }
