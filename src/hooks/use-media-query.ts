import { useMediaQuery as useMediaQueryTs } from 'usehooks-ts'

export function useMediaQuery(query: string): boolean {
  return useMediaQueryTs(query)
}