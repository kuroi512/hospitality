'use client'

import Image from 'next/image'
import { useState } from 'react'

import {
  HandThumbUpIcon as OutlineHandThumbUpIcon,
  HandThumbDownIcon as OutlineHandThumbDownIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import {
  HandThumbUpIcon as SolidHandThumbUpIcon,
  HandThumbDownIcon as SolidHandThumbDownIcon
} from '@heroicons/react/24/solid'

import { CommentType } from '@/types/content'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios'
import { getToken } from '@/utils/token'
import { App } from 'antd'
import { formatDate } from '@/lib/helper'
import { useUserContext } from '@/context/user'

const Comments = ({
  comments,
  fetchData,
  id
}: {
  comments: CommentType[]
  fetchData: Function
  id: number
}) => {
  const { message } = App.useApp()
  const [newComment, setNewComment] = useState('')

  const handleComment = async () => {
    const token = await getToken()
    if (Boolean(token)) {
      await axios
        .post(
          `${process.env.USER_API_URL}/video-course-comment`,
          {
            video_course_id: id,
            comment: newComment
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
            fetchData()
          }
        })
    } else {
      message.warning('Эхлээд нэвтэрнэ үү')
    }
  }

  return (
    <div>
      <div>
        {comments.map((comment) => (
          <Question
            courseId={id}
            message={message}
            fetchData={fetchData}
            key={'comment-' + comment.id}
            isParent={comment.reply_id ? false : true}
            {...comment}
          />
        ))}
        <div className='flex w-full items-center gap-2 border-t-1 py-4'>
          <Image
            src='/images/user.png'
            alt={`Bold's Avatar`}
            className='h-[32px] rounded-full'
            width={32}
            height={32}
          />
          <Input
            type='text'
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            className='w-full'
            placeholder='Сэтгэгдэл үлдээх'
            size='sm'
          />
          <Button isIconOnly variant='light' onClick={handleComment}>
            <PaperAirplaneIcon width={20} height={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}

const Question = ({
  id,
  courseId,
  user,
  comment,
  replies,
  liked,
  disliked,
  message,
  like_count,
  dislike_count,
  created_at,
  isParent,
  fetchData
}: CommentType & {
  isParent: boolean
  courseId: number
  message: any
  fetchData: Function
}) => {
  const { userData } = useUserContext()
  const [showReply, setShowReply] = useState(false)
  const [like, setLike] = useState(liked)
  const [dislike, setDislike] = useState(disliked)
  const [replyText, setReplyText] = useState('')
  const toggleReply = () => {
    setShowReply(!showReply)
  }
  const updateLikeCount = (id: number) => {
    setLike((prev) => !prev)
    fetchData()
  }
  const updateDisLikeCount = (id: number) => {
    setDislike((prev) => !prev)
    fetchData()
  }

  const addReply = async () => {
    const token = await getToken()
    if (Boolean(token)) {
      await axios
        .post(
          `${process.env.USER_API_URL}/video-course-comment`,
          {
            video_course_id: courseId,
            reply_id: id,
            comment: replyText
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
            fetchData()
            setReplyText('')
            toggleReply()
          }
        })
    } else {
      message.warning('Эхлээд нэвтэрнэ үү')
    }
  }

  return (
    <div className='w-full p-3'>
      <div className='flex w-full gap-[16px]'>
        <Image
          src={user.avatar_url ? user.avatar_url : '/images/user.png'}
          alt={`${user.name}'s Avatar`}
          className='h-[48px] rounded-full'
          width={48}
          height={48}
        />
        <div className='flex w-full flex-col'>
          <div className='flex items-center gap-2'>
            <p className='text-base'>{user.name}</p>
            <span className='text-xs text-gray-400'>&bull;</span>
            <p className='text-sm text-[#AAA]'>{formatDate(created_at)}</p>
          </div>
          <p className='text-[16px] text-[#AAA]'>{comment}</p>
          <div className='mt-2 flex'>
            <div className='flex items-center gap-2'>
              {/* <div
                onClick={() => updateLikeCount(id)}
                className='flex cursor-pointer flex-row gap-2'
              >
                {like ? (
                  <SolidHandThumbUpIcon width={20} height={20} />
                ) : (
                  <OutlineHandThumbUpIcon width={20} height={20} />
                )}

                <span>{like_count}</span>
              </div>
              <span className='text-xs text-gray-400'>&bull;</span>
              <div
                onClick={() => updateDisLikeCount(id)}
                className='flex cursor-pointer flex-row items-center gap-2'
              >
                {dislike ? (
                  <SolidHandThumbDownIcon width={20} height={20} />
                ) : (
                  <OutlineHandThumbDownIcon width={20} height={20} />
                )}
                <span>{dislike_count}</span>
              </div> */}
              {isParent && (
                <>
                  {/* <span className='text-xs text-gray-400'>&bull;</span> */}
                  <button onClick={toggleReply}>Reply</button>
                </>
              )}
            </div>
          </div>
          {showReply && (
            <div className='mt-2 flex flex-col gap-[21px]'>
              <div className='flex flex-row items-center gap-[16px]'>
                <Image
                  src={
                    userData.avatar_url
                      ? userData.avatar_url
                      : '/images/user.png'
                  }
                  alt={`${user.name}'s Avatar`}
                  className='h-[32px] rounded-full'
                  width={32}
                  height={32}
                />
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className='w-full border-b-1 bg-transparent bg-none pb-[10px] outline-none'
                  placeholder='Хариулах ...'
                />
              </div>
              <div className='flex flex-row justify-end'>
                <div className='flex gap-2'>
                  <button
                    onClick={toggleReply}
                    className='border-card px-3 py-2 transition-all duration-700 hover:scale-110'
                  >
                    Болих
                  </button>
                  <button onClick={addReply} className='button px-3 py-2'>
                    Хариулах
                  </button>
                </div>
              </div>
            </div>
          )}
          {replies && replies.length > 0 && (
            <div className='mt-4'>
              {replies.map((reply, index) => (
                <Question
                  message={message}
                  courseId={courseId}
                  isParent={false}
                  fetchData={fetchData}
                  key={index}
                  {...reply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comments
