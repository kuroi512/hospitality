'use client'

import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import { Image as NextImage, Button, Input, Textarea } from '@nextui-org/react'
import { useNotificationContext } from '@/context/notification'
import { message } from 'antd'

import {
  EnvelopeIcon,
  PhoneIcon,
  MapIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'

interface Contact {
  name: string
  company_name: string
  email: string
  phone_number: string
  message: string
  type: string
}

const ContactInputs = ({ type, id }: { type: string; id?: string }) => {
  const { openNotification } = useNotificationContext()
  const [contact, setContact] = useState<Contact>({
    name: '',
    company_name: '',
    email: '',
    phone_number: '',
    message: '',
    type: type
  })

  const submit = async () => {
    const formData = new FormData()
    Object.keys(contact).forEach((key: string) => {
      formData.append(key, contact[key as keyof Contact])
    })
    formData.append('type', type)

    if (!contact.name || !contact.email) {
      message.warning('Гүйцэт бичнэ үү')
    } else {
      await axios
        .post(`${process.env.GUEST_API_URL}/contact`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({ status }) => {
          if (status === 200) {
            message.success('Амжилттай')
          }
        })
    }
  }

  const handleChange = (event: any) => {
    setContact({ ...contact, [event.target.name]: event.target.value })
  }

  return (
    <div
      className='z-20 grid w-full grid-cols-1 items-start gap-x-5 pt-20 md:grid-cols-2 md:gap-x-10'
      id={id}
    >
      <div className='flex w-full flex-col justify-center gap-y-2 text-white md:w-96 md:gap-y-2'>
        <Input
          label='Нэр'
          name='name'
          isRequired
          variant='bordered'
          onChange={handleChange}
        />
        <Input
          label='Компани'
          name='company_name'
          variant='bordered'
          onChange={handleChange}
        />
        <Input
          label='И-мэйл'
          type='email'
          name='email'
          isRequired
          autoComplete='off'
          variant='bordered'
          onChange={handleChange}
        />
        <Input
          label='Утасны дугаар'
          name='phone_number'
          variant='bordered'
          onChange={handleChange}
        />
        <Textarea
          label='Нэмэлт мэдээлэл'
          name='message'
          minRows={4}
          maxRows={4}
          variant='bordered'
          onChange={handleChange}
        />
        <div className='pt-3'>
          <Button
            onClick={submit}
            className='button flex items-center gap-x-2 text-white hover:scale-105 hover:rounded-xl'
          >
            <p className=' text-lg'>Илгээх</p>
            <PaperAirplaneIcon
              width={20}
              height={20}
              className='-rotate-45 transform'
            />
          </Button>
        </div>
      </div>
      <div className='mt-5 flex flex-col gap-y-3 text-lg md:mt-0'>
        <span className='uppercase'>ХОЛБОО БАРИХ МЭДЭЭЛЭЛ:</span>

        <Link
          href='mailto:info@hospitality.mn'
          className='flex max-w-max items-center gap-x-3'
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
          className='flex max-w-max items-center gap-x-3'
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
        <div className='flex items-center gap-x-2 pb-10 md:pb-0'>
          <Link
            href='https://facebook.com/hospitalityskills.mn'
            target='_blank'
          >
            <Button isIconOnly variant='flat'>
              <NextImage src='/svg/facebook.svg' width={20} height={20} />
            </Button>
          </Link>
          <Link href='https://instagram.com/hospitality.mn' target='_blank'>
            <Button isIconOnly variant='flat'>
              <NextImage src='/svg/instagram.svg' width={20} height={20} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ContactInputs
