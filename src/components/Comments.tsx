import React, { FC, useRef, useState } from 'react'
import { CommentType } from '../types/comment'
import { Button, Form, Card as BootstrapCard } from 'react-bootstrap'
import { nanoid } from 'nanoid'
import api from '../api'
import Comment from './Comment'

interface CommentsProps {
  cardId: string
  comments: CommentType[]
}

const Comments: FC<CommentsProps> = ({ cardId, ...props }) => {
  const [comments, setComments] = useState<CommentType[]>(props.comments)

  const commentTextareaRef = useRef<HTMLTextAreaElement>(null)

  const addComment = () => {
    const comment = commentTextareaRef.current?.value
    if (comment) {
      const newComment: CommentType = {
        id: nanoid(),
        text: comment,
      }
      api.addComment({ id: cardId, comment: newComment })
      setComments((comments) => [...comments, newComment])
    }
  }

  const deleteComment = (commentId: string) => {
    setComments((comments) =>
      comments.filter((comment) => commentId !== comment.id)
    )
    api.deleteComment({ cardId, commentId })
  }

  return (
    <>
      <h5>Comments</h5>
      <Form.Control
        as='textarea'
        placeholder='Write some comment'
        ref={commentTextareaRef}
      />
      <Button onClick={addComment}>Add comment</Button>
      {comments.map(({ id, text }) => (
        <Comment
          key={id}
          cardId={cardId}
          commentId={id}
          deleteComment={deleteComment}
          text={text}
        />
      ))}
    </>
  )
}

export default Comments
