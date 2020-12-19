import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

const VIEWBOX_W = 1340
const VIEWBOX_H = 230

const CELLS_START_X = 50
const CELLS_START_Y = 40
const AXIS_GAP = 10

const CELL_SIZE = 20
const CELL_GAP = 4
const CELL_OFFSET = CELL_SIZE + CELL_GAP
const CELL_RADIUS = 4

interface CalendarGraphProps {
  data: {
    date: Date
    data: number
  }[]
  color: string
}

export function CalendarGraph({ data, color }: CalendarGraphProps) {
  const ref = useRef(null)

  const maxValue = d3.max(data, (d) => d.data) ?? 0
  const calcColor = d3.interpolate('#FFFFFF', color)

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr('viewBox', [0, 0, VIEWBOX_W, VIEWBOX_H].join(' '))
      .attr('font-family', 'sans-serif')
      .attr('font-size', 14)

    const graph = svg
      .append('g')
      .attr('transform', `translate(${CELLS_START_X}, ${CELLS_START_Y})`)

    // Day of Week Axis
    graph
      .append('g')
      .attr('text-anchor', 'end')
      .selectAll('text')
      .data(d3.range(7).map((v, i) => i))
      .join('text')
      .attr('x', -AXIS_GAP)
      .attr('y', (i) => CELL_OFFSET * (i + 0.5))
      .attr('dy', '0.25em')
      .text((i) => ['Sun', '', '', 'Wed', '', '', 'Sat'][i])

    // Month Axis
    graph
      .append('g')
      .selectAll('text')
      .data(
        d3.timeMonths(d3.timeMonth(data[0].date), data[data.length - 1].date),
      )
      .join('text')
      .attr(
        'x',
        (month) => d3.timeSunday.count(d3.timeYear(month), month) * CELL_OFFSET,
      )
      .attr('y', -AXIS_GAP)
      .text(d3.timeFormat('%b'))

    // Cells
    graph
      .append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('fill', (d) => calcColor(d.data / maxValue))
      .attr(
        'x',
        (d) => d3.timeSunday.count(d3.timeYear(d.date), d.date) * CELL_OFFSET,
      )
      .attr('y', (d) => d.date.getDay() * CELL_OFFSET)
      .attr('width', CELL_SIZE)
      .attr('height', CELL_SIZE)
      .attr('rx', CELL_RADIUS)
      .attr('ry', CELL_RADIUS)
      .append('title')
      .text((d) => `${d.date}: ${d.data}`)
  }, [])

  return <svg ref={ref}></svg>
}
