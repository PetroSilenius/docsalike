import { signIn } from 'next-auth/client'
import { FileText } from 'react-feather'

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <FileText
        size={160}
        className="text-white"
        style={{ fill: 'rgba(96, 165, 250)' }}
      />
      <h1 className="ml-2 text-gray-600 text-3xl">Docsalike</h1>
      <button
        onClick={(e) => {
          e.preventDefault()
          signIn()
        }}
        className="w-44 mt-10 transition-all duration-300 py-2.5 px-2.5 rounded-xl uppercase text-white bg-blue-400 hover:bg-blue-500 focus:bg-blue-400 active:bg-blue-600"
      >
        Login
      </button>
    </div>
  )
}
export default Login
