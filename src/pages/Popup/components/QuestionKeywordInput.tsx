import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

interface QuestionNumberInputProps {
  value: string,
  onChange (value: string): void,
  onKeyArrowUp? (): void,
  onKeyArrowDown? (): void,
  loading: boolean,
  error?: unknown,
}

export default function QuestionKeywordInput (
  { value, onChange, onKeyArrowUp, onKeyArrowDown, loading, error }: QuestionNumberInputProps
) {
  const { t } = useTranslation()

  return (
    <div
      className={clsx('ts-input is-fluid is-start-icon', {
        'is-negative': error,
      })}
    >
      <span
        className={clsx(
          'ts-icon',
          loading ? 'is-spinning is-circle-notch-icon' : 'is-magnifying-glass-icon'
        )}
      />
      <input
        placeholder={t('input.questionKeyword.placeholder')}
        autoFocus
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.nativeEvent.isComposing) return
          const actions: Record<string, () => void> = {
            ArrowUp: () => onKeyArrowUp?.(),
            ArrowDown: () => onKeyArrowDown?.(),
          }
          actions[e.key]?.()
        }}
      />
    </div>
  )
}
