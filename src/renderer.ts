import './style.css'

declare global {
  interface Window {
    api: {
      ping: () => Promise<string>;
      obterDadosMaquina: () => Promise<{ plataforma: string; processador: string; memoriaRam: string }>;
      calcularImc: (peso: number, altura: number) => Promise<{ imc: number; classificacao: string }>;
    };
  }
}

// --- Ping IPC (boilerplate) ---
const btnPing = document.getElementById('btn-ping') as HTMLButtonElement
const resposta = document.getElementById('resposta') as HTMLParagraphElement

btnPing.addEventListener('click', async () => {
  resposta.textContent = 'Enviando ping...'
  try {
    const retorno = await window.api.ping()
    resposta.textContent = `Resposta: ${retorno}`
  } catch (erro) {
    resposta.textContent = 'Erro ao comunicar com o Processo Main.'
    console.error(erro)
  }
})

// --- Exercício 1: Hardware ---
const btnHardware = document.getElementById('btn-hardware') as HTMLButtonElement
const resHardware = document.getElementById('res-hardware') as HTMLParagraphElement

btnHardware.addEventListener('click', async () => {
  resHardware.textContent = 'Coletando dados do sistema...'
  try {
    const dados = await window.api.obterDadosMaquina()
    resHardware.innerHTML = `
      <strong>Plataforma:</strong> ${dados.plataforma}<br>
      <strong>Processador:</strong> ${dados.processador}<br>
      <strong>Memória RAM:</strong> ${dados.memoriaRam}
    `
  } catch (erro) {
    resHardware.textContent = 'Erro ao consultar dados de hardware.'
    console.error(erro)
  }
})

// --- Exercício 2: IMC ---
const inputPeso = document.getElementById('peso') as HTMLInputElement
const inputAltura = document.getElementById('altura') as HTMLInputElement
const btnImc = document.getElementById('btn-imc') as HTMLButtonElement
const resImc = document.getElementById('res-imc') as HTMLParagraphElement

btnImc.addEventListener('click', async () => {
  const peso = parseFloat(inputPeso.value)
  const altura = parseFloat(inputAltura.value)
  try {
    const resultado = await window.api.calcularImc(peso, altura)
    resImc.innerHTML = `Seu IMC é <strong>${resultado.imc}</strong> (${resultado.classificacao})`
  } catch (erro: unknown) {
    resImc.textContent = 'Erro: verifique os dados inseridos.'
  }
})

// Necessário para tratar este arquivo como módulo ES (valida o 'declare global {}' acima).
export {}
