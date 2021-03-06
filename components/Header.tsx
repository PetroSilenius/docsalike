import Link from 'next/link'
import { FileText, Menu, Search } from 'react-feather'
import { auth } from '../firebase'

function Header(): JSX.Element {
  return (
    <header className="sticky top-0 flex items-center px-2 sm:px-4 py-2 z-50 shadow-md bg-white">
      <button
        className="transition-all duration-300 py-2.5 px-2.5 rounded-full text-gray-600 hover:bg-gray-200 active:bg-gray-300"
        aria-label="Menu"
      >
        <Menu />
      </button>

      <Link href="/">
        <a className="contents">
          <FileText
            size={42}
            className="text-white"
            style={{ fill: 'rgba(96, 165, 250)' }}
          />
          <h1 className="hidden md:inline-flex ml-2 text-gray-600 text-2xl">
            Docsalike
          </h1>
        </a>
      </Link>

      <div className="flex flex-grow items-center mx-1 sm:mx-5 md:mx-20 px-1 sm:px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:shadow-md">
        <Search color="gray" />
        <input
          type="text"
          placeholder="Search"
          aria-label="Search"
          className="flex-grow px-1 sm:px-5 bg-transparent outline-none"
        />
      </div>

      <img
        onClick={(e) => {
          e.preventDefault()
          auth.signOut()
        }}
        src={auth.currentUser?.photoURL}
        alt="Profile - log out"
        height={36}
        width={36}
        className="cursor-pointer rounded-full ml-2"
      />
    </header>
  )
}

export default Header
