import * as d3 from 'd3'
import { useCallback, useState, useMemo } from 'react'

import { Tooltip } from '../Tooltip'
import styles from './index.module.scss'

const VIEWBOX_W = 1340
const VIEWBOX_H = 230

const CELLS_START_X = 50
const CELLS_START_Y = 40
const AXIS_GAP = 10

const CELL_SIZE = 20
const CELL_GAP = 4
const CELL_OFFSET = CELL_SIZE + CELL_GAP
const CELL_RADIUS = 4

interface Datum {
  date: Date
  data: number
}
interface CalendarGraphProps {
  data: Datum[]
  color: string
}

export function CalendarGraph({ data, color }: CalendarGraphProps) {
  const [hoveredCellData, setHoveredCellData] = useState<Datum | null>(null)
  const [tooltipReference, setTooltipReference] = useState<
    HTMLElement | SVGElement | null
  >(null)

  const maxValue = d3.max(data, (d) => d.data) ?? 0
  const calcColor = d3.interpolate('#FFFFFF', color)

  const mouseOverHandler = useCallback(
    (d: Datum) => (e: React.MouseEvent<SVGRectElement>) => {
      if (!(e.target instanceof SVGRectElement)) return
      setHoveredCellData(d)
      setTooltipReference(e.target)
    },
    [],
  )
  const handleMouseOut = useCallback(() => {
    setHoveredCellData(null)
    setTooltipReference(null)
  }, [])

  return (
    <div className={styles['calendar-graph']}>
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        fontFamily="sans-serif"
        fontSize="14"
      >
        <g transform={`translate(${CELLS_START_X}, ${CELLS_START_Y})`}>
          {/* Day of Week Axis */}
          <g textAnchor="end">
            {d3.range(7).map((i) => (
              <text
                key={i}
                x={-AXIS_GAP}
                y={CELL_OFFSET * (i + 0.5)}
                dy="0.25em"
              >
                {['Sun', '', '', 'Wed', '', '', 'Sat'][i]}
              </text>
            ))}
          </g>

          {/* Month Axis */}
          <g>
            {d3
              .timeMonths(
                d3.timeMonth(data[0].date),
                data[data.length - 1].date,
              )
              .map((month) => (
                <text
                  key={Number(month)}
                  x={
                    d3.timeSunday.count(d3.timeYear(month), month) * CELL_OFFSET
                  }
                  y={-AXIS_GAP}
                >
                  {d3.timeFormat('%b')(month)}
                </text>
              ))}
          </g>

          {/* Cells */}
          <g>
            {data.map((datum) => (
              <rect
                key={Number(datum.date)}
                fill={calcColor(datum.data / maxValue)}
                x={
                  d3.timeSunday.count(d3.timeYear(datum.date), datum.date) *
                  CELL_OFFSET
                }
                y={datum.date.getDay() * CELL_OFFSET}
                width={CELL_SIZE}
                height={CELL_SIZE}
                rx={CELL_RADIUS}
                ry={CELL_RADIUS}
                onMouseOver={mouseOverHandler(datum)}
                onMouseOut={handleMouseOut}
              ></rect>
            ))}
          </g>
        </g>
      </svg>
      {tooltipReference && (
        <Tooltip reference={tooltipReference} margin={10}>
          <div>{hoveredCellData?.data} activities</div>
          <div>on {hoveredCellData?.date.toLocaleDateString()}</div>
        </Tooltip>
      )}
    </div>
  )
}
