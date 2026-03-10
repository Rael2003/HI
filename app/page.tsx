'use client'

import { useState } from 'react'

interface RifaData {
  id: number
  name: string
  soldNumbers: number[]
}

export default function Home() {
  const [selectedRifa, setSelectedRifa] = useState<number | null>(null)
  const [selectedNumbers, setSelectedNumbers] = useState<{[key: number]: number[]}>({1: [], 2: []})
  
  const initialUnavailableNumbers = {
    1: [],
    2: [] 
  }
  
  const [unavailableNumbers, setUnavailableNumbers] = useState<{[key: number]: number[]}>(initialUnavailableNumbers)

  const [rifas, setRifas] = useState<RifaData[]>([
    {
      id: 1,
      name: 'Kimono Infantil',
      soldNumbers: Array.from({ length: 0 }, (_, i) => i + 1)
    },
    {
      id: 2,
      name: 'Kimono Adulto',
      soldNumbers: Array.from({ length: 0 }, (_, i) => i + 1)
    }
  ])

  const handleNumberClick = (rifaId: number, number: number) => {
    const rifa = rifas.find((r: RifaData) => r.id === rifaId)
    const isUnavailable = unavailableNumbers[rifaId]?.includes(number)
    
    if (rifa && !rifa.soldNumbers.includes(number) && !isUnavailable) {
      setSelectedRifa(rifaId)
      setSelectedNumbers(prev => {
        const currentSelection = prev[rifaId] || []
        if (currentSelection.includes(number)) {
          // Remove number if already selected
          return {
            ...prev,
            [rifaId]: currentSelection.filter(n => n !== number)
          }
        } else {
          // Add number to selection
          return {
            ...prev,
            [rifaId]: [...currentSelection, number]
          }
        }
      })
    }
  }

  const handleReserveNumber = () => {
    if (selectedRifa && selectedNumbers[selectedRifa].length > 0) {
      const rifa = rifas.find((r: RifaData) => r.id === selectedRifa)
      if (rifa) {
        const numbersList = selectedNumbers[selectedRifa].sort((a, b) => a - b).join(', ')
        const message = `Olá! Gostaria de reservar os números ${numbersList} da rifa do ${rifa.name.toLowerCase()} do projeto Hi Ju-Jitsu.\n\nMeu nome é:\nForma de pagamento: Pix`
        const whatsappUrl = `https://wa.me/5511993451421?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
      }
    }
  }

  const getProgressPercentage = (soldNumbers: number[], unavailableCount: number) => {
    const totalUnavailable = soldNumbers.length + unavailableCount
    return (totalUnavailable / 100) * 100
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-dark-gray text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo Hi Ju-Jitsu */}
          <div className="mb-8">
            <img 
              src="/logo.jpeg" 
              alt="Logo Hi Ju-Jitsu" 
              className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-6"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Rifa Solidária – Ajude nossa equipe a competir no Campeonato Brasileiro de Ju-Jitsu
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
            A equipe Hi Ju-Jitsu, liderada pela Sensei Geovanna de Jesus Ferreira Santos, está arrecadando fundos para participar de uma competição em Governador Valadares – Minas Gerais.
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
            Para ajudar na viagem e custos da competição, estamos realizando duas rifas de kimonos.
            Cada número custa R$10.
            Participe e apoie nossos atletas! 🥋
          </p>
          <button 
            onClick={() => document.getElementById('rifas-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-lg"
          >
            Escolher meu número
          </button>
        </div>
      </section>

      {/* Sobre o Projeto */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
            Sobre o Projeto
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-orange">Sobre as Aulas</h3>
              <p className="text-dark-gray mb-4 leading-relaxed">
                O projeto de Ju-Jitsu acontece na ONG Fênix Zona Sul, oferecendo aulas para crianças e jovens da comunidade.
              </p>
              <p className="text-dark-gray mb-4 leading-relaxed">
                O objetivo é ensinar:
              </p>
              <ul className="list-disc list-inside text-dark-gray space-y-2 mb-4">
                <li>disciplina</li>
                <li>respeito</li>
                <li>defesa pessoal</li>
                <li>autoconfiança</li>
                <li>desenvolvimento físico e mental</li>
              </ul>
              <p className="text-dark-gray leading-relaxed">
                O Ju-Jitsu é uma ferramenta poderosa de transformação social.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-orange">Horário e Local dos Treinos</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-dark-gray mb-3">
                  <strong>Treinos acontecem em:</strong><br />
                  Segunda e Quarta<br />
                  16:30 às 17:30
                </p>
                <p className="text-dark-gray mb-4">
                  <strong>Local:</strong><br />
                  ONG Fênix Zona Sul
                </p>
                <a 
                  href="https://maps.app.goo.gl/LgVvaKi32NjnUzE48"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-block"
                >
                  Ver localização no Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a Rifa */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">
            Sobre a Rifa
          </h2>
          <p className="text-lg mb-12 text-dark-gray max-w-4xl mx-auto">
            Estamos realizando duas rifas para arrecadar fundos para nossa equipe:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-orange">
              <h3 className="text-2xl font-bold mb-4 text-black">Kimono Infantil</h3>
              <p className="text-dark-gray mb-2">{100 - rifas[0].soldNumbers.length - (unavailableNumbers[1]?.length || 0)} números disponíveis</p>
              <p className="text-2xl font-bold text-orange mb-4">R$10 cada número</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-orange">
              <h3 className="text-2xl font-bold mb-4 text-black">Kimono Adulto</h3>
              <p className="text-dark-gray mb-2">{100 - rifas[1].soldNumbers.length - (unavailableNumbers[2]?.length || 0)} números disponíveis</p>
              <p className="text-2xl font-bold text-orange mb-4">R$10 cada número</p>
            </div>
          </div>
          
          <div className="bg-orange text-white p-6 rounded-lg inline-block">
            <p className="text-2xl font-bold">📅 Sorteio: 03 de Junho</p>
          </div>
        </div>
      </section>

      {/* Sistema de Rifas */}
      <section id="rifas-section" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
            Escolha seu Número
          </h2>
          
          {rifas.map((rifa: RifaData) => (
            <div key={rifa.id} className="mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-black">
                  Rifa {rifa.id} – {rifa.name}
                </h3>
                
                {/* Barra de Progresso */}
                <div className="max-w-md mx-auto mb-6">
                  <div className="flex justify-between text-sm text-dark-gray mb-2">
                    <span>{rifa.soldNumbers.length + (unavailableNumbers[rifa.id]?.length || 0)} / 100 números vendidos/indisponíveis</span>
                    <span>{getProgressPercentage(rifa.soldNumbers, unavailableNumbers[rifa.id]?.length || 0).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-orange h-4 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage(rifa.soldNumbers, unavailableNumbers[rifa.id]?.length || 0)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Grid de Números */}
              <div className="number-grid">
                {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => {
                  const isSold = rifa.soldNumbers.includes(number)
                  const isUnavailable = unavailableNumbers[rifa.id]?.includes(number)
                  const isSelected = selectedNumbers[rifa.id].includes(number)
                  
                  return (
                    <div
                      key={number}
                      onClick={() => handleNumberClick(rifa.id, number)}
                      className={`
                        number-cell
                        ${isSold || isUnavailable ? 'number-sold' : 'number-available'}
                        ${isSelected ? 'number-selected' : ''}
                      `}
                    >
                      {number}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          
          {/* Botão de Reserva */}
          {selectedNumbers[1].length > 0 || selectedNumbers[2].length > 0 ? (
            <div className="text-center mt-8">
              <div className="mb-4">
                {selectedNumbers[1].length > 0 && (
                  <p className="text-dark-gray mb-2">
                    Kimono Infantil: {selectedNumbers[1].sort((a, b) => a - b).join(', ')}
                  </p>
                )}
                {selectedNumbers[2].length > 0 && (
                  <p className="text-dark-gray mb-2">
                    Kimono Adulto: {selectedNumbers[2].sort((a, b) => a - b).join(', ')}
                  </p>
                )}
              </div>
              <button
                onClick={handleReserveNumber}
                className="btn-primary text-xl"
              >
                Reservar Números Selecionados
              </button>
              <p className="text-dark-gray mt-4">
                Você será redirecionado para o WhatsApp para confirmar sua reserva.
              </p>
            </div>
          ) : (
            <div className="text-center mt-8">
              <p className="text-dark-gray">
                Selecione os números desejados clicando nos quadrados brancos.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Informações de Pagamento */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">
            Informações de Pagamento
          </h2>
          
          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-orange">
            <h3 className="text-xl font-bold mb-4 text-black">Pagamento via PIX</h3>
            <p className="text-dark-gray mb-2">
              <strong>Destinatário:</strong><br />
              Geovanna de Jesus Ferreira Santos
            </p>
            <p className="text-dark-gray">
              <strong>Chave PIX:</strong><br />
              <span className="font-mono bg-gray-100 px-3 py-1 rounded">Geovannajesusfs@gmail.com</span>
            </p>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">
            Contato
          </h2>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-dark-gray mb-4">
              <strong>Responsável:</strong><br />
              Sensei Geovanna de Jesus Ferreira Santos
            </p>
            <a 
              href="https://wa.me/5511993451421"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              WhatsApp: +55 11 99345-1421
            </a>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-black text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo no rodapé */}
          <div className="mb-4">
            <img 
              src="/logo-hi-ju-jitsu.png" 
              alt="Logo Hi Ju-Jitsu" 
              className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 opacity-80"
            />
          </div>
          <p className="font-bold text-lg mb-2">Projeto Hi Ju-Jitsu</p>
          <p className="text-gray-300 mb-2">Treinos na ONG Fênix Zona Sul</p>
          <p className="text-orange font-semibold">Ju-Jitsu transformando vidas.</p>
        </div>
      </footer>
    </div>
  )
}
