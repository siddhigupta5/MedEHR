import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import API from "../api";


import RecordsTable from "../components/RecordsTable";
import RecordModal from "../components/RecordModal";
import DashboardActions from "../components/DashboardActions";

import {
    Menu,
    MenuItem
} from "@mui/material";

import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();

    // State
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    // Profile dropdown
    const [profileAnchor, setProfileAnchor] = useState(null);
   
    //Actions section
    const [selectedRecord, setSelectedRecord] = useState(null);

    //Add to favourites 
    const handleFavouriteToggle = async (recordId) => {

    try {

        const response = await API.patch(
            `/records/${recordId}/favourite`
        );

        setRecords((currentRecords) =>

            currentRecords.map((record) =>

                record.id === recordId
                    ? response.data
                    : record

            )

        );

    } catch (error) {

        console.error(
            "Error toggling favourite:",
            error
        );

    }
    };

    // PROFILE MENU
    const handleProfileClick = (event) => {

        setProfileAnchor(event.currentTarget);

    };


    const handleProfileClose = () => {

        setProfileAnchor(null);

    };

    // LOGOUT
    const handleLogout = () => {

        // Remove JWT
        localStorage.removeItem("token");

        // Close menu
        setProfileAnchor(null);

        // Go back to homepage
        navigate("/");

    };


    const handleAdd = () => {
    setOpenModal(true);
    };

    // Fetch Records
    const fetchRecords = async () => {
        try {
            const response = await API.get("/records");
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching records:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleEdit = (record) => {
    setSelectedRecord(record);
    setOpenModal(true);
    };

    const handleDelete = async (recordId) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this record?"
    );

    if (!confirmed) {
        return;
    }

    try {

        await API.delete(`/records/${recordId}`);

        await fetchRecords();

    } catch (error) {

        console.error(
            "Error deleting record:",
            error
        );

        alert("Failed to delete record");

    }

    };

    // Load records on component mount
    useEffect(() => {
        fetchRecords();
    }, []);

    // Loading State
    if (loading) {
        return (
            <div className="dashboard">
                <h2 style={{ textAlign: "center", marginTop: "100px" }}>
                    Loading Records...
                </h2>
            </div>
        );
    }

    

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>MedEHR</h1>

                <div className="profile">

                    <span>Welcome, Siddhi</span>

                    <div className="avatar" onClick={handleProfileClick}>
                        SG
                    </div>
                    {/* PROFILE DROPDOWN */}

                    <Menu
                        anchorEl={profileAnchor}
                        open={Boolean(profileAnchor)}
                        onClose={handleProfileClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                    >

                        <MenuItem onClick={handleLogout}>

                            Logout

                        </MenuItem>

                    </Menu>

                </div>

            </div>

            <DashboardActions
                onAdd={handleAdd}
            />

            {/* Pass records to RecordsTable */}
            <RecordsTable records={records}
            onFavouriteToggle={handleFavouriteToggle}
            onEdit={handleEdit}
            onDelete={handleDelete} />
            <RecordModal
                open={openModal}
            onClose={() => {
                setOpenModal(false);
                setSelectedRecord(null);
            }}
            onRecordAdded={fetchRecords}
            record={selectedRecord}
                    />
            </div>

    );

};

export default Dashboard;

 