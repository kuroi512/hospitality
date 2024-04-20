export type AboutType = {
  teacher: {
    id: number
    name: string
    position: string
    description: string
    avatar_url: string
  }
  description: string
  learnables: {
    icon: string
    text: string
  }[]
}

export type LessonType = {
  id: number
  locked: boolean
  title: string
  thumbnail_url: string
  purchase_count: number
  description: string
  price: string
  type: number
  star: number
  duration: number
}

export type CommentType = {
  id: number
  user: {
    name: string
    avatar_url: string
  }
  rating?: number
  created_at: string
  comment: string
  liked?: boolean
  disliked?: boolean
  like_count?: number
  dislike_count?: number
  replies?: CommentType[]
  reply_id: number | null
}

export type RatingType = {
  rate: number
  user: {
    name: string
    avatar_url: string
  }
  comment: string
  created_at: string
}

export type ContentType = {
  title: string
  price: number
  lessons: LessonType[]
  about: AboutType
  comments: CommentType[]
  rates: RatingType
}
