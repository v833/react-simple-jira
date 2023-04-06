import styled from '@emotion/styled'
import { Spin } from 'antd'
import { DevTools } from 'jira-dev-tool'

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

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FullPageLoading = ({ error }: { error?: Error | null }) => {
  return (
    <FullPage>
      <Spin />
    </FullPage>
  )
}

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <DevTools />
      <p>网络错误，请刷新重试</p>
    </FullPage>
  )
}
