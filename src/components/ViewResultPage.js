// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from 'chart.js';

// // Register chart components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const ViewResultPage = () => {
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/api/dashboard/getresult');
//         setResults(response.data);
//       } catch (err) {
//         console.error('Error fetching results', err);
//       }
//     };

//     fetchResults();
//   }, []);

//   if (results.length === 0) return <p className="text-center text-gray-600">Loading results...</p>;

//   const generateChartData = (options) => {
//     const optionCounts = {};
//     options.forEach((option) => {
//       optionCounts[option] = (optionCounts[option] || 0) + 1;
//     });

//     return {
//       labels: Object.keys(optionCounts),
//       datasets: [
//         {
//           data: Object.values(optionCounts),
//           backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
//           hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50']
//         }
//       ]
//     };
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen py-10">
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Your Quiz Results
//         </h2>
//         {results.map((result, index) => (
//           <div
//             key={result._id}
//             className="mb-8 border-b border-gray-200 pb-6 last:border-b-0"
//           >
//             <h3 className="text-xl font-semibold text-gray-700 mb-4">
//               Question {index + 1}
//             </h3>
//             <div className="flex justify-center">
//               <Pie
//                 data={generateChartData(result.options)}
//                 options={{
//                   plugins: {
//                     legend: {
//                       position: 'bottom',
//                       labels: {
//                         color: '#333',
//                         font: {
//                           size: 10
//                         }
//                       }
//                     }
//                   },
//                   maintainAspectRatio: false
//                 }}
//                 width={100} // Significantly smaller width
//                 height={100} // Significantly smaller height
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewResultPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const ViewResultPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/dashboard/getresult');
        setResults(response.data);
      } catch (err) {
        console.error('Error fetching results', err);
      }
    };

    fetchResults();
  }, []);

  if (results.length === 0) return <p className="text-center text-gray-600">Loading results...</p>;

  const generateChartData = (options) => {
    return {
      labels: options.map((option) => option.option),
      datasets: [
        {
          data: options.map((option) => option.count),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50']
        }
      ]
    };
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Quiz Results
        </h2>
        {results.map((result, index) => (
          <div
            key={result.questionId}
            className="mb-8 border-b border-gray-200 pb-6 last:border-b-0"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Question {index + 1}: {result.questionText}
            </h3>
            <div className="flex justify-center">
              <Pie
                data={generateChartData(result.options)}
                options={{
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: '#333',
                        font: {
                          size: 12
                        }
                      }
                    }
                  },
                  maintainAspectRatio: false
                }}
                width={200}
                height={200}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewResultPage;
