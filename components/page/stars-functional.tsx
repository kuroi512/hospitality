'use client'

import Image from 'next/image'

const StarsFunctional = ({ rating, setRating }: any) => {
  const stars: JSX.Element[] = []

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Image
        onClick={() => setRating(i)}
        src={i <= rating ? '/svg/star-filled.svg' : '/svg/star-empty.svg'}
        alt={''}
        height={32}
        width={32}
      />
    )
  }
  return stars
}
export default StarsFunctional
