'use client'

import Image from 'next/image'
import RatingModal from '@/components/page/rating-modal'
import RenderStars from '@/components/page/render-stars'

import type { RatingType } from '@/types/content'
import { formatDate } from '@/lib/helper'

const Ratings = ({
  rates,
  id,
  fetchData
}: {
  rates: RatingType[]
  id: number
  fetchData: Function
}) => {
  let sum = rates.reduce((acc, obj) => acc + obj.rate, 0)
  let avg = sum / rates.length

  return (
    <div className='flex w-full flex-col'>
      <p className='text-xl font-semibold'>Хэрэглэгчдийн үнэлгээ</p>
      <div className='mt-3 flex w-full flex-row items-center justify-between gap-2'>
        <div className='flex flex-row gap-2'>
          <p className='text-4xl font-semibold'>{avg ? avg : 0}</p>
          <div className='flex flex-col'>
            <div className='flex'>
              <RenderStars keyString={`${id}`} size={17} initialRating={avg} />
            </div>
            <p className='text-sm text-gray-400'>
              {rates.length} сурагчийн үнэлгээ
            </p>
          </div>
        </div>
        <RatingModal id={id} fetchData={fetchData} />
      </div>

      <div className='mt-8 flex flex-col gap-8'>
        {rates.map((rate, index) => (
          <div className='flex flex-row gap-4' key={rate.comment + '-' + index}>
            <Image
              src={
                rate.user.avatar_url ? rate.user.avatar_url : '/images/user.png'
              }
              alt={'generated'}
              width={48}
              height={48}
              className='h-12 rounded-full'
            />
            <div className='flex flex-col'>
              <div className='flex flex-row items-center gap-2'>
                <p className='text-base font-normal'>{rate.user.name}</p>
                <span className='text-xs text-gray-400'>&bull;</span>
                <p className='text-sm text-[#AAA]'>
                  {formatDate(rate.created_at)}
                </p>
                <span className='text-xs text-gray-400'>&bull;</span>
                <div className='flex'>
                  <RenderStars
                    keyString={rate.comment + '-' + index}
                    size={14}
                    initialRating={rate.rate}
                  />
                </div>
              </div>
              <p className='font-normal text-[#AAA]'>{rate.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Ratings
