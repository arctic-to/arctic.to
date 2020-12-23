import * as d3 from 'd3'

import { CalendarGraph } from '@/components'
import { color } from '@/config'

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
        <CalendarGraph data={makeData()} color={color.NETEASE_MUSIC} />
      </div>
    </div>
  )
}
