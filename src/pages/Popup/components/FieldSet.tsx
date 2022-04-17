import React from 'react'

interface FieldSetProps {
  title: string,
  children: React.ReactNode,
}

export default function FieldSet ({ title, children }: FieldSetProps) {
  return (
    <fieldset className="ts-fieldset">
      <legend>{title}</legend>
      {children}
    </fieldset>
  )
}
