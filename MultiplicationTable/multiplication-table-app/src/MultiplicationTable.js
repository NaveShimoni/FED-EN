import React from 'react';

const MultiplicationTable = () => {
  const tableSize = 10;

  return (
    <table>
      <thead>
        <tr>
          <th>*</th>
          {[...Array(tableSize).keys()].map((num) => (
            <th key={num + 1}>{num + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(tableSize).keys()].map((row) => (
          <tr key={row + 1}>
            <th>{row + 1}</th>
            {[...Array(tableSize).keys()].map((col) => (
              <td key={col + 1}>{(row + 1) * (col + 1)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MultiplicationTable;