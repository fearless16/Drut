import type { EnvVar } from '@/context/EnvContext'

export function resolveEnvVars(input: string, variables: EnvVar[]): string {
  return input.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const found = variables.find((v) => v.key === key)
    return found?.value ?? `{{${key}}}`
  })
}
