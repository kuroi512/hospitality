'use client'

import Link from 'next/link'
import { Image } from '@nextui-org/react'
import { CalendarIcon } from '@heroicons/react/24/outline'

const BlogCard = ({
  id,
  main_image_url,
  title,
  description,
  released_at,
  type
}: {
  id: number
  main_image_url: string
  title: string
  description: string
  released_at: string
  type: string
}) => {
  return (
    <Link className='z-10 h-[486px] w-[320px]' href={`/blog/${id}`}>
      <Image
        alt={title}
        src={`${process.env.CDN_URL}/${main_image_url}`}
        width={320}
      />
      <div className='mt-4 w-full px-4'>
        <div className='flex justify-end'>
          {/* <span className='rounded-lg border border-gray-400 px-3 py-1.5 text-center text-gray-400'>
            {type}
          </span> */}
          <div className='flex items-center gap-x-2 text-gray-400'>
            <CalendarIcon width={20} height={20} />
            <span>{released_at}</span>
          </div>
        </div>
        <p className='line-clamp-2 pt-2 text-lg font-semibold'>{title}</p>
        <p className='line-clamp-3 pt-2 text-sm font-thin text-gray-400'>
          {description}
        </p>
      </div>
    </Link>
  )
}

export default BlogCard
