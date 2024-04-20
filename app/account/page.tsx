'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/layout/footer'
import ContentCard from '@/components/page/content-card'
import { Pagination, Divider } from '@nextui-org/react'
import axios from 'axios'
import { getToken } from '@/utils/token'

export default function Account() {
  const [activePage, setActivePage] = useState(1)
  const [paginationTotal, setPaginationTotal] = useState<number>(1)
  const [activeCategory, setActiveCategory] = useState(0)
  const [categories, setCategories] = useState<any>([])
  const [contents, setContents] = useState<any>([])

  async function getInitialDatas() {
    const token = await getToken()
    try {
      await axios
        .get(`${process.env.HELPER_API_URL}/categories`)
        .then(({ status, data }) => {
          if (status === 200) {
            setCategories(data)
          }
        })
      await axios
        .get(`${process.env.USER_API_URL}/video-course`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(({ status, data }) => {
          if (status === 200) {
            setContents(data)
          }
        })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getInitialDatas()
    setPaginationTotal(
      contents.length === 0 ? 1 : Math.ceil(contents.length / 9)
    )
  }, [])

  return (
    <div>
      <div
        className={`flex w-full flex-col justify-center bg-black bg-[url('/images/mobile-bg.png')] bg-cover bg-no-repeat pt-[88px] text-white xl:px-32 xl:pt-40`}
      >
        <div className='mx-auto flex w-full max-w-[1200px] flex-col justify-center'>
          <span className='self-start text-2xl uppercase md:pb-5'>
            Миний булан
          </span>
          <Divider style={{ backgroundColor: '#E54900' }} />
          <div className='mt-3 hidden xl:block'>
            <p className='bg-gradient-to-r  from-[#FEFAF4] to-[#F3CF8E] bg-clip-text text-[28px] text-transparent'>
              {
                categories.find(
                  (category: any) => category.id == activeCategory
                )?.name
              }
            </p>
            <p className='mt-[10px] text-[16px] text-gray-400'>
              Таны худалдаж авсан хичээлүүд
            </p>
          </div>
          {/* div for mobile */}
          <div className='flex w-full flex-col gap-3 px-5 xl:hidden'>
            <p className='bg-gradient-to-r from-[#FEFAF4] to-[#F3CF8E] bg-clip-text text-base text-transparent'>
              Ангилал сонгох
            </p>
            <div className='flex flex-row gap-3 overflow-y-hidden overflow-x-scroll pb-2 xl:hidden'>
              {categories.map((category: any) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.id)}
                  className={`${
                    category.id == activeCategory
                      ? 'button'
                      : 'border border-[#727172] hover:border-none'
                  } hover:button m-1 flex h-8 w-full max-w-max items-center justify-between px-2 py-1`}
                >
                  <p className='whitespace-nowrap text-left text-[13px] font-normal'>
                    {category.name}
                  </p>
                </button>
              ))}
            </div>
            <Divider style={{ backgroundColor: '#E54900' }} />
            <p className='text-xl font-medium'>
              {
                categories.find(
                  (category: any) => category.id == activeCategory
                )?.name
              }
            </p>
            <p className='text-sm text-gray-400'>
              Та дараах ур чадваруудаас сонгож онлайн хичээлээ судлах боломжтой
            </p>
          </div>

          <div className='mt-8 flex w-full'>
            <div className='hidden h-64 w-full max-w-[285px] flex-col gap-3 leading-[22.4px] xl:flex'>
              {categories.map((category: any) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.id)}
                  className={`${
                    category.id == activeCategory ? 'button' : ''
                  } hover:button flex w-full items-center justify-between px-6 py-4`}
                >
                  <p className='text-left text-[16px] font-light'>
                    {category.name}
                  </p>
                  <p className='text-[16px] font-light'>
                    {category.id === 0
                      ? contents.length
                      : contents.filter(
                          (content: any) => category.id === content.type
                        ).length}
                  </p>
                </button>
              ))}
            </div>
            <div className='mx-5 flex w-full flex-col xl:mx-14'>
              <div className='grid grid-cols-1 place-items-center gap-[12px] sm:grid-cols-2 md:grid-cols-3 xl:gap-[20px]'>
                {contents.map((content: any) =>
                  activeCategory === 0 ? (
                    <ContentCard key={content.title} {...content} />
                  ) : (
                    content.type === activeCategory && (
                      <ContentCard key={content.title} {...content} />
                    )
                  )
                )}
              </div>
              <div className='mb-14 mt-10 flex w-full items-center justify-center'>
                <Pagination
                  total={paginationTotal}
                  initialPage={1}
                  page={activePage}
                  onChange={(page: number) => {
                    setActivePage(page)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
