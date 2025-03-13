import React from 'react'
import { empleado } from '@/interfaces/empleado'
// import { calcularSalario } from "@/utils/calculoSalario";
// import { formatoMoneda } from "@/utils/formatoMoneda";

interface SalaryDetailModalProps {
  empleado: empleado | null
  onClose: () => void
}

const SalaryDetailModal: React.FC<SalaryDetailModalProps> = ({ empleado, onClose }) => {
  if (!empleado) return null

  // const { salarioBase, horasExtras, recargos, totalSalario } = calcularSalario(empleado);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-xl font-bold mb-4'>Detalles de Salario</h2>
        <p>
          <strong>Nombre:</strong> {empleado.attributes.first_name}
        </p>
        <p>
          <strong>Salario Base:</strong>{' '}
        </p>
        <p>
          <strong>Horas Extras:</strong>{' '}
        </p>
        <p>
          <strong>Recargos:</strong>{' '}
        </p>
        <p className='font-bold text-lg'>Total Salario:</p>
        <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded' onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default SalaryDetailModal
