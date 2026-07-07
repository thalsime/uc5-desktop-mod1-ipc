import './style.css'

declare global {
  interface Window {
    api: {
      ping: () => Promise<string>;
    };
  }
}

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

// Necessário para tratar este arquivo como módulo ES (valida o 'declare global {}' acima).
export {}
