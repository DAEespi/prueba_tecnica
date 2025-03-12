export interface empleado {
  type: string
  id: number
  attributes: {
    first_name: string
    last_name: string
    email: string
    phone: string
    charge: string
    salary: number
    created_at: Date
    updated_at: Date
  }
  relationships: {
    workshifts: Array<{
      type: string
      id: number
      attributes: {
        name: string
        schedule_type: string
        maximun_weekly_hours: number
        created_at: Date
        updated_at: Date
      }
      relationships: {
        workshiftDays: Array<{
          type: string
          id: number
          attributes: {
            day: string
            start_at: string
            finished_at: string
            break_time_start_at: string | null
            break_time_finished_at: string | null
            created_at: Date | null
            updated_at: Date | null
          }
        }>
      }
    }>

    accessControls: Array<{
      type: string
      id: number
      attributes: {
        check_in: string
        check_out: string | null
        created_at: Date | null
        updated_at: Date | null
      }
    }>
  }
}
