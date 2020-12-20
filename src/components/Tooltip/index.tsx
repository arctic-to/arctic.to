import styles from './index.module.scss'

interface TooltipProps {
  children: React.ReactNode
  trigger: HTMLElement | SVGElement
  margin: number
}

const WIDTH = 120

export function Tooltip({ children, trigger, margin }: TooltipProps) {
  const rect = trigger.getBoundingClientRect()
  const bottom = window.innerHeight - rect.y + margin
  const left = rect.x - WIDTH / 2 + rect.width / 2

  return (
    <div className={styles.tooltip} style={{ bottom, left, width: WIDTH }}>
      {children}
    </div>
  )
}
