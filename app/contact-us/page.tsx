'use client'

import ContactInputs from '@/components/page/contact-inputs'
import { Divider } from '@nextui-org/react'

export default function Contact() {
  return (
    <section
      id='contact-us'
      className='relative flex min-h-screen w-full flex-col items-center bg-black px-5 pt-20 text-white lg:p-36'
    >
      <span className='self-start text-2xl uppercase md:pb-5'>
        Бидэнтэй холбогдох
      </span>
      <Divider style={{ backgroundColor: '#E54900' }} />
      <ContactInputs id='1' type='contact-us' />
    </section>
  )
}
