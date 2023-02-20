import React, { Component, ReactNode } from 'react'

interface Props {
  msg?: ReactNode
  children: ReactNode
}

export class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  static getDerivedStateFromError(_error: any) {
    return { hasError: true }
  }

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: any, _errorInfo: any) {
    console.error(error)
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.children !== this.props.children) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return typeof this.props.msg === 'undefined'
        ? 'Render error'
        : this.props.msg
    }
    return this.props.children
  }
}
