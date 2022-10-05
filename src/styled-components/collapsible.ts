import styled from 'styled-components'

export const Interactible = styled.div`
  cursor: pointer;
  display: flex;
  text-align: left;
  align-items: center;
  padding-left: 1em;
  gap: 1em;
  border-radius: 4px;
  border: 1px solid;
  border-color: #242424;
  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.87);
  }
`

export const Caret = styled.span`
  margin-left: auto;
  border-left: 1px solid;
  padding: 1em;
  border-color: #242424;
  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.87);
  }
`

export const Content = styled.div`
  padding: 1em;
`
