import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

function Navbar() {

    const navigate = useNavigate()
    const { handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        alert('Usuário deslogado com sucesso')
        navigate('/login')
    }

    return (
        <>
            <div className='w-full bg-violet-600 text-white
                flex justify-center py-4'>

                <div className="container flex justify-between text-lg">
                    <Link to='/home' className='text-2xl font-bold'>Blog Pessoal</Link>

                    <div className='flex gap-4 px-3'>
                        <div>Postagem</div>
                        <Link to='/temas' className='hover:no-underline hover:text-xl'>Temas</Link>
                        <Link to='/cadastroTema' className='hover:no-underline hover:text-xl'>Cadastrar Tema</Link>
                        <div>Perfil</div>
                        <Link to='' onClick={logout} className='hover:no-underline hover:text-xl'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
