'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Image
} from '@nextui-org/react'
import { useUserContext } from '@/context/user'

import {
  ArrowDownTrayIcon,
  Bars3Icon,
  UserIcon,
  UserCircleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

const Navbar = () => {
  const { userData, logout } = useUserContext()
  const [navColor, setNavColor] = useState('')

  useEffect(() => {
    if (window.scrollY > 150) {
      bgClass()
    } else {
      if (location.pathname.includes('/blog')) {
        bgClass()
      } else {
        setNavColor('')
      }
    }

    const checkScroll = () => {
      if (window.scrollY > 100) {
        bgClass()
      } else {
        if (location.pathname.includes('/blog')) {
          bgClass()
        } else {
          setNavColor('')
        }
      }
    }

    window.addEventListener('scroll', checkScroll)

    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const bgClass = () => {
    if (location.pathname === '/') {
      if (window.scrollY > 300) {
        setNavColor('bg-[#111111] shadow-lg')
      } else {
        setNavColor('')
      }
    } else {
      if (location.pathname.includes('/blog')) {
        setNavColor('bg-[#000000] shadow-lg')
      } else {
        setNavColor('bg-[#111111] shadow-lg')
      }
    }
  }

  return (
    <nav
      className={`fixed left-0 top-0 z-40 flex h-20 w-full items-center justify-between whitespace-nowrap px-6 text-white md:px-10 lg:px-14 xl:px-32 ${navColor}`}
    >
      <Link href='/' className='w-full max-w-max'>
        <Image src='/images/logo.png' alt='Logo' className='h-full w-full' />
      </Link>
      <div className='lg:hidden'>
        <Dropdown>
          <DropdownTrigger>
            <Button variant='light' color='success' isIconOnly size='sm'>
              <Bars3Icon width={20} height={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label='Mobile Hamburger'>
            <DropdownItem href='/' key='home'>
              Нүүр хуудас
            </DropdownItem>
            <DropdownItem href='/content' key='content'>
              Контент
            </DropdownItem>
            <DropdownItem href='/contact-us' key='contact'>
              Холбоо барих
            </DropdownItem>
            <DropdownItem
              href='/sign-up'
              key='sign-up'
              className={userData.id ? 'hidden' : ''}
            >
              Бүртгүүлэх
            </DropdownItem>
            <DropdownItem
              href='/sign-in'
              key='sign-in'
              className={userData.id ? 'hidden' : ''}
            >
              Нэвтрэх
            </DropdownItem>
            <DropdownItem
              href='/account'
              key='account'
              className={userData.id ? '' : 'hidden'}
            >
              Профайл
            </DropdownItem>
            <DropdownItem
              key='logout'
              onClick={() => logout(true)}
              className={`text-red-500 hover:text-red-500 ${userData.id ? '' : 'hidden'}`}
            >
              Гарах
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className='hidden items-center lg:flex'>
        <div className='flex w-full items-center gap-x-14 px-14'>
          <Link href='/' className='hover:navbar-button'>
            Нүүр хуудас
          </Link>
          <Link href='/content' className='hover:navbar-button'>
            Контент
          </Link>
          <Link href='/contact-us' className='hover:navbar-button'>
            Холбоо барих
          </Link>
        </div>
        {userData.id ? (
          <Dropdown>
            <DropdownTrigger>
              <a
                onClick={(e) => e.preventDefault()}
                className='flex cursor-pointer flex-row items-center gap-x-2'
              >
                {userData.avatar_url ? (
                  <Image src={userData.avatar_url} alt='Avatar' width={30} />
                ) : (
                  <UserCircleIcon width={30} height={30} />
                )}
                {userData.name}
                <ChevronDownIcon width={15} height={15} />
              </a>
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile menu'>
              <DropdownItem href='/account' key='account'>
                Профайл
              </DropdownItem>
              <DropdownItem
                key='logout'
                onClick={() => logout(true)}
                className='text-red-500 hover:text-red-500'
              >
                Гарах
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className='flex items-center gap-x-3'>
            <Link
              href='/sign-up'
              className='border-button flex items-center gap-x-1.5 bg-transparent px-3 py-1'
            >
              <UserIcon width={20} height={20} />
              Бүртгүүлэх
            </Link>
            <Link
              href='/sign-in'
              className='button flex items-center gap-x-1.5 px-3 py-[7.5px]'
            >
              <ArrowDownTrayIcon
                width={20}
                height={20}
                className='-rotate-90'
              />
              Нэвтрэх
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
