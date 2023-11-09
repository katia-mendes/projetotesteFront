import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

import { cadastrarUsuario } from '../../services/Service'
import Usuario from '../../models/Usuario'

import './Cadastro.css'

function Cadastro() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nomeUsuario: '',
    emailUsuario: '',
    senha: '',
    fotoUsuario: ''
  })

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar()
    }
  }, [usuario])

  function retornar() {
    navigate('/login')
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true)

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        alert('Usuário cadastrado com sucesso')

      } catch (error) {
        alert('Erro ao cadastrar o Usuário')
      }

    } else {
      alert('Dados inconsistentes. Verifique as informações de cadastro.')
      setUsuario({ ...usuario, senha: "" })
      setConfirmaSenha("")
    }

    setIsLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      <div className="fundoCadastro hidden lg:block"></div>
      <form
        className='flex justify-center items-center flex-col w-2/3 gap-3'
        onSubmit={cadastrarNovoUsuario}>
        <h2 className='text-violet-900 text-5xl'>Cadastrar</h2>
        <div className="flex flex-col w-full">
          <label htmlFor="nomeUsuario" className="text-violet-900">Nome</label>
          <input
            type="text"
            id="nomeUsuario"
            name="nomeUsuario"
            placeholder="Nome"
            className="border-2 border-violet-400 rounded p-2"
            value={usuario.nomeUsuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="emailUsuario" className="text-violet-900">Usuario</label>
          <input
            type="text"
            id="emailUsuario"
            name="emailUsuario"
            placeholder="Usuario"
            className="border-2 border-violet-400 rounded p-2"
            value={usuario.emailUsuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="fotoUsuario" className="text-violet-900">Foto</label>
          <input
            type="text"
            id="fotoUsuario"
            name="fotoUsuario"
            placeholder="Foto"
            className="border-2 border-violet-400 rounded p-2"
            value={usuario.fotoUsuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="senha" className="text-violet-900">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="border-2 border-violet-400 rounded p-2"
            value={usuario.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="confirmarSenha" className="text-violet-900">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            className="border-2 border-violet-400 rounded p-2"
            value={confirmaSenha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
          />
        </div>
        <div className="flex justify-around w-full gap-8">
          <button
            className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
            onClick={retornar}>
            Cancelar
          </button>
          <button
            className='rounded text-white bg-violet-500 hover:bg-violet-800 w-1/2 
                                           py-2 flex justify-center'
            type='submit'>
            {isLoading ? <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
              <span>Cadastrar</span>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Cadastro
