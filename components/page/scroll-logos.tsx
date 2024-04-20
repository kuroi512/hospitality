import { Image } from '@nextui-org/react'

const ScrollLogos = ({ logos }: { logos: { primary_logo_url: string }[] }) => {
  return (
    <ul
      className='inline-flex h-20 items-center justify-around'
      style={{
        animation: `scroll ${logos.length * 4}s linear infinite`
      }}
    >
      {logos.map((logo: any, index: number) => (
        <li
          key={logo.primary_logo_url + '-' + index}
          className='mx-20 flex h-20 min-w-max items-center justify-center'
        >
          <Image
            src={logo.primary_logo_url}
            className='h-20 rounded-none object-cover'
          />
        </li>
      ))}
    </ul>
  )
}

export default ScrollLogos
