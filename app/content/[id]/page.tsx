'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  Skeleton,
  useDisclosure
} from '@nextui-org/react'
import ReactPlayer from 'react-player'
import Footer from '@/components/layout/footer'
import BottomSection from './bottom-section'

import { ArrowLeftIcon } from '@heroicons/react/24/outline'

import { ContentType, LessonType } from '@/types/content'
import axios from 'axios'
import { getToken } from '@/utils/token'
import { message } from 'antd'

const bottomTabs = [
  {
    id: 1,
    name: 'Хичээлийн агуулга'
  },
  {
    id: 2,
    name: 'Сэтгэгдэлүүд'
  },
  {
    id: 3,
    name: 'Үнэлгээ'
  }
]

const handleSetSelectedContent = ({
  setSelectedContent,
  isLocked,
  content
}: {
  setSelectedContent: React.Dispatch<React.SetStateAction<number>>
  isLocked: boolean
  content: number
}) => {
  if (!isLocked) setSelectedContent(content)
}

export default function Content({
  params: { id }
}: {
  params: { id: number }
}) {
  const router = useRouter()
  const [selectedBottom, setSelectedBottom] = useState(1)
  const [data, setData] = useState<ContentType | any>()
  const [qr, setQr] = useState<any>()
  const [selectedContent, setSelectedContent] = useState(0)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const fetchData = async () => {
    const token = await getToken()
    await axios
      .get(
        `${
          token ? process.env.USER_API_URL : process.env.GUEST_API_URL
        }/video-course/${id}/edit`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(({ status, data }) => {
        if (status === 200) {
          setData(data)
        }
      })
  }

  const handlePurchase = async () => {
    const token = await getToken()
    if (token) {
      await axios
        .get(`${process.env.USER_API_URL}/qpay/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(({ status, data }) => {
          if (status === 200) {
            setQr(data)
            onOpen()
          }
        })
    } else {
      message.warning('Эхлээд нэвтэрнэ үү')
    }
  }

  const handleCheck = async () => {
    const token = await getToken()
    await axios
      .get(`${process.env.USER_API_URL}/check-qpay/${qr.invoice_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ status, data }) => {
        if (status === 200) {
          if (data.count === 0) {
            message.warning('Төлөгдөөгүй байна')
          } else if (data.count > 0) {
            axios
              .get(`${process.env.USER_API_URL}/paid/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              .then(({ status }) => {
                if (status === 200) {
                  message.success('Төлбөр төлөгдөж баталгаажлаа')
                  fetchData()
                  onClose()
                }
              })
          }
        }
      })
  }

  function convertSecondsToHHMMSS(seconds: number) {
    const date = new Date(seconds * 1000)
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
    const second = date.getUTCSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${second}`
  }

  useEffect(() => {
    const hasAboutFragment = window.location.hash === '#about'
    if (hasAboutFragment) {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' })
      }
    }

    fetchData()
  }, [])

  if (Boolean(data?.id)) {
    return (
      <div className='z-0 h-full w-full bg-content bg-cover bg-no-repeat text-white'>
        <div className='z-10 mx-5 flex flex-col justify-between gap-5 pt-32 sm:mx-10 lg:mx-32 xl:mx-40 xl:flex-row'>
          {/* div for mobile */}
          <div className='flex w-full flex-col gap-3 px-5 xl:hidden'>
            <p className='bg-gradient-to-r from-[#FEFAF4] to-[#F3CF8E] bg-clip-text text-base text-transparent'>
              Хичээлүүд
            </p>
            <div className='flex flex-row gap-3 overflow-y-hidden overflow-x-scroll pb-2 xl:hidden'>
              {data?.lessons.map((content: LessonType, index: number) => (
                <button
                  onClick={() =>
                    handleSetSelectedContent({
                      setSelectedContent: setSelectedContent,
                      isLocked: content.locked,
                      content: index
                    })
                  }
                  key={content.title}
                  className={`${index == selectedContent && 'button'} ${
                    content.locked ? 'cursor-not-allowed' : 'cursor-pointer'
                  } flex h-12 min-w-max flex-row items-start justify-between gap-x-2 rounded bg-cover bg-no-repeat px-6 pt-3 bg-blend-normal`}
                >
                  <div className='flex flex-row items-start gap-2'>
                    <img
                      src={`${
                        content.locked ? '/svg/locked.svg' : '/svg/play.svg'
                      } `}
                    />
                    <div className='font-sans leading-[25.6px] text-[#fefefe]'>
                      {content.title}
                    </div>
                  </div>
                  <span className='mt-px flex'>-</span>
                  <div className='font-sans leading-[25.6px] text-[#fefefe]'>
                    {convertSecondsToHHMMSS(content.duration)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className='flex w-full flex-col gap-4'>
            <div className='flex justify-start'>
              <Button
                variant='light'
                size='sm'
                onClick={() => router.back()}
                className='hover:scale-110'
              >
                <ArrowLeftIcon height={20} width={20} />
              </Button>
            </div>

            <div className='w-full'>
              <ReactPlayer
                config={{
                  file: { attributes: { controlsList: 'nodownload' } }
                }}
                onContextMenu={(event: any) => event.preventDefault()}
                url={data.lessons[selectedContent].video_url}
                controls
                fallback={
                  <Skeleton className='flex h-[25rem] w-[100%] rounded-lg' />
                }
                width='100%'
                height='100%'
              />
            </div>
            <div
              className='flex flex-col items-start justify-between gap-5 sm:flex-row sm:gap-10 md:gap-20'
              id='about'
            >
              <p className='text-xl font-semibold'>{data?.title}</p>
              {!data.is_paid && (
                <div className='flex flex-row items-center gap-8 self-end sm:self-auto'>
                  <p className='text-[20px] font-semibold'>
                    {Number(data?.price).toLocaleString()}₮
                  </p>
                  <button
                    className='button whitespace-nowrap px-3 py-2'
                    onClick={handlePurchase}
                  >
                    Худалдаж авах
                  </button>
                </div>
              )}
            </div>

            <div className='flex flex-row justify-between text-[#AAAAAA]'>
              {bottomTabs.map((tab) => (
                <div
                  key={tab.name}
                  onClick={() => setSelectedBottom(tab.id)}
                  className={`flex w-1/3 cursor-pointer justify-center border-b-2 px-1 py-3 ${
                    selectedBottom == tab.id
                      ? 'border-[#00ADBB] font-bold text-white'
                      : 'text-gray-400'
                  }`}
                >
                  {tab.name}
                </div>
              ))}
            </div>

            <div>
              <BottomSection
                selectedBottom={selectedBottom}
                data={data}
                fetchData={fetchData}
              />
            </div>
          </div>

          <div className='hidden w-[387px] xl:flex'>
            <div className='flex w-full flex-col gap-4 pb-2'>
              <div className='text-xl font-semibold leading-7 text-white'>
                Хичээлүүд
              </div>
              <div className='flex w-full flex-col items-start justify-between gap-2'>
                {data?.lessons.map((content: LessonType, index: number) => (
                  <button
                    onClick={() =>
                      handleSetSelectedContent({
                        setSelectedContent: setSelectedContent,
                        isLocked: content.locked,
                        content: index
                      })
                    }
                    key={content.title}
                    className={`${index == selectedContent && 'button'} ${
                      content.locked ? 'cursor-not-allowed' : 'cursor-pointer'
                    } flex h-12 w-full flex-row items-start justify-between rounded bg-cover bg-no-repeat px-6 pt-3 bg-blend-normal`}
                  >
                    <div className='flex flex-row items-start gap-2'>
                      <img
                        src={`${
                          content.locked ? '/svg/locked.svg' : '/svg/play.svg'
                        } `}
                        alt='Playcircle'
                        id='Playcircle'
                        className=''
                      />
                      <Tooltip content={content.title}>
                        <div className='line-clamp-1 text-start font-sans leading-[25.6px] text-[#fefefe]'>
                          {content.title}
                        </div>
                      </Tooltip>
                    </div>
                    <div className='font-sans leading-[25.6px] text-[#fefefe]'>
                      {convertSecondsToHHMMSS(content.duration)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
          >
            <ModalContent>
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  Төлбөр төлөх
                </ModalHeader>
                <ModalBody className='pb-5'>
                  <p>Төлбөр төлсөнөөр таны бүртгэл баталгаажих болно.</p>
                  <div className='flex justify-center'>
                    <img
                      alt='QR Code'
                      src={`data:images/png;base64,${qr?.qr_image}`}
                    />
                  </div>
                </ModalBody>{' '}
                <ModalFooter className='flex justify-center'>
                  <Button color='primary' onPress={handleCheck}>
                    Төлсөн
                  </Button>
                </ModalFooter>
              </>
            </ModalContent>
          </Modal>
        </div>
        <div className='mt-20'>
          <Footer />
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}
