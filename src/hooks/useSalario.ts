import { useState } from 'react'
import { WorkedHours } from '../interfaces/salario'
import { calculateSalary } from '../utils/calculoSalario'

const useSalario = (baseRate: number, workedHours: WorkedHours) => {
  const [salarioTotal, setSalarioTotal] = useState<number>(0)

  const calcularSalario = () => {
    const total = calculateSalary(baseRate, workedHours)
    setSalarioTotal(total)
  }

  return { salarioTotal, calcularSalario }
}

export default useSalario
