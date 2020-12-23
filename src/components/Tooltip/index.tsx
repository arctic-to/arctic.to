import { useLayoutEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

interface TooltipProps {
  children: React.ReactNode
  reference: HTMLElement | SVGElement
  margin: number
}

export function Tooltip({ children, reference, margin }: TooltipProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  const referenceRect = reference.getBoundingClientRect()
  const bottom = window.innerHeight - referenceRect.y + margin
  const left = referenceRect.x - width / 2 + referenceRect.width / 2

  useLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setWidth(rect.width)
    }
  }, [])

  return (
    <div className={styles.tooltip} style={{ bottom, left }} ref={ref}>
      {children}
    </div>
  )
}
