import { ReactNode, useState } from 'react'
import * as Styled from '../styled-components/collapsible'

export const Collapsible = ({
  children,
  component,
  text,
}: {
  children?: ReactNode
  component?: ReactNode
  text?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <Styled.Interactible onClick={() => setIsOpen((prev) => !prev)}>
        {component ? component : text ? text : 'Open'}
        <Styled.Caret>{isOpen ? '<' : '>'}</Styled.Caret>
      </Styled.Interactible>
      {isOpen && <Styled.Content>{children}</Styled.Content>}
    </div>
  )
}
