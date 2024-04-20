import { Image } from 'antd'
import { Metadata } from 'next'
import { Divider } from '@nextui-org/react'
import axios from 'axios'
import Footer from '@/components/layout/footer'

async function getBlog(id: number) {
  let blogData = {
    title: '',
    description: '',
    content: '',
    created_at: '',
    writer: {
      avatar_url: '',
      name: '',
      position: ''
    },
    main_image_url: '',
    first_image_url: '',
    second_image_url: '',
    third_image_url: ''
  }
  await axios
    .get(`${process.env.GUEST_API_URL}/article/${id}`)
    .then(({ data }) => {
      blogData = data
    })

  return blogData
}

export default async function Blog({
  params: { id }
}: {
  params: { id: number }
}) {
  const data = await getBlog(id)

  return (
    <div className='flex min-w-full flex-col bg-white pt-[72px] text-black'>
      <Image
        alt='Blog main image'
        src={`${process.env.CDN_URL}/${data.main_image_url}`}
        height={400}
        style={{ objectFit: 'cover' }}
      />
      <div className='flex flex-col gap-y-2 p-4'>
        <h1 className='text-2xl font-semibold'>{data.title}</h1>
        <span className='text-gray-600'>{data.description}</span>
        <span className='text-gray-500'>{data.created_at}</span>
      </div>
      <div className='my-1 w-full px-4'>
        <Divider className='h-[0.5px] bg-gray-300' />
      </div>
      <div className='mb-10 grid grid-cols-1 gap-x-2 p-4 md:grid-cols-3'>
        <div
          className={`${
            Boolean(data.first_image_url) ? 'md:col-span-2' : 'md:col-span-3'
          }`}
        >
          <div
            className='prose max-w-none marker:text-black'
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
        <div className='space-y-4 md:col-span-1'>
          {data.first_image_url && (
            <Image
              src={`${process.env.CDN_URL}/${data?.first_image_url}`}
              alt='Image 1'
              height={400}
              style={{ objectFit: 'cover' }}
            />
          )}
          {data.second_image_url && (
            <Image
              src={`${process.env.CDN_URL}/${data?.second_image_url}`}
              alt='Image 2'
              height={400}
              style={{ objectFit: 'cover' }}
            />
          )}
          {data.third_image_url && (
            <Image
              src={`${process.env.CDN_URL}/${data?.third_image_url}`}
              alt='Image 3'
              height={400}
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id
  const data = await fetch(`${process.env.GUEST_API_URL}/article/${id}`).then(
    (res) => res.json()
  )

  return {
    metadataBase: new URL(`${process.env.BASE_URL}`),
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url: process.env.BASE_URL,
      images: [`${process.env.CDN_URL}/${data.main_image_url}`]
    }
  }
}
