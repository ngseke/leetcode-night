import clsx from 'clsx'

interface QuestionNumberInputProps {
  value: string,
  onChange (value: string): void,
  loading: boolean,
  error?: unknown,
}

export default function QuestionNumberInput (
  { value, onChange, loading, error }: QuestionNumberInputProps
) {
  return (
    <div
      className={clsx('ts-input is-fluid is-start-icon', {
        'is-negative': error,
      })}
    >
      <span
        className={clsx(
          'ts-icon',
          loading ? 'is-spinning is-circle-notch-icon' : 'is-hashtag-icon'
        )}
      />
      <input
        type="number"
        placeholder="Enter Question Number..."
        autoFocus
        value={value}
        onChange={e => onChange(e.target.value.replace(/\D+/, '').slice(0, 4))}
      />
    </div>
  )
}
