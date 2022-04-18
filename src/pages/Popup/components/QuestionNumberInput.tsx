import clsx from 'clsx'

interface QuestionNumberInputProps {
  value: string,
  onChange (value: string): void,
  loading: boolean,
}

export default function QuestionNumberInput (
  { value, onChange, loading }: QuestionNumberInputProps
) {
  return (
    <div className={'ts-input is-fluid is-start-icon'}>
      <span
        className={clsx(
          'ts-icon',
          loading ? 'is-spinning is-circle-notch-icon' : 'is-hashtag-icon')
        }
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
