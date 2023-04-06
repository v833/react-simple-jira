import React from 'react'

// children
// fallbackRender

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends React.Component<
  // 可以将children省略
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null }
  // 会在组件渲染过程中，子组件抛出异常后被调用
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({ error })
    }
    return children
  }
}
