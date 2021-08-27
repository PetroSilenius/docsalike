import Head from 'next/head'
import { Folder, MoreVertical } from 'react-feather'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/client'
import Login from '../components/Login'

export default function Home() {
  const [session, loading] = useSession()

  if (!session) return <Login />

  return (
    <div>
      <Head>
        <title>Docsalike - A Google Docs clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <section className="bg-gray-100 pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-600 text-lg">Start a new document</h2>
            <button className="duration-300 py-2.5 px-2.5 rounded-full text-gray-600 hover:bg-gray-200 active:bg-gray-300">
              <MoreVertical />
            </button>
          </div>
          <button className="relative h-52 w-40 bg-white grid place-items-center rounded border hover:border-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="62"
              height="62"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="square"
              id="g-plus-icon"
            >
              <line x1="12" y1="12" x2="12" y2="19" stroke="#0F9D58"></line>
              <line x1="5" y1="12" x2="12" y2="12" stroke="#F4B400"></line>
              <line x1="12" y1="5" x2="12" y2="12" stroke="#DB4437"></line>
              <line x1="12" y1="12" x2="19" y2="12" stroke="#4285F4"></line>
            </svg>
          </button>
          <p className="ml-2 mt-2 font-semibold text-sm text-gray-600">Blank</p>
        </div>
      </section>

      <section className="bg-white px-10">
        <table className="grid max-w-3xl mx-auto py-8">
          <thead>
            <tr className="flex justify-between pb-5">
              <th className="font-medium flex flex-grow">
                <h2>My Documents</h2>
              </th>
              <th className="font-normal mr-12">
                <p>Date created</p>
              </th>
              <th>
                <Folder />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
