import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { FileText, Users } from 'react-feather'
import Link from 'next/link'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import Login from '../../components/Login'
import TextEditor from '../../components/TextEditor'
import { auth, db } from '../../firebase'

function Document() {
  const [user, loading] = useAuthState(auth)
  const [fileName, setFileName] = useState('')
  const [modifyingFileName, setModifyingFileName] = useState(false)

  const router = useRouter()
  // router.query.id is always a single string since the route only takes one slug
  const id = router.query.id as string

  const [documentSnapshot, loadingSnapshot] = useDocumentDataOnce(
    db.collection('documents').doc(id)
  )

  useEffect(() => {
    setFileName(documentSnapshot?.fileName)
    if (!loadingSnapshot && !documentSnapshot) router.replace('/')
  }, [documentSnapshot])

  if (!loading && !user) return <Login />

  const onFileNameChange = () => {
    db.collection('documents')
      .doc(id)
      .set({ fileName: fileName }, { merge: true })
  }

  const copyDocument = () => {
    db.collection('documents')
      .add({
        fileName: fileName + '(Copy)',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userEmail: user.email,
        editorState: documentSnapshot.editorState,
      })
      .then((documentRef) => {
        router.push(`/document/${documentRef.id}`)
      })
  }

  const deleteDocument = () => {
    db.collection('documents')
      .doc(id)
      .delete()
      .then(() => {
        router.push('/')
      })
  }

  return (
    <div>
      <header className="flex justify-between items-center p-3 py-1">
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
          <div className="pl-1 h-7 text-xl">
            {modifyingFileName ? (
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                onBlur={() => {
                  setModifyingFileName(false)
                  onFileNameChange()
                }}
              />
            ) : (
              <h1 onClick={() => setModifyingFileName(true)}>{fileName}</h1>
            )}
          </div>
          <div className="flex items-center text-sm space-x-1  h-8 text-gray-600">
            <div className="group option relative">
              File
              <div className="group-hover:block hidden absolute z-50 -ml-1 bg-white  shadow-md">
                <button
                  onClick={copyDocument}
                  className="hover:bg-gray-50 px-4 py-2 w-full"
                >
                  Copy
                </button>
                <button
                  onClick={deleteDocument}
                  className="hover:bg-gray-50 px-4 py-2 w-full"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option hidden sm:block">Tools</p>
          </div>
        </div>
        <button className="hidden sm:flex transition-all duration-300 py-2.5 px-4 mr-3 rounded-lg text-sm uppercase text-white bg-blue-400 hover:bg-blue-500 focus:bg-blue-400 active:bg-blue-600">
          <Users size={22} fill="white" className="mr-1.5" /> Share
        </button>
        <img
          onClick={(e) => {
            e.preventDefault()
            auth.signOut()
          }}
          src={user?.photoURL}
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
