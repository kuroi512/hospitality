'use client'

import Comments from './comments'
import About from './about'
import Ratings from './ratings'

import type { ContentType } from '@/types/content'

const BottomSection = ({
  selectedBottom,
  data,
  fetchData
}: {
  selectedBottom: number
  data: ContentType | any
  fetchData: Function
}) => {
  if (selectedBottom === 1) {
    return <About {...data} />
  } else if (selectedBottom === 2) {
    return (
      <Comments comments={data.comments} fetchData={fetchData} id={data.id} />
    )
  } else if (selectedBottom === 3) {
    return <Ratings rates={data.rates} id={data.id} fetchData={fetchData} />
  }
}
export default BottomSection
