'use client'

import React from 'react'
import Link from 'next/link'
import { Button, Image } from '@nextui-org/react'

import { EnvelopeIcon, PhoneIcon, MapIcon } from '@heroicons/react/24/outline'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='relative bottom-0 left-0 z-10 flex w-full flex-col items-center justify-center space-y-5 bg-[#111111] px-5 py-10 pt-24 text-white shadow-sm md:px-16'>
      <div className='grid w-full grid-cols-3'>
        <div className='flex flex-col gap-2'>
          <Link href='/'>
            <Image src='/images/logo.png' alt='Horeca logo' />
          </Link>
          <Link
            href='mailto:info@hospitality.mn'
            className='mt-3 flex items-center gap-x-3'
          >
            <EnvelopeIcon
              width={20}
              height={20}
              className='min-h-[20px] min-w-[20px]'
            />
            <span>info@hospitality.mn</span>
          </Link>
          <Link
            href='callto:+97685115908'
            className='flex items-center gap-x-3'
          >
            <PhoneIcon
              width={20}
              height={20}
              className='min-h-[20px] min-w-[20px]'
            />
            <span>+97685115908</span>
          </Link>
          <div className='flex items-center gap-x-3'>
            <MapIcon
              width={20}
              height={20}
              className='min-h-[20px] min-w-[20px]'
            />
            <span>Ulaanbaatar, Mongolia</span>
          </div>
        </div>

        <div className='col-span-2 grid w-full grid-cols-1 justify-items-center sm:grid-cols-2'>
          <div className='flex flex-col gap-3'>
            <Link href='/' className='max-w-max text-white'>
              Нүүр хуудас
            </Link>
            <Link href='/content' className='max-w-max text-white'>
              Контент
            </Link>
            <Link href='/contact-us' className='max-w-max text-white'>
              Холбоо барих
            </Link>
          </div>
          <div className='mt-5 flex flex-col gap-3 sm:mt-0'>
            <span className='max-w-max font-bold text-white'>
              Сошиал хаягууд
            </span>
            <div className='flex items-center gap-x-2 pb-10 md:pb-0'>
              <Link href='https://facebook.com/hospitalityskills.mn' target='_blank'>
                <Button isIconOnly variant='flat'>
                  <Image src='/svg/facebook.svg' width={20} height={20} />
                </Button>
              </Link>
              <Link href='https://instagram.com/hospitality.mn' target='_blank'>
                <Button isIconOnly variant='flat'>
                  <Image src='/svg/instagram.svg' width={20} height={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col items-center justify-center border-t pt-5 text-xs leading-7 sm:gap-y-2 sm:text-sm'>
        <span>
          &copy; {currentYear} <b>Hospitality.</b> All rights reserved.
        </span>
        <span>
          Developed by{' '}
          <Link
            href='https://softonus.com'
            target='_blank'
            className='softonus font-bold'
          >
            Softonus LLC
          </Link>
        </span>
      </div>
    </footer>
  )
}

export default Footer
