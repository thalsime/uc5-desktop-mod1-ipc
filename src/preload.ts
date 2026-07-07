import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  ping: () => ipcRenderer.invoke('canal-ping'),
  obterDadosMaquina: () => ipcRenderer.invoke('obter-dados-maquina'),
})
