import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorProps } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { db } from '../firebase'

const Editor: EditorProps = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }
)

function TextEditor({ id, snapshot }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  console.log('snapshot', snapshot?.data())

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot.data().editorState)
        )
      )
    }
  }, [snapshot])

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)

    db.collection('documents')
      .doc(id)
      .set(
        { editorState: convertToRaw(editorState.getCurrentContent()) },
        { merge: true }
      )
  }

  return (
    <div className="bg-gray-200 min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 justify-center mx-auto"
        editorClassName="mt-6 mx-auto mb-12 p-10 max-w-5xl bg-white shadow-lg border "
      />
    </div>
  )
}
export default TextEditor
