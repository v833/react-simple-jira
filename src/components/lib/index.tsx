import styled from '@emotion/styled'

type RowProps = {
  gap?: number
  between?: boolean
  marginBottom?: number
}

export const Row = styled.div<RowProps>`
  display: flex;
  align-items: center;
  ${({ between }) => between && 'justify-content: space-between;'};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom + 'rem' : 0)};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${({ gap }) => (typeof gap === 'number' ? gap + 'rem' : gap)};
  }
`
