import { supabase } from './lib/supabase'

const ETAPAS = [
  { nome: 'Prospecção', cor: '#374151' },
  { nome: 'Solicitação', cor: '#dc2626' },
  { nome: 'Elaboração', cor: '#7c3aed' },
  { nome: 'Acompanhamento', cor: '#059669' },
]

function iniciais(nome: string) {
  return nome
    .split(' ')
    .map((parte) => parte[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default async function Home() {
  const { data: negocios, error } = await supabase
    .from('negocios')
    .select('*')

  if (error) {
    return <p>Erro ao buscar negócios: {error.message}</p>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-emerald-900 text-white px-8 py-4">
        <h1 className="text-lg font-bold">CRM COMERCIAL</h1>
        <p className="text-xs text-emerald-200">Gestão de oportunidades</p>
      </header>

      <main className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Negócios</h2>

        <div className="flex gap-4 overflow-x-auto">
          {ETAPAS.map(({ nome, cor }) => {
            const negociosDaEtapa = negocios?.filter((n) => n.etapa === nome) ?? []

            return (
              <div key={nome} className="bg-gray-200 rounded-lg p-3 w-72 flex-shrink-0">
                <div
                  className="flex justify-between items-center mb-3 px-2 py-2 rounded text-white"
                  style={{ backgroundColor: cor }}
                >
                  <h3 className="font-semibold text-sm">{nome}</h3>
                  <span className="bg-white/20 text-xs font-bold rounded-full px-2 py-1">
                    {negociosDaEtapa.length}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {negociosDaEtapa.map((negocio) => (
                    <div
                      key={negocio.id}
                      className="bg-white rounded-lg p-3 shadow-sm border-l-4"
                      style={{ borderLeftColor: cor }}
                    >
                      <p className="font-semibold text-sm text-gray-800">{negocio.empresa}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                          style={{ backgroundColor: cor }}
                        >
                          {iniciais(negocio.responsavel ?? '?')}
                        </div>
                        <p className="text-xs text-gray-500">{negocio.responsavel}</p>
                      </div>

                      {negocio.valor && (
                        <p className="text-xs font-medium text-green-700 mt-2">
                          R$ {Number(negocio.valor).toLocaleString('pt-BR')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}