import React, { FC, useState, useRef } from 'react'
import { Button, Form, Card as BootstrapCard } from 'react-bootstrap'
import api from '../api'

interface CommentPropos {
  cardId: string
  commentId: string
  text: string
  deleteComment: (commentId: string) => void
}

const Comment: FC<CommentPropos> = ({
  cardId,
  commentId,
  deleteComment,
  ...props
}) => {
  const [commentEditor, setCommentEditor] = useState(false)
  const [text, setText] = useState(props.text)

  const commentTextareaRef = useRef<HTMLTextAreaElement>(null)

  const toggleCommentEditor = () => {
    setCommentEditor((commentEditor) => !commentEditor)
  }

  const handleDeleteComment = () => deleteComment(commentId)

  const saveEditedComment = () => {
    const comment = commentTextareaRef.current?.value

    if (comment) {
      api.updateComment({ cardId, commentId, text: comment })
      setText(comment)
    }

    toggleCommentEditor()
  }

  if (commentEditor) {
    return (
      <>
        <Form.Control
          as='textarea'
          ref={commentTextareaRef}
          placeholder='Write some comment'
          defaultValue={text}
        />
        <div className='d-flex gap-2'>
          <Button variant='primary' onClick={saveEditedComment}>
            Save
          </Button>
          <Button variant='danger' onClick={toggleCommentEditor}>
            Cancel
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <BootstrapCard key={commentId} className='p-2'>
        {text}
      </BootstrapCard>
      <div className='d-flex gap-2'>
        <Button variant='primary' onClick={toggleCommentEditor}>
          Edit comment
        </Button>
        <Button variant='danger' onClick={handleDeleteComment}>
          Delete comment
        </Button>
      </div>
    </>
  )
}

export default Comment
