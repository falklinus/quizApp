import useCreateQuiz from '../hooks/useCreateQuiz'
import * as Styled from '../styled-components/landing'
import { toast } from 'react-hot-toast'
import { Collapsible } from './Collapsible'

export const Landing = () => {
  const {
    categories,
    selectCategory,
    selectDifficulty,
    avalibaleQuestions,
    selectedNumberOfQuestions,
    selectNumberOfQuestions,
    selectType,
    create,
    questions,
  } = useCreateQuiz()

  return (
    <Styled.Container>
      <Styled.Form
        onSubmit={async (event) => {
          event.preventDefault()
          await toast.promise(create(), {
            loading: 'Creating quiz',
            success: 'Quiz created!',
            error: 'Something went wrong :(',
          })
        }}
      >
        <Styled.Label>
          Select category
          <select
            onChange={({ currentTarget: { value } }) => selectCategory(+value)}
          >
            <option value=''>Mixed</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Styled.Label>
        <Styled.Label>
          Select difficulty
          <select
            onChange={({ currentTarget: { value } }) => selectDifficulty(value)}
          >
            <option value=''>Mixed</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </Styled.Label>
        <Styled.Label>
          Select number of questions
          <input
            type='number'
            min={0}
            max={avalibaleQuestions}
            value={selectedNumberOfQuestions}
            onChange={({ currentTarget: { value } }) =>
              selectNumberOfQuestions(+value)
            }
          />
        </Styled.Label>
        <Styled.Label>
          Select type
          <select
            onChange={({ currentTarget: { value } }) => selectType(value)}
          >
            <option value=''>Any type</option>
            <option value='multiple'>Multiple choice</option>
            <option value='boolean'>True or False</option>
          </select>
        </Styled.Label>
        <button>Create quiz</button>
      </Styled.Form>

      {questions.map((question) => (
        <Collapsible
          key={question.question}
          component={
            <p dangerouslySetInnerHTML={{ __html: question.question }} />
          }
        >
          {question.correct_answer}
        </Collapsible>
      ))}
    </Styled.Container>
  )
}
