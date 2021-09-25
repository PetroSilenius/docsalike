import Link from 'next/link'
import { MoreVertical, FileText } from 'react-feather'

function DocumentListRow({
  id,
  fileName,
  timestamp,
}: {
  id: string
  fileName: string
  timestamp: any
}): JSX.Element {
  return (
    <Link href={`/document/${id}`} passHref>
      <tr className="flex justify-between items-center p-1 sm:p-4 rounded-lg hover:bg-gray-100 cursor-pointer text-sm">
        <td className="flex flex-grow items-center">
          <FileText
            size={32}
            className="text-white"
            style={{ fill: 'rgba(96, 165, 250)' }}
          />
          <span className="pl-1 sm:pl-5">{fileName}</span>
        </td>
        <td className="sm:mr-12">{timestamp.toDate().toLocaleDateString()}</td>
        <td>
          <button className="duration-300 p-1.5 rounded-full text-gray-600 hover:bg-gray-200 active:bg-gray-300">
            <MoreVertical size="20" aria-label="Options" />
          </button>
        </td>
      </tr>
    </Link>
  )
}
export default DocumentListRow
