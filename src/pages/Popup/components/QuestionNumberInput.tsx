interface QuestionNumberInputProps {
  value: string,
  onChange (value: string): void,
}

export default function QuestionNumberInput ({ value, onChange }: QuestionNumberInputProps) {
  return (
    <input
      type="number"
      placeholder="Enter Question Number..."
      autoFocus
      value={value}
      onChange={e => onChange(e.target.value.replace(/\D+/, '').slice(0, 4))}
    />
  )
}
