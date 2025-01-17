import { useEffect, useState, useMemo } from 'react'

export const usePortal = ({
  id,
}: {
  id: string
}): { element: HTMLDivElement | undefined } => {
  const [element, elementChange] = useState<HTMLDivElement | undefined>()
  useEffect(() => {
    const parent = document.getElementById(id)
    const attach = document.createElement('div')
    elementChange(attach)
    if (parent) parent.appendChild(attach)
    return () => {
      elementChange(undefined)
      attach.remove()
    }
  }, [id])
  // eslint-disable-next-line
  return useMemo(() => ({ element }), [element])
}
