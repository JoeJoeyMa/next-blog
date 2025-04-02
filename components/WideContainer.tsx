import { ReactNode } from 'react'

interface WideContainerProps {
  children: ReactNode
}

export default function WideContainer({ children }: WideContainerProps) {
  return <div className="mx-auto max-w-8xl px-4 sm:px-6 xl:px-0">{children}</div>
}