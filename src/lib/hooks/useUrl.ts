import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useUrl() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams()

  searchParams?.forEach((value, key) => {
    params.append(key, value)
  })

  const url = params.toString() ? `${pathname}?${params}` : pathname

  return {
    url,
    ...router,
    append: (...arg: [key: string, value: any][]) => {
      const newParams = new URLSearchParams(params)
      if (Array.isArray(arg)) {
        arg.map(([key, value]) => {
          newParams.set(key, String(value))
        })
      }
      const result = newParams.toString() ? `${pathname}?${newParams}` : pathname
      return result as string
    },
    remove: (keys: string[]) => {
      const newParams = new URLSearchParams(params)
      keys.map((key) => newParams.delete(key))
      const result = newParams.toString() ? `${pathname}?${newParams}` : pathname
      return result as string
    },
    get: (key: string) => searchParams?.get(key),
    has: (key: string, value?: string) => value ? searchParams?.get(key) === value : !!searchParams?.get(key),
  }
}
