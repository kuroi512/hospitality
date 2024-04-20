'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'

const generateIcon = (icon: string) =>
  dynamic(() =>
    import('@heroicons/react/24/outline').then((mod: any) => mod[icon])
  )

import type { AboutType } from '@/types/content'

const About = ({ teacher, description, learnables }: AboutType) => {
  return (
    <div className='flex w-full flex-col items-start gap-10 pb-3'>
      <div className='mb-1 flex w-full flex-col items-start justify-between gap-3'>
        <div className='text-xl font-semibold leading-[28px] text-white'>
          Багшийн мэдээлэл
        </div>
        <div className='flex flex-row'>
          <Image
            src={
              teacher.avatar_url
                ? `${process.env.CDN_URL}/user/${teacher.id}/${teacher.avatar_url}`
                : '/images/user.png'
            }
            alt=''
            width={60}
            height={60}
            className='h-[60px] w-[60px] rounded-full'
          />
          <div className='gap-0.6 ml-2 mt-2 flex w-full flex-col items-start justify-start text-start'>
            <div className='font-semibold uppercase'>{teacher?.name}</div>
            <div className='text-sm text-gray-300'>{teacher?.position}</div>
            <div className='mt-3 whitespace-pre-wrap text-justify text-sm text-gray-300'>
              {teacher?.description}
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col items-start gap-10'>
        <div className='flex w-full flex-col items-start gap-3'>
          <div className='text-xl font-semibold'>Хичээлийн агуулга</div>
          <div className='w-full whitespace-pre-wrap text-justify text-gray-300'>
            {description}
          </div>
        </div>
      </div>

      <div className='text-xl font-semibold'>Хичээлээс юу сурах вэ?</div>
      <div className='flex w-full gap-24'>
        <div className='grid grid-cols-1 gap-12 sm:grid-cols-2'>
          {learnables.map((learnable) => {
            // const Icon: any = generateIcon(learnable.icon)
            return (
              <div className='flex items-start gap-2' key={learnable.text}>
                {/* <Icon height={24} width={24} className='h-[24px] w-[24px]' /> */}
                <span className='mt-[1px]'>&bull;</span>
                <span className='mt-px whitespace-pre-wrap text-gray-300'>
                  {learnable.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default About
