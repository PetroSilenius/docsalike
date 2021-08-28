import { getSession, useSession, signOut } from 'next-auth/client'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import { FileText, Users } from 'react-feather'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Login from '../../components/Login'
import TextEditor from '../../components/TextEditor'
import { db } from '../../firebase'

function Document() {
  const [session] = useSession()
  if (!session) return <Login />

  const router = useRouter()
  // router.query.id is always a single string since the route only take one slug
  const id = router.query.id as string

  const [documentSnapshot, loadingSnapshot] = useDocumentOnce(
    db.collection('documents').doc(id)
  )

  if (!loadingSnapshot && !documentSnapshot?.data()?.fileName) {
    router.replace('/')
  }

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <Link href="/">
          <a className="contents">
            <FileText
              size={42}
              className="text-white"
              style={{ fill: 'rgba(96, 165, 250)' }}
            />
          </a>
        </Link>
        <div className="flex-grow px-2">
          <h1>{documentSnapshot?.data()?.fileName}</h1>
          <div className="flex items-center text-sm space-x-1  h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>
        <button className="hidden sm:flex transition-all duration-300 py-2.5 px-4 mr-3 rounded-lg text-sm uppercase text-white bg-blue-400 hover:bg-blue-500 focus:bg-blue-400 active:bg-blue-600">
          <Users size={22} fill="white" className="mr-1.5" /> Share
        </button>
        <img
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
          src={session?.user?.image}
          height={36}
          width={36}
          className="cursor-pointer rounded-full ml-2"
        />
      </header>

      <TextEditor id={id} snapshot={documentSnapshot} />
    </div>
  )
}
export default Document

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
