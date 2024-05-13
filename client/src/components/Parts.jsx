import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function Parts() {
    const [parts, setParts] = useState([]);

    const columnDefs = [
        { field: 'number', sortable: true, filter: true},
        { field: 'type', sortable: true, filter: true },
        { field: 'size', sortable: true, filter: true },
        { field: '' }
    ]

    useEffect(() => {
        fetch('http://localhost:3000/api/parts')
        .then(response => response.json())
        .then(data => setParts(Object.values(data)))
        .catch(err => console.log(err))
    }, [])

    return (
        <main className="col inset-box" aria-labelledby="heading-parts">
            <h2 id="heading-parts">Parts</h2>
            <div className="ag-theme-material" style={{height: 400, width: '90%'}}>
                <AgGridReact
                    rowData={parts}
                    columnDefs={columnDefs}
                />
            </div>
        </main>
    );
}

export default Parts;