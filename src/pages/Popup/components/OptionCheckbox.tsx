import clsx from 'clsx'
import styled from 'styled-components'

const Label = styled.label({
  position: 'relative',
})

const HiddenInput = styled.input({
  position: 'absolute',
  opacity: 0,
  '&:focus + div': {
    outline: '5px auto -webkit-focus-ring-color',
  },
})

type OptionCheckboxProps = Pick<JSX.IntrinsicElements['input'], 'checked' | 'disabled'> & {
  title: string,
  icon: string,
  onChange (checked: boolean): void,
}

export default function OptionCheckbox ({ title, icon, disabled, checked, onChange, ...restProps }: OptionCheckboxProps) {
  return (
    <Label className="ts-box">
      <HiddenInput
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange(e.target.checked)}
        {...restProps}
      />
      <div
        className={clsx('ts-content is-interactive is-dense', {
          'is-active': checked,
          'is-disabled': disabled,
        })}
      >
        <div className="ts-iconset is-outlined">
          <span className={clsx('ts-icon', `is-${icon}-icon`)} />
          <div className="content">
            <div className="title">{title}</div>
            <div className="ts-text is-tiny">
              {checked ? 'Enabled' : 'Disabled'}
            </div>
          </div>
        </div>
      </div>
    </Label>
  )
}
