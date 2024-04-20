'use client'

import Image from 'next/image'
import Card from '@/components/page/carousel-card'
import Footer from '@/components/layout/footer'
import ScrollLogos from '@/components/page/scroll-logos'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import {
  Accordion,
  AccordionItem,
  Input,
  Select,
  SelectItem,
  Button,
  Divider,
  Spinner
} from '@nextui-org/react'
import BlogCard from '@/components/page/blog-card'

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  StarIcon,
  ClockIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/24/solid'
import ContactInputs from '@/components/page/contact-inputs'
import axios from 'axios'
import { LessonType } from '@/types/content'

export default function Home() {
  const router = useRouter()
  const [imageIndex, setImageIndex] = useState(1)
  const [previewCount, setPreviewCount] = useState(1)
  const [activeCategory, setActiveCategory] = useState(0)
  const [lessons, setLessons] = useState<LessonType[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any>([])
  const [faqs, setFaqs] = useState([
    {
      question: 'Сургалтанд хэн хамрагдах боломжтой вэ?',
      answer:
        'Манай сургалтанд зочлох үйлчилгээний салбарын ажилтнууд, зочлох үйлчилгээний чиглэлээр мэргэжлээр ажиллах сонирхолтой хувь хүмүүс, мөн энэ салбарт үйл ажиллагаа явуулж буй бизнес эрхлэгчид, эзэд зэрэг хүмүүс сургалтанд хамрагдах боломжтой.'
    },
    {
      question: 'Хэрхэн хамрагдах вэ?',
      answer:
        'Сургалтанд хамрагдахын тулд Hospitality.mn сайтад бүртгүүлж, хүссэн хичээлээ сонгоод, төлбөрийн үйл явцыг дуусгахад хангалттай.'
    },
    {
      question: 'Hospitality.mn сайтаас хичээлээ хэрхэн сонгох вэ?',
      answer:
        'Хичээлээ сонгохын тулд манай сургалтын каталогийг үзэхэд л хангалттай. Та өөрийн сонирхсон хичээлээ олсны дараа дарж орон, хичээлийн танилцуулга болон дэлгэрэнгүй мэдээллийг үзнэ үү. Дараа нь та "Бүртгүүлэх" эсвэл "Одоо худалдаж авах" товчийг дарж хичээлээ үзэх боломжтой.'
    },
    {
      question: 'Хэрхэн төлбөрөө төлөх вэ?',
      answer:
        'Та сонгосон хичээл рүүгээ орж “үзэх” товчийг даран гарч ирэх qr code-ийг уншуулж төлбөрөө төлснөөр баталгаажна.'
    },
    {
      question: 'Hospitality.mn сайтад хичээлээ хэрхэн байршуулах вэ?',
      answer:
        'Hospitality.mn сайтад хичээлээ байршуулах хүсэлтэй багш нар сургалтын албатай холбогдож хамтран ажиллах боломжтой. Хамтын ажиллагааг албан ёсоор баталгаажуулах гэрээ байгуулна.'
    }
  ])
  const [logos, setLogos] = useState([
    {
      primary_logo_url: '/images/colored-logo.png'
    },
    {
      primary_logo_url: '/images/colored-logo.png'
    },
    {
      primary_logo_url: '/images/colored-logo.png'
    },
    {
      primary_logo_url: '/images/colored-logo.png'
    }
  ])
  const [blogs, setBlogs] = useState<any>([])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 500) {
        setPreviewCount(3)
      } else {
        setPreviewCount(1)
      }
    }

    async function getInitialDatas() {
      try {
        await axios
          .get(`${process.env.GUEST_API_URL}/video-course`)
          .then(({ status, data }) => {
            if (status === 200) {
              setLessons(data)
            }
          })
        await axios
          .get(`${process.env.GUEST_API_URL}/article`)
          .then(({ status, data }) => {
            if (status === 200) {
              setBlogs(data)
            }
          })
        await axios
          .get(`${process.env.HELPER_API_URL}/categories`)
          .then(({ status, data }) => {
            if (status === 200) {
              setCategories(data)
              setLoading(false)
            }
          })
      } catch (error) {
        console.error(error)
      }
    }

    handleScroll()
    window.addEventListener('resize', handleScroll)
    getInitialDatas()

    return () => {
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  function convertSecondsToHHMMSS(seconds: number) {
    const date = new Date(seconds * 1000)
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
    const second = date.getUTCSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${second}`
  }

  if (loading) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <Spinner />
      </div>
    )
  }
  return (
    <div className='z-0 flex w-full flex-col items-center justify-between overflow-y-auto overflow-x-hidden bg-black bg-no-repeat text-white'>
      <section
        id='home'
        className='relative min-h-screen w-full bg-home bg-no-repeat py-32 lg:pr-20 xl:px-32'
      >
        <Image
          fill
          alt=''
          src={`${process.env.CDN_URL}/thumbnails/${lessons[imageIndex]?.thumbnail_url}`}
          className='absolute left-0 top-0 z-0 min-h-screen w-full object-cover opacity-20'
        />
        <div className='relative z-10 mb-20 flex h-[80vh] w-full flex-col items-center gap-10 px-5 md:mb-0 lg:flex-row'>
          <div className='flex w-full flex-col gap-y-3 md:ml-20 lg:-mt-24 lg:w-2/5'>
            <div className={`text text-2xl font-bold`}>
              {lessons[imageIndex]?.title}
            </div>
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col gap-y-3'>
                <div className='flex gap-x-7'>
                  <div className='flex items-center gap-x-1'>
                    <StarIcon width={20} height={20} />
                    <span>{lessons[imageIndex]?.star}</span>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <UsersIcon width={20} height={20} />
                    <span>{lessons[imageIndex]?.purchase_count}</span>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <ClockIcon width={20} height={20} />
                    <span>
                      {convertSecondsToHHMMSS(lessons[imageIndex]?.duration)}
                    </span>
                  </div>
                </div>

                <span className='line-clamp-3 whitespace-pre-wrap'>
                  {lessons[imageIndex]?.description}
                </span>

                <div className='flex justify-start text-xl'>
                  {lessons[imageIndex]?.price} MNT
                </div>
              </div>
              <div className='mt-7 flex gap-x-2'>
                <Button
                  radius='none'
                  className='button h-12 w-36 text-sm  hover:saturate-150'
                  endContent={<PlayIcon width={20} height={20} />}
                  onClick={() =>
                    router.push(`/content/${lessons[imageIndex]?.id}`)
                  }
                >
                  Үзэх
                </Button>
                <Button
                  className='border-button bg-trandparent ml-2 h-12 w-36 cursor-pointer text-lg'
                  onClick={() =>
                    router.push(`/content/${lessons[imageIndex]?.id}#about`)
                  }
                >
                  Дэлгэрэнгүй
                </Button>
              </div>
            </div>
          </div>

          <div className='z-10 m-auto w-full lg:w-3/5'>
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slideToClickedSlide
              onDoubleClick={() =>
                router.push(`/content/${lessons[imageIndex]?.id}`)
              }
              spaceBetween={-20}
              slidesPerView={previewCount}
              coverflowEffect={{
                rotate: 0,
                stretch: -16,
                depth: 50,
                modifier: 2.5
              }}
              pagination={{ el: '.swiper-pagination', clickable: true }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className='relative'
              onSlideChange={(event) => {
                setImageIndex(event.activeIndex)
              }}
              onAfterInit={(swiper) => {
                swiper.activeIndex = 1
              }}
            >
              {lessons.map((lesson) =>
                activeCategory === 0 ? (
                  <SwiperSlide
                    className='remove-shadow relative'
                    key={lesson.title}
                  >
                    <Card key={lesson.title} {...lesson} />
                  </SwiperSlide>
                ) : (
                  lesson.type === activeCategory && (
                    <SwiperSlide
                      className='remove-shadow relative'
                      key={lesson.title}
                    >
                      <Card key={lesson.title} {...lesson} />
                    </SwiperSlide>
                  )
                )
              )}

              <div className='slider-controler place-content-end'>
                <Select
                  variant='bordered'
                  size='md'
                  className='w-80'
                  defaultSelectedKeys={['0']}
                  selectionMode='single'
                  disallowEmptySelection
                  aria-label='Category'
                >
                  {categories.map((category: any) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>

                <div className='relative flex w-40 gap-x-2 bg-black sm:ml-7 sm:w-32'>
                  <div className='swiper-button-prev slider-arrow'>
                    <ArrowLeftCircleIcon />
                  </div>
                  <div className='swiper-button-next slider-arrow'>
                    <ArrowRightCircleIcon />
                  </div>
                </div>
              </div>
            </Swiper>
          </div>
        </div>

        <div className='absolute right-0 top-0 m-auto hidden h-full w-20 flex-col items-center justify-center text-2xl lg:flex '>
          {activeCategory === 0
            ? lessons
                .slice(
                  Math.max(0, imageIndex - 2),
                  Math.min(lessons.length, imageIndex + 3)
                )
                .map((lesson, index: number) => (
                  <div
                    className='flex items-center gap-x-3 text-base'
                    key={lesson.title}
                  >
                    <span
                      className={`font-bold ${
                        imageIndex === index ? 'text-white' : 'text-gray-500'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={`h-1 w-5 rounded-full ${
                        imageIndex === index ? 'bg-gray-500' : 'bg-transparent'
                      }`}
                    ></span>
                  </div>
                ))
            : lessons
                .slice(
                  Math.max(0, imageIndex - 2),
                  Math.min(lessons.length, imageIndex + 3)
                )
                .filter((lesson) => activeCategory === lesson.type)
                .map((lesson, index: number) => (
                  <div
                    className='flex items-center gap-x-3 text-base'
                    key={lesson.title}
                  >
                    <span
                      className={`font-bold ${
                        imageIndex === index ? 'text-white' : 'text-gray-500'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={`h-1 w-5 rounded-full ${
                        imageIndex === index ? 'bg-gray-500' : 'bg-transparent'
                      }`}
                    ></span>
                  </div>
                ))}
        </div>
        <div className='absolute -bottom-10 left-0 right-0 z-30 h-20 min-w-full skew-y-2 overflow-hidden whitespace-nowrap bg-[#D9D9D9]'>
          <ScrollLogos key='logo-scroll-1' logos={logos} />
          <ScrollLogos key='logo-scroll-2' logos={logos} />
          <ScrollLogos key='logo-scroll-3' logos={logos} />
        </div>
      </section>

      <section
        id='faq'
        className='relative flex w-screen flex-col justify-center bg-black px-6 py-20 sm:p-20 md:p-40 lg:px-44 xl:px-80'
      >
        {/* <div>
          <img
            alt='QR Code'
            src='data:images/png;base64,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'
          />
        </div> */}
        <div className='absolute right-0 z-0 h-full w-full'>
          <img
            className='absolute right-0 -mt-24 w-96'
            src='/images/faq-1.png'
          />
          <img
            className='absolute right-0 mt-24 w-96'
            src='/images/faq-2.png'
          />
        </div>
        <div className='z-10 h-20 w-full'>
          <div className={`text-xl font-bold lg:text-2xl`}>
            Сургалттай холбоотой түгээмэл асуулт, хариулт
          </div>
          <div className='py-1 text-xs text-gray-500'>
            Дараах түгээмэл асуулт хариултуудаас та өөртөө тохиолдсон асуудлын
            хариултыг олох боломжтой
          </div>
        </div>
        <div className='z-10'>
          <Accordion>
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.answer}
                aria-label={faq.question}
                title={faq.question}
                className='font-bold'
              >
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
          <p className='mt-5 text-gray-300'>
            *Хэрэв танд нэмэлт асуулт байвал эсвэл нэмэлт тусламж авах
            шаардлагатай бол холбоо барих хэсгийн хаягт байрлах манай
            хэрэглэгчийн туслахтай холбогдоно уу.
          </p>
        </div>
      </section>

      {/* <section
        id='blog'
        className='w-full bg-black px-6 py-10 lg:px-40 lg:pb-20'
      >
        <div className='absolute left-0 z-0 h-full w-full'>
          <img className='absolute left-0 w-96' src='/images/blog-1.png' />
        </div>
        <div className='z-10 text-2xl lg:text-4xl'>
          <p>Нийтлэл</p>
        </div>
        <div className='z-10 my-5 border-b border-red-500'></div>
        <div className='blog-card z-10'>
          {blogs.map((blog: any, index: number) => (
            <BlogCard key={blog.title + '-' + index} {...blog} />
          ))}
        </div>
      </section> */}

      <section
        id='contact-us'
        className='relative flex min-h-screen w-full flex-col items-center bg-black px-5 pt-20 text-white lg:p-28'
      >
        <div className='absolute right-0 z-0 h-full w-full'>
          <img
            className='absolute right-0 -mt-24 w-96'
            src='/images/faq-1.png'
          />
          <img
            className='absolute right-0 mt-24 w-96'
            src='/images/faq-2.png'
          />
        </div>
        <span className='z-10 self-start text-2xl uppercase md:pb-5'>
          Бидэнтэй холбогдох
        </span>
        <Divider style={{ backgroundColor: '#E54900' }} />
        <div className='mb-10 flex h-auto w-full justify-start'>
          <ContactInputs id='1' type='contact-us' />
        </div>
        <div className='absolute -bottom-10 left-0 right-0 z-20 h-20 min-w-full -skew-y-2 overflow-hidden whitespace-nowrap bg-[#D9D9D9]'>
          <ScrollLogos key='logo-scroll-1' logos={logos} />
          <ScrollLogos key='logo-scroll-2' logos={logos} />
          <ScrollLogos key='logo-scroll-3' logos={logos} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
