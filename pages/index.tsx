import Head from 'next/head'
import { Folder, MoreVertical, FileText } from 'react-feather'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/client'
import Login from '../components/Login'
import { db } from '../firebase'
import firebase from 'firebase/app'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
  const [session] = useSession()
  if (!session) return <Login />

  const router = useRouter()

  const [documentsSnapshot] = useCollectionOnce(
    db
      .collection('documents')
      .where('userEmail', '==', session.user.email)
      .orderBy('timestamp', 'desc')
  )

  const createDocument = () => {
    db.collection('documents')
      .add({
        fileName: 'New document',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userEmail: session.user.email,
      })
      .then((documentRef) => {
        router.push(`/document/${documentRef.id}`)
      })
  }

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
            <button className="duration-300 p-1.5 rounded-full text-gray-600 hover:bg-gray-200 active:bg-gray-300">
              <MoreVertical />
            </button>
          </div>
          <button
            onClick={createDocument}
            className="relative h-52 w-40 bg-white grid place-items-center rounded border hover:border-blue-400"
          >
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
            <tr className="flex justify-between pb-5 px-5">
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
            {documentsSnapshot?.docs.map((doc) => (
              <Link href={`/document/${doc.id}`} key={doc.id}>
                <tr className="flex justify-between items-center p-4 rounded-lg hover:bg-gray-100 cursor-pointer text-sm">
                  <td className="flex flex-grow items-center">
                    <FileText
                      size={32}
                      className="text-white"
                      style={{ fill: 'rgba(96, 165, 250)' }}
                    />
                    <span className="pl-5">{doc.data().fileName}</span>
                  </td>
                  <td className="mr-12">
                    {doc.data().timestamp?.toDate().toLocaleDateString()}
                  </td>
                  <td>
                    <button className="duration-300 p-1.5 rounded-full text-gray-600 hover:bg-gray-200 active:bg-gray-300">
                      <MoreVertical size="20" />
                    </button>
                  </td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
