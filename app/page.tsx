import { supabase } from './lib/supabase'

export default async function Home() {
  const { data: negocios, error } = await supabase
    .from('negocios')
    .select('*')

  if (error) {
    return <p>Erro ao buscar negócios: {error.message}</p>
  }

  return (
    <main style={{ padding: '40px' }}>
      <h1>Negócios</h1>
      {negocios?.map((negocio) => (
        <div
          key={negocio.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <p><strong>{negocio.empresa}</strong></p>
          <p>Etapa: {negocio.etapa}</p>
          <p>Responsável: {negocio.responsavel}</p>
          <p>Valor: R$ {negocio.valor}</p>
        </div>
      ))}
    </main>
  )
}
