import { CardType } from '../types/card'
import { CommentType } from '../types/comment'

const saveCards = (card: CardType[]) => {
  localStorage.setItem('cards', JSON.stringify(card))
}

const api = {
  getCards() {
    const cards: CardType[] = JSON.parse(localStorage.getItem('cards') ?? '[]')
    return cards
  },

  addCard(card: CardType) {
    const cards: CardType[] = this.getCards()
    cards.push(card)
    saveCards(cards)
  },

  deleteCard(cardId: string) {
    const cards: CardType[] = this.getCards()
    const newCards = cards.filter((card) => card.id !== cardId)
    saveCards(newCards)
  },

  updateTitle({ cardId, title }: { cardId: string; title: string }) {
    const cards = this.getCards()
    const newCards = cards.map((card) => {
      if (card.id === cardId) {
        return { ...card, title }
      }
      return card
    })
    saveCards(newCards)
  },

  updateDescription({ id, description }: { id: string; description: string }) {
    const cards = this.getCards()

    const newCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, description }
      }
      return card
    })

    saveCards(newCards)
  },

  addComment({ id, comment }: { id: string; comment: CommentType }) {
    const cards = this.getCards()
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, comments: [...card.comments, comment] }
      }
      return card
    })

    saveCards(newCards)
  },

  updateComment({
    cardId,
    commentId,
    text,
  }: {
    cardId: string
    commentId: string
    text: string
  }) {
    const cards = this.getCards()

    const newCards = cards.map((card) => {
      if (cardId === card.id) {
        return {
          ...card,
          comments: card.comments.map((comment) => {
            if (commentId === comment.id) {
              return { ...comment, text }
            }
            return comment
          }),
        }
      }
      return card
    })

    saveCards(newCards)
  },

  deleteComment({ cardId, commentId }: { cardId: string; commentId: string }) {
    const cards = this.getCards()

    const newCards = cards.map((card) => {
      if (card.id === cardId) {
        return {
          ...card,
          comments: card.comments.filter((comment) => commentId !== comment.id),
        }
      }
      return card
    })

    saveCards(newCards)
  },
}

export default api
