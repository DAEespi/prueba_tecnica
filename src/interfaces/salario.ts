export interface ExtraHoursCategories {
  HED: number // Horas extras diurnas
  HEN: number // Horas extras nocturnas
  HEDD: number // Horas extras diurnas festivas/dominicales
  HEDN: number // Horas extras nocturnas festivas/dominicales
  RC: number // Recargo nocturno
  RD: number // Recargo dominical
  RND: number // Recargo nocturno dominical
}

export interface WorkedHours {
  regularHours: number
  extraHours: ExtraHoursCategories
}
