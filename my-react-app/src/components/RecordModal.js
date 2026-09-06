import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./RecordModal.css";
import API from "../api";

const RecordModal = ({ open, onClose, onRecordAdded,record }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    
    //Adding edit functionality
    const isEditMode = Boolean(record);

    useEffect(() => {
    if (record) {
      setTitle(record.title || "");
      setDescription(record.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
    }, [record, open]);

    const resetForm = () => {

    setTitle("");
    setDescription("");

    };
    const handleClose = () => {

    resetForm();

    onClose();

    };

    // Hide modal when not open
    if (!open) return null;

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        setLoading(true);
    
        if (isEditMode) {
          await API.put(`/records/${record.id}`, {
            title,
            description,
          });
        } else {
          await API.post("/records", {
            title,
            description,
          });
        }
    
        await onRecordAdded();
    
        resetForm();
        onClose();
    
      } catch (error) {
        console.error(
          isEditMode
            ? "Error updating record:"
            : "Error adding record:",
          error
        );
    
        alert(
          isEditMode
            ? "Failed to update record"
            : "Failed to add record"
        );
      } finally {
        setLoading(false);
      }
    };

    return (

        <div className="modal-overlay">

            <div className="record-modal">

                 <div className="modal-header">

                    <h2>{isEditMode ? "Edit Record" : "Add New Record"}</h2>
                
                    <button
                        className="close-btn"
                        onClick={handleClose}
                    >
                        <IoClose />
                    </button>
                
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Title</label>

                        <input
                            type="text"
                            placeholder="Enter record title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Description</label>

                        <textarea
                            placeholder="Enter description"
                            rows="4"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                            disabled={loading}
                        >
                           {loading? isEditMode? "Updating...": "Saving..."
                             : isEditMode? "Update Record" : "Save Record"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default RecordModal;