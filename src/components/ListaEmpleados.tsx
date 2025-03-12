'use client'
import { useEmpleados } from '@/hooks/useEmpleados'
import { Search } from 'lucide-react'
import React from 'react'
import { formatoMoneda } from '@/utils/formatoMoneda'

export default function ListaEmpleados() {
  const { empleados, pagination, page, setPage, limit, setLimit, searchTerm, setSearchTerm } =
    useEmpleados()

  const paginaAnterior = () => setPage((prev) => Math.max(prev - 1, 1))
  const paginaSiguiente = () => setPage((prev) => prev + 1)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setPage(1)
  }

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value))
    setPage(1)
  }
  return (
    <div className='overflow-x-auto p-6 bg-white rounded-xl shadow-lg'>
      {/* Título y buscador */}
      <div className='mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <h2 className='text-xl font-bold text-gray-800'>Directorio de Empleados</h2>

        <div className='relative w-full sm:w-64'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Search className='h-4 w-4 text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Buscar empleado...'
            value={searchTerm}
            onChange={onChangeInput}
            className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
          />
        </div>
      </div>

      {/* Información de paginación y selector de límite */}
      <div className='mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-lg'>
        <span className='text-gray-700 font-medium'>
          Mostrando{' '}
          <span className='font-bold text-blue-600'>
            {pagination?.total === 0 ? 0 : (page - 1) * limit + 1}-
            {Math.min(page * limit, pagination?.total || 0)}
          </span>{' '}
          de <span className='font-bold text-blue-600'>{pagination?.total || 0}</span>
        </span>
        <select
          value={limit}
          onChange={onChangeSelect}
          className='border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        >
          {[5, 10, 15, 20].map((size) => (
            <option key={size} value={size}>
              {size} por página
            </option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className='overflow-hidden rounded-xl border border-gray-200 shadow-sm'>
        <table className='min-w-full bg-white divide-y divide-gray-200'>
          <thead>
            <tr className='bg-gradient-to-r from-blue-50 to-blue-100'>
              <th className='py-3 px-6 text-left font-semibold text-gray-700 border-b'>Nombre</th>
              <th className='py-3 px-6 text-left font-semibold text-gray-700 border-b'>Apellido</th>
              <th className='py-3 px-6 text-left font-semibold text-gray-700 border-b'>
                Correo electrónico
              </th>
              <th className='py-3 px-6 text-left font-semibold text-gray-700 border-b'>Cargo</th>
              <th className='py-3 px-6 text-right font-semibold text-gray-700 border-b'>Salario</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 min-h-[300px]'>
            {empleados?.map((empleado, index) => (
              <tr
                key={empleado.id}
                className={`hover:bg-blue-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className='py-3 px-6 text-gray-700'>{empleado.attributes.first_name}</td>
                <td className='py-3 px-6 text-gray-700'>{empleado.attributes.last_name}</td>
                <td className='py-3 px-6'>
                  <a
                    href={`mailto:${empleado.attributes.email}`}
                    className='text-blue-600 hover:text-blue-800 hover:underline'
                  >
                    {empleado.attributes.email}
                  </a>
                </td>
                <td className='py-3 px-6 text-gray-700'>
                  <span className='inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium'>
                    {empleado.attributes.charge}
                  </span>
                </td>
                <td className='py-3 px-6 text-right font-medium text-gray-700'>
                  {formatoMoneda(empleado.attributes.salary)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className='mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg'>
        <button
          onClick={paginaAnterior}
          disabled={!pagination?.prevPage}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            !pagination?.prevPage
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md cursor-pointer'
          }`}
        >
          Anterior
        </button>

        <span className='text-gray-700 font-medium'>
          Página <span className='font-bold text-blue-600'>{page}</span> de{' '}
          <span className='font-bold text-blue-600'>{pagination?.totalPages || 1}</span>
        </span>

        <button
          onClick={paginaSiguiente}
          disabled={!pagination?.nextPage}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            !pagination?.nextPage
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md cursor-pointer'
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
