import Link from 'next/link'
import Image from 'next/image'

import {
  UsersIcon,
  PlayCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const ContentCard = ({
  id,
  title,
  author,
  star,
  price,
  thumbnail_url,
  purchase_count
}: {
  id: number
  title: string
  author: string
  star: number
  price: number
  thumbnail_url: string
  purchase_count: number
}) => {
  return (
    <Link
      href={`/content/${id}`}
      key={title}
      className='group max-h-[410px] max-w-[283px] cursor-pointer text-sm'
    >
      <div className='relative overflow-hidden'>
        <Image
          className='lg-full min-h-[204px] min-w-[162px] overflow-hidden object-cover transition delay-150 duration-300 ease-in-out group-hover:scale-110 lg:w-full'
          width={283}
          height={245}
          alt={title}
          src={`${process.env.CDN_URL}/thumbnails/${thumbnail_url}`}
        />
        <div className='absolute inset-0 z-10 flex items-center justify-center opacity-0 transition delay-150 duration-300 ease-in-out group-hover:opacity-100'>
          <PlayCircleIcon width={40} height={40} color='#00ADBB' />
        </div>
      </div>

      <div className='group-hover:border-card flex w-full flex-col p-3 px-[13px] pb-[13px] transition delay-150 duration-300 ease-in-out group-hover:px-3 group-hover:pb-3'>
        <p className='text-sm font-light text-gray-400'>{author}</p>
        <p className='line-clamp-2 text-base font-light text-white'>{title}</p>
        <div className='my-3 flex w-full items-center justify-between text-xs'>
          <div className='flex items-end gap-1'>
            <UsersIcon color='#E7DDF6' width={17} height={17} />
            <span className='text-[#E7DDF6]'>
              {purchase_count.toLocaleString()}
            </span>
          </div>
          <div className='flex items-end gap-1'>
            <StarIcon color='#E7DDF6' width={17} height={17} />
            <span className='text-[#E7DDF6]'>{star}</span>
          </div>
          <p className='text-base text-white'>{price.toLocaleString()}₮</p>
        </div>
      </div>
    </Link>
  )
}

export default ContentCard
