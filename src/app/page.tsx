import ListaEmpleados from '@/components/ListaEmpleados'

export default function Home() {
  return (
    <div className='container mx-auto py-8 px-4'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Sistema de Gestión de Empleados</h1>
      <ListaEmpleados />
    </div>
  )
}
