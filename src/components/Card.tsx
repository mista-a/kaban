import React, { FC, useState, useRef } from 'react'
import { CardType } from '../types/card'
import {
  Button,
  Modal,
  Form,
  InputGroup,
  CloseButton,
  Col,
} from 'react-bootstrap'
import api from '../api'
import Comments from './Comments'

interface CardProps extends CardType {
  setCards: (cards: CardType[] | ((cards: CardType[]) => CardType[])) => void
}

const Card: FC<CardProps> = ({ setCards, id, comments, ...props }) => {
  const [expandCard, setExpandCard] = useState(false)
  const [description, setDescription] = useState(props.description)
  const [descriptionEditor, setDescriptionEditor] = useState(false)
  const [title, setTitle] = useState(props.title)
  const [titleEditor, setTitleEditor] = useState(false)

  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const toggleCard = () => setExpandCard((expandCard) => !expandCard)

  const toggleTitleEditor = () => setTitleEditor((titleEditor) => !titleEditor)
  const saveTitle = () => {
    const title = titleInputRef.current?.value

    if (title) {
      api.updateTitle({ cardId: id, title })
      setTitle(title)
    }
    toggleTitleEditor()
  }

  const toggleDescriptionEditor = () => {
    setDescriptionEditor((descriptionEidtor) => !descriptionEidtor)
  }

  const cancleDescriptionChanges = () => setDescriptionEditor(false)
  const saveDescriptionChanges = () => {
    if (descriptionTextareaRef?.current) {
      const description = descriptionTextareaRef.current.value

      api.updateDescription({ id, description })
      setDescription(description)
    }

    setDescriptionEditor(false)
  }

  const deleteCard = () => {
    api.deleteCard(id)
    setCards((cards: CardType[]) => {
      return cards.filter((card) => card.id !== id)
    })
  }

  return (
    <>
      <div className='d-flex align-items-center'>
        <Col xs={11}>
          <Button variant='light' onClick={toggleCard} className='w-100'>
            {title}
          </Button>
        </Col>
        <Col xs={1}>
          <CloseButton onClick={deleteCard} />
        </Col>
      </div>
      <Modal show={expandCard} onHide={toggleCard} centered>
        <Modal.Body className='d-flex gap-2 flex-column'>
          {titleEditor ? (
            <InputGroup>
              <Form.Control defaultValue={title} ref={titleInputRef} />
              <Button variant='outline-secondary' onClick={saveTitle}>
                Save
              </Button>
            </InputGroup>
          ) : (
            <Button variant='light' onClick={toggleTitleEditor}>
              <span className='h4'>{title}</span>
            </Button>
          )}
          <div className='d-flex align-items-center gap-2'>
            <h5>Description</h5>
            <Button variant='light' onClick={toggleDescriptionEditor}>
              {description ? 'Edit' : 'Add decription'}
            </Button>
          </div>
          {descriptionEditor ? (
            <>
              <Form.Control
                as='textarea'
                placeholder='Add a more detailed description'
                style={{ height: '100px' }}
                ref={descriptionTextareaRef}
                defaultValue={description}
              />
              <div className='d-flex gap-2'>
                <Button variant='primary' onClick={saveDescriptionChanges}>
                  Save
                </Button>
                <Button variant='light' onClick={cancleDescriptionChanges}>
                  Cancle
                </Button>
              </div>
            </>
          ) : (
            <p>{description}</p>
          )}
          <Comments cardId={id} comments={comments} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Card
