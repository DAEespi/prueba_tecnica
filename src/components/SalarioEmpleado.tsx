import React, { useEffect } from 'react'
import useSalario from '../hooks/useSalario'
import { WorkedHours } from '../interfaces/salario'
import { formatoMoneda } from '@/utils/formatoMoneda'

interface Props {
  baseRate: number
  workedHours: WorkedHours
}

const SalarioEmpleado: React.FC<Props> = ({ baseRate, workedHours }) => {
  const { salarioTotal, calcularSalario } = useSalario(baseRate, workedHours)

  useEffect(() => {
    calcularSalario()
  }, [])

  return (
    <div className='p-4 border rounded-lg shadow-md bg-white'>
      <h3 className='text-lg font-bold'>Salario Estimado</h3>
      <p className='text-xl text-green-600'>{formatoMoneda(salarioTotal)}</p>
    </div>
  )
}

export default SalarioEmpleado
