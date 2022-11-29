import { nanoid } from 'nanoid'
import React, { useState, useMemo } from 'react'
import {
  Button,
  FloatingLabel,
  Form,
  CloseButton,
  Card as BootstrapCard,
  Col,
} from 'react-bootstrap'
import api from '../api'
import { CardType } from '../types/card'
import Card from './Card'
import styles from './CardsColumn.module.css'

const CardsColumn = () => {
  const [cards, setCards] = useState<CardType[]>([])
  const [addingCard, setAddingCard] = useState(false)
  const [cardTitle, setCardTitle] = useState('')

  const disableAddingCard = () => {
    setAddingCard(false)
    setCardTitle('')
  }

  useMemo(() => {
    setCards(api.getCards())
  }, [])

  const addCard = () => {
    if (addingCard) {
      const newCard: CardType = {
        id: nanoid(),
        title: cardTitle,
        comments: [],
        description: '',
      }

      setCards((cards) => [...cards, newCard])
      api.addCard(newCard)

      disableAddingCard()
    } else {
      setAddingCard(true)
    }
  }

  return (
    <div className='d-flex justify-content-center'>
      <Col xs={3}>
        <BootstrapCard className='p-10' bg='d-flex gap-2'>
          {cards.map((card) => (
            <Card {...card} key={card.id} setCards={setCards} />
          ))}
          {addingCard && (
            <>
              <FloatingLabel controlId='cardTitleTextarea' label='Card title'>
                <Form.Control
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                />
              </FloatingLabel>
            </>
          )}
          <div className='d-flex justify-content-center align-items-center'>
            <Button variant='light' onClick={addCard}>
              Add card
            </Button>
            {addingCard && <CloseButton onClick={disableAddingCard} />}
          </div>
        </BootstrapCard>
      </Col>
    </div>
  )
}

export default CardsColumn
