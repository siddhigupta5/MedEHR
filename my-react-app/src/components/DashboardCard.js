import React from "react";
import "./DashboardCard.css";

const DashboardCard = ({title,icon,color}) => {

    return(

        <div
            className="dashboard-card"
            style={{background:color}}
        >

            <div className="icon">

                {icon}

            </div>

            <h3>{title}</h3>

        </div>

    )

}

export default DashboardCard;