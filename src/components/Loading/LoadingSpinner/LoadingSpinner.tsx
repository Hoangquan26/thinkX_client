// components/ui/Loading.tsx
import { Loader2 } from "lucide-react"
import React from "react"
import { cn } from "@/lib/utils"

interface LoadingProps {
  caption?: string
  className?: string
  fullScreen?: boolean
}

const LoadingSpinner = ({ caption = "Đang tải dữ liệu...", className, fullScreen }: LoadingProps) => {
  const Wrapper = fullScreen ? "div" : React.Fragment

  return (
    <Wrapper
      {...(fullScreen && {
        className:
          "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm",
      })}
    >
      <div className={cn("flex flex-col items-center space-y-2", className)}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        {caption && <p className="text-sm text-muted-foreground">{caption}</p>}
      </div>
    </Wrapper>
  )
}

export default LoadingSpinner
