import React from "react";

import "./StatsCards.css";

import {

FaFolderOpen,

FaStar,

FaShareAlt,

FaUserMd

} from "react-icons/fa";

const StatsCards = ({

totalRecords,

favourites,

shared,

doctors

}) => {

const cards=[

{

title:"Records",

value:totalRecords,

icon:<FaFolderOpen/>

},

{

title:"Favorites",

value:favourites,

icon:<FaStar/>

},

{

title:"Shared",

value:shared,

icon:<FaShareAlt/>

},

{

title:"Doctors",

value:doctors,

icon:<FaUserMd/>

}

];

return(

<div className="stats-grid">

{

cards.map((card,index)=>(

<div

className="stats-card"

key={index}

>

<div>

<h3>{card.title}</h3>

<h2>{card.value}</h2>

</div>

<div className="stats-icon">

{card.icon}

</div>

</div>

))

}

</div>

)

}

export default StatsCards;