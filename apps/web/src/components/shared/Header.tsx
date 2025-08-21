import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white py-4 mb-7">
    <div className="max-w-5xl mx-auto px-4 relative flex flex-col items-center md:flex-row md:justify-center md:items-center">
        <div className="w-full flex justify-between items-center">
            <div className="flex-1 flex justify-start md:justify-center">
                <Link to="/" className="text-xl font-bold text-green-600 font-sans hover:text-green-800">
                    SWStarter
                </Link>
            </div>
            <Link 
                to="/statistics" 
                className="text-green-600 hover:text-green-800 font-medium"
            >
                Query Statistics
            </Link>
        </div>
    </div>
    </header>
  )
}