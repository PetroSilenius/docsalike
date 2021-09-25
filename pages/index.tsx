import Head from 'next/head'
import { Folder, MoreVertical } from 'react-feather'
import Header from '../components/Header'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from '../components/Login'
import PlusIcon from '../components/PlusIcon'
import DocumentListRow from '../components/DocumentListRow'
import { auth, db } from '../firebase'
import firebase from 'firebase/app'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)

  const [documentsSnapshot] = useCollectionOnce(
    db
      .collection('documents')
      .where('userEmail', '==', user?.email ?? '')
      .orderBy('timestamp', 'desc')
  )

  if (!loading && !user) return <Login />

  const createDocument = () => {
    db.collection('documents')
      .add({
        fileName: 'New document',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userEmail: user.email,
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
            <PlusIcon />
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
              <DocumentListRow
                id={doc.id}
                key={doc.id}
                fileName={doc.data().fileName}
                timestamp={doc.data().timestamp}
              />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
