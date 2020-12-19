import * as d3 from 'd3'

import { CalendarGraph } from '@/src/components'

import styles from './index.module.scss'

const makeData = () =>
  d3.range(366).map((i) => ({
    date: new Date(2020, 0, i + 1),
    data: Math.floor(d3.randomLogNormal(1)()),
  }))

export default function Profile() {
  return (
    <div className={styles.profile}>
      <div className={styles.calendar}>
        网易云音乐
        <CalendarGraph data={makeData()} color="#FF4343" />
        知乎
        <CalendarGraph data={makeData()} color="#43B0FF" />
        AniList
        <CalendarGraph data={makeData()} color="#f68a0a" />
        GitHub
        <CalendarGraph data={makeData()} color="#80BD8B" />
      </div>
    </div>
  )
}
