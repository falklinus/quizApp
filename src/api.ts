import axios from 'axios'

export const getCategories = () =>
  axios
    .get('https://opentdb.com/api_category.php')
    .then((res) => res.data)
    .then((data) => data.trivia_categories)

export const getNumberOTotalQuestions = () =>
  axios
    .get(`https://opentdb.com/api_count_global.php`)
    .then((res) => res.data)
    .then((data) => data.overall.total_num_of_verified_questions)

export const getNumberOfQuestionsForCategoryAndDifficuly = (
  categoryId: number
) =>
  axios
    .get(`https://opentdb.com/api_count.php?category=${categoryId}`)
    .then((res) => res.data)
    .then((data) => data.category_question_count)

export const getQuizQuestions = ({
  amount,
  category,
  difficulty,
  type,
}: {
  amount: number
  category: string
  difficulty: string
  type: string
}) =>
  axios
    .get(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    )
    .then((res) => res.data)
    .then((data) => data.results)
