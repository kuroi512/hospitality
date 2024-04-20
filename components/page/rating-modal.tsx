'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import StarsFunctional from './stars-functional'
import { useUserContext } from '@/context/user'
import { getToken } from '@/utils/token'
import axios from 'axios'
import { App } from 'antd'

const RatingModal = ({
  fetchData,
  id
}: {
  fetchData: Function
  id: number
}) => {
  const { userData } = useUserContext()
  const { message } = App.useApp()
  const [openModal, setOpenModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const addComment = async () => {
    const token = await getToken()
    if (Boolean(token)) {
      await axios
        .post(
          `${process.env.USER_API_URL}/video-course-rate`,
          {
            video_course_id: id,
            rate: rating,
            comment: comment
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(({ status, data }) => {
          if (status === 200) {
            message.success(data.message)
            setOpenModal(false)
            fetchData()
            setRating(0)
            setComment('')
          }
        })
    } else {
      message.warning('Эхлээд нэвтэрнэ үү')
    }
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className='button px-3 py-2 text-base'
      >
        Үнэлгээ өгөх
      </button>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalContent className='bg-[#0D0F11]'>
          <ModalHeader className='flex'>Үнэлгээ өгөх</ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-col justify-center gap-y-4 p-8'>
              <Image
                width={64}
                height={64}
                src={
                  userData.avatar_url ? userData.avatar_url : '/images/user.png'
                }
                alt='User avatar'
                className='self-center rounded-full'
              />
              <p className='self-center'>{userData.name}</p>
              <div className='flex cursor-pointer flex-row self-center'>
                <StarsFunctional rating={rating} setRating={setRating} />
              </div>
              <div className='flex flex-col gap-1'>
                <label
                  htmlFor='new-rating-comment'
                  className='text-sm font-normal text-[#DADADA]'
                >
                  Санал хүсэлт илгээх
                </label>
                <textarea
                  id='new-rating-comment'
                  placeholder='Энд бичнэ үү'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className='min-h-[140px] w-full rounded-[6px] border-[1px] border-[#3B3B3B] bg-[#0D0F11] px-5 py-4 text-[#727172]'
                ></textarea>
              </div>
              <div className='flex w-full flex-row gap-x-3'>
                <button
                  className='border-button w-1/2 px-3 py-2'
                  onClick={() => setOpenModal(false)}
                >
                  Буцах
                </button>
                <button className='button w-1/2 px-3 py-2' onClick={addComment}>
                  Илгээх
                </button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default RatingModal
