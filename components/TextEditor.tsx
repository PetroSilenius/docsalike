import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorProps } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { db } from '../firebase'
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'

const Editor: EditorProps = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }
)

function TextEditor({
  id,
  snapshot,
}: {
  id: string
  snapshot: Data<{ [field: string]: any }, '', ''>
}): JSX.Element {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    if (snapshot?.editorState) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(snapshot.editorState))
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
    <div className="bg-gray-200 min-h-screen">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            'history',
            'blockType',
            'fontFamily',
            'fontSize',
            'colorPicker',
            'link',
            'inline',
            'textAlign',
            'list',
            'image',
          ],
        }}
        toolbarClassName="flex sticky top-0 z-30 justify-center mx-auto"
        editorClassName="mt-6 mx-auto mb-3 p-10 max-w-5xl bg-white shadow-lg border"
        editorStyle={{ minHeight: '75vh' }}
      />
    </div>
  )
}
export default TextEditor
