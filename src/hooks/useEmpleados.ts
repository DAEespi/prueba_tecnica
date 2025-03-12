import { useState, useEffect } from 'react'
import { getEmpleados,Pagination } from '@/service/empleados'
import { empleado } from '@/interfaces/empleado'


export function useEmpleados(initialPage = 1, initialLimit = 10) {
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)
  const [searchTerm, setSearchTerm] = useState('')
  const [empleados, setEmpleados] = useState<empleado[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    limit:initialLimit,
    page:initialPage,
    totalPages: 1,
    prevPage: null,
    nextPage: null
  })

  useEffect(() => {
    const response = getEmpleados(page, limit, searchTerm)
    setEmpleados(response.empleados)
    setPagination(response.pagination)
  }, [page, limit, searchTerm])

  return { empleados, pagination, page, setPage, limit, setLimit, searchTerm, setSearchTerm }
}
