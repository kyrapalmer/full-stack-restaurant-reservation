import React from "react";
import { finishTable } from "../utils/api";

function TableRow({ table, loadDashboard }) {
    if (!table) return null;

    function handleFinish() {
        if (window.confirm(`Is this table ready to seat new guests? This cannot be undone.`)) {
            const abortController = new AbortController();

            finishTable(table.table_id, abortController.signal)
                .then(loadDashboard);
            
                return () => abortController.abort();
        }
    }

    return (
        <tr>
            <th scope="row">{table.table_id}</th>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            {table.status === "occupied" &&
                <td data-table-id-status={table.table_id}>
                    <button onClick={handleFinish} type="button">Finish</button>
                
                </td>
            }
            
        </tr>
    )
}

export default TableRow;