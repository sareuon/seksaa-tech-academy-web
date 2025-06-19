import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveValue(value?: string | number | string[]): R
      toHaveClass(className?: string): R
      toHaveAttribute(attr: string, value?: string): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toHaveTextContent(text?: string | RegExp): R
      toHaveFocus(): R
      toBeChecked(): R
      toBeRequired(): R
      toBeValid(): R
      toBeInvalid(): R
      toHaveStyle(style: Record<string, any>): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
    }
  }
} 