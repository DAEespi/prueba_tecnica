import dayjs from 'dayjs'
import { ExtraHoursCategories, WorkedHours } from '@/interfaces/salario'

// Factores de incremento salarial por tipo de hora extra
const EXTRA_RATES: Record<keyof ExtraHoursCategories, number> = {
  HED: 1.25, // Horas extras diurnas (25% adicional)
  HEN: 1.75, // Horas extras nocturnas (75% adicional)
  HEDD: 2.0, // Horas extras diurnas en festivo/dominical (100% adicional)
  HEDN: 2.5, // Horas extras nocturnas en festivo/dominical (150% adicional)
  RC: 1.35, // Recargo nocturno (35% adicional)
  RD: 1.75, // Recargo dominical o festivo (75% adicional)
  RND: 2.1 // Recargo nocturno dominical (110% adicional)
}

// Determinar la categoría de la hora extra según el horario
const getExtraHourCategory = (time: dayjs.Dayjs): keyof ExtraHoursCategories => {
  const isSunday = time.day() === 0
  const isNight = time.hour() >= 21 || time.hour() < 6

  if (isSunday) return isNight ? 'HEDN' : 'HEDD'
  return isNight ? 'HEN' : 'HED'
}

// Categorizar las horas extras trabajadas
export const categorizeExtraHours = (
  checkIn: string,
  checkOut: string,
  extraHours: number
): ExtraHoursCategories => {
  const categories: ExtraHoursCategories = {
    HED: 0,
    HEN: 0,
    HEDD: 0,
    HEDN: 0,
    RC: 0,
    RD: 0,
    RND: 0
  }
  let time = dayjs(checkIn)

  for (let i = 0; i < extraHours; i++) {
    const category = getExtraHourCategory(time)
    categories[category]++
    time = time.add(1, 'hour')
  }

  return categories
}

// Calcular salario base según horas regulares
export const calculateRegularSalary = (baseRate: number, regularHours: number): number =>
  regularHours * baseRate

// Calcular salario de horas extras según categorías
export const calculateExtraSalary = (
  baseRate: number,
  extraHoursCategories: ExtraHoursCategories
): number =>
  Object.entries(extraHoursCategories).reduce(
    (total, [type, hours]) =>
      total + hours * baseRate * (EXTRA_RATES[type as keyof ExtraHoursCategories] || 1),
    0
  )

// Calcular salario total combinando salario base y extras
export const calculateSalary = (baseRate: number, workedHours: WorkedHours): number =>
  calculateRegularSalary(baseRate, workedHours.regularHours) +
  calculateExtraSalary(baseRate, workedHours.extraHours)
