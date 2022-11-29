import { CommentType } from './comment'

export type CardType = {
  id: string
  title: string
  description: string
  comments: CommentType[]
}
