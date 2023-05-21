import { useState } from 'react';
import Header from './Header.jsx'
function App() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState('');
  const [show, setshow] = useState(false);

//   function onclick() {
//     fetch('http://localhost:5000/emp')
//       .then(res => res.json())
//       .then(data => setEmployees(data))
//       .catch(err => console.error(err));
//     setshow(true);
//   }

function onclick() {
    fetch('http://localhost:5000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    }) 
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error(err));
    setshow(true);
  }

  return (
    <div>
        <Header />

        <div className="min-h-screen bg-gray-100 flaex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Oracle Data</h2>
          </div>
          <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="query"
                placeholder="SELECT * FROM emp"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              ></textarea>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <button onClick={onclick} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Load Data
            </button>
          </div>
          {show && (
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          empno
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ename
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          job
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {employees.map(row => (
                        <tr key={row.emp}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {row.emp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {row.ename}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {row.job}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default App;
