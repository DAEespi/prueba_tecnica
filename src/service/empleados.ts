import { data } from './data'
import { empleado } from '@/interfaces/empleado'

export type Pagination = {
  total: number
  limit: number
  totalPages: number
  page: number
  prevPage: number | null
  nextPage: number | null
}

export type EmpleadosResponse = {
  empleados: empleado[]
  pagination: Pagination
}

export const getEmpleados = (
  page: number = 1,
  limit: number = 10,
  searchTerm: string = ''
): EmpleadosResponse => {
  const searchLower = searchTerm.toLocaleLowerCase().trim()

  const empleadosFlitrados = data.data.filter((emp) => {
    return (
      emp.attributes.first_name.toLocaleLowerCase().includes(searchLower) ||
      emp.attributes.last_name.toLocaleLowerCase().includes(searchLower) ||
      emp.attributes.email.toLocaleLowerCase().includes(searchLower) ||
      emp.attributes.charge.toLocaleLowerCase().includes(searchLower)
    )
  })

  const total = empleadosFlitrados.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  // const empleados = data.data.slice(startIndex, endIndex);

  const empleados: empleado[] = empleadosFlitrados.slice(startIndex, endIndex).map((emp) => ({
    type: emp.type,
    id: emp.id,
    attributes: {
      ...emp.attributes,
      first_name: emp.attributes.first_name,
      last_name: emp.attributes.last_name,
      email: emp.attributes.email,
      phone: emp.attributes.phone,
      charge: emp.attributes.charge,
      salary: emp.attributes.salary,
      created_at: new Date(emp.attributes.created_at),
      updated_at: new Date(emp.attributes.updated_at)
    },

    relationships: {
      workshifts: emp.relationships.workshifts.map((shift) => ({
        type: shift.type,
        id: shift.id,
        attributes: {
          ...shift.attributes,
          name: shift.attributes.name,
          schedule_type: shift.attributes.schedule_type,
          maximun_weekly_hours: shift.attributes.maximun_weekly_hours,
          created_at: new Date(shift.attributes.created_at),
          updated_at: new Date(shift.attributes.updated_at)
        },
        relationships: {
          workshiftDays: shift.relationships.workshiftDays.map((day) => ({
            type: day.type,
            id: day.id,
            attributes: {
              ...day.attributes,
              day: day.attributes.day,
              start_at: day.attributes.start_at,
              finished_at: day.attributes.finished_at,
              break_time_start_at: day.attributes.break_time_start_at ?? null,
              break_time_finished_at: day.attributes.break_time_finished_at ?? null,
              created_at: day.attributes.created_at ? new Date(day.attributes.created_at) : null,
              updated_at: day.attributes.updated_at ? new Date(day.attributes.updated_at) : null
            }
          }))
        }
      })),
      accessControls: emp.relationships.accessControls.map((access) => ({
        type: access.type,
        id: access.id,
        attributes: {
          ...access.attributes,
          check_in: access.attributes.check_in,
          check_out: access.attributes.check_out ?? null,
          created_at: access.attributes.created_at ? new Date(access.attributes.created_at) : null,
          updated_at: access.attributes.updated_at ? new Date(access.attributes.updated_at) : null
        }
      }))
    }
  }))

  return {
    empleados,
    pagination: {
      total,
      limit,
      totalPages,
      page,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null
    }
  }
}
