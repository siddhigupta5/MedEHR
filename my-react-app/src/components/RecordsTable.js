import React from "react";
import "./RecordsTable.css";

import { FaStar,FaEdit,FaTrash } from "react-icons/fa";

const RecordsTable = ({ records,onEdit,
    onDelete,onFavouriteToggle
 }) => {

    // Empty State
    if (records.length === 0) {
        return (
            <div className="table-container">
                <h2>My Health Records</h2>

                <div
                    style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "#666"
                    }}
                >
                    <h3>No Records Found</h3>
                    <p>Create your first medical record.</p>
                </div>
            </div>
        );
    }

    return (

        <div className="table-container">

            <h2>My Health Records</h2>

            <table>
                {/* FIXED COLUMN WIDTHS */}

                <colgroup>

                    <col className="record-col" />

                    <col className="patient-col" />

                    <col className="date-col" />

                    <col className="favorite-col" />

                    <col className="action-col" />

                </colgroup>
                <thead>
                 
                    <tr>

                        <th>Record Name</th>

                        <th>Patient Name</th>

                        <th>Date Created On</th>

                        <th>Favourite</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>
                       {records.map((record) => (
                           <tr key={record.id}>
                               <td>{record.title}</td>

                               <td>
                                   {record.owner
                                       ? `${record.owner.fname} ${record.owner.lname}`
                                       : "Me"
                                                      }
                               </td>
                                                  
                               {/* DATE */}
   
                               <td>
   
                                   {record.createdAt
                                       ? new Date(
                                           record.createdAt
                                       ).toLocaleDateString()
                                       : "-"
                                   }
   
                               </td>
                               {/* FAVOURITE */}   
                               <td>
                                 <FaStar
                                     className="favorite-icon"
                                     color={record.starred ? "#FFC107" : "#C8C8C8"}
                                     onClick={() =>
                                        onFavouriteToggle(record.id)
                                    }
                                 />
                               </td>
                               {/* Actions */}

                                <td>

                                    <div className="record-actions">

                                        <button
                                            className="icon-btn edit-btn"
                                            onClick={() =>
                                                onEdit(record)
                                            }
                                            title="Edit record"
                                        >

                                            <FaEdit />

                                        </button>


                                        <button
                                            className="icon-btn delete-btn"
                                            onClick={() =>
                                                onDelete(record.id)
                                            }
                                            title="Delete record"
                                        >

                                            <FaTrash />

                                        </button>

                                    </div>
                                    </td>
                           </tr>
                       ))}

                </tbody>

            </table>

        </div>

    );

};

export default RecordsTable;