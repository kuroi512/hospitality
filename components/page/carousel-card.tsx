import { StarIcon, UsersIcon } from '@heroicons/react/24/outline'

const Card = ({
  thumbnail_url,
  title,
  star,
  purchase_count
}: {
  thumbnail_url: string
  title: string
  star: number
  purchase_count: number
}) => {
  return (
    <div className='relative flex h-64 w-full flex-col justify-end text-sm'>
      <img
        src={`${process.env.CDN_URL}/thumbnails/${thumbnail_url}`}
        className='h-64 w-full rounded-xl object-cover'
      />
      <div className='absolute bottom-0 left-0 right-0 z-20 h-[70%] rounded-xl bg-gradient-to-b from-transparent to-black'></div>
      <div className='absolute bottom-4 left-4 right-4 z-20 text-xs'>
        <span className='mb-2 line-clamp-2 font-bold'>{title}</span>
        <div className='flex justify-between'>
          <div className='flex items-center gap-x-1'>
            <StarIcon width={20} height={20} />
            <span>{star}</span>
          </div>
          <div className='flex items-center gap-x-1'>
            <UsersIcon width={20} height={20} />
            <span>{purchase_count}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
