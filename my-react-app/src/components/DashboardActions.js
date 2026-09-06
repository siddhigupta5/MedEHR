import React from "react";
import {
    FaPlus,
    FaEdit,
    FaShareAlt,
    FaTrash
} from "react-icons/fa";

import "./DashboardActions.css";

const DashboardActions = ({
    onAdd,
    onEdit,
    onShare,
    onDelete
}) => {


    const actions = [
    {
        title: "Add Record",
        icon: <FaPlus />,
        onClick: onAdd
    },
    {
        title: "Edit Record",
        icon: <FaEdit />,
        onClick: onEdit
    },
    {
        title: "Share Record",
        icon: <FaShareAlt />,
        onClick: onShare
    },
    {
        title: "Delete Record",
        icon: <FaTrash />,
        onClick: onDelete
    }
    ];

    return (
        <div className="dashboard-actions">

            {actions.map((action, index) => (

                <div
                    className="dashboard-action-card"
                    key={index}
                    onClick={action.onClick}
                >

                     <div className="action-icon">
                        {action.icon}
                    </div>

                    <span>
                        {action.title}
                    </span> 

                </div>

            ))}

        </div>
        
         
    );
};

export default DashboardActions;

// import React from "react";

// import "./DashboardActions.css";

// import {

// FaPlus,

// FaEdit,

// FaTrash,

// FaShareAlt

// } from "react-icons/fa";

// const DashboardActions=()=>{

// return(

// <div className="action-buttons">

// <button>

// <FaPlus/>

// Add Record

// </button>

// <button>

// <FaEdit/>

// Edit

// </button>

// <button>

// <FaShareAlt/>

// Share

// </button>

// <button>

// <FaTrash/>

// Delete

// </button>

// </div>

// )

// }

// export default DashboardActions;