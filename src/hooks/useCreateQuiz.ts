import { useEffect, useMemo, useState } from 'react'
import {
  getCategories,
  getNumberOfQuestionsForCategoryAndDifficuly,
  getNumberOTotalQuestions,
  getQuizQuestions,
} from '../api'

type TCategory = {
  id: number
  name: string
}

type TQuestion = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: 'boolean' | 'multiple'
}

const useCreateQuiz = () => {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<TCategory[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >()
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [
    availableNumberOfQuestionsInCategory,
    setAvailableNumberOfQuestionsInCategory,
  ] = useState<number | undefined>()
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] = useState(10)
  const [selectedType, setSelectedType] = useState('')
  const [questions, setQuestions] = useState<TQuestion[]>([])

  useEffect(() => {
    setLoading(true)
    getCategories().then((categories) => {
      setLoading(false)
      setCategories(categories)
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    if (selectedCategoryId) {
      getNumberOfQuestionsForCategoryAndDifficuly(selectedCategoryId).then(
        (map) => {
          setLoading(false)
          setAvailableNumberOfQuestionsInCategory(
            map[
              `total_${
                selectedDifficulty ? `${selectedDifficulty}_` : ''
              }question_count`
            ]
          )
        }
      )
    } else {
      getNumberOTotalQuestions().then((number) => {
        setLoading(false)
        setAvailableNumberOfQuestionsInCategory(number)
      })
    }
  }, [selectedCategoryId, selectedDifficulty])

  const create = () =>
    getQuizQuestions({
      amount: selectedNumberOfQuestions,
      category: selectedCategoryId?.toString() ?? '',
      difficulty: selectedDifficulty,
      type: selectedType,
    }).then(setQuestions)

  return {
    loading,
    categories,
    selectCategory: setSelectedCategoryId,
    selectDifficulty: setSelectedDifficulty,
    avalibaleQuestions: availableNumberOfQuestionsInCategory,
    selectNumberOfQuestions: setSelectedNumberOfQuestions,
    selectedNumberOfQuestions,
    selectType: setSelectedType,
    create,
    questions,
  }
}

export default useCreateQuiz
