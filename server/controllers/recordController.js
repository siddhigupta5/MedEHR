import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// ==========================
// ADD RECORD
// ==========================

export const addRecord = async (req, res) => {

  try {

    const {
      title,
      description
    } = req.body;

    const record = await prisma.record.create({

      data: {

        title,
        description,

        ownerId: req.user.id

      }

    });

    res.status(201).json(record);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// ==========================
// GET USER RECORDS
// ==========================

export const getRecords = async (req, res) => {

    try {

        const records = await prisma.record.findMany({

            where: {
                ownerId: req.user.id
            },

            include: {
                owner: {
                    select: {
                        fname: true,
                        lname: true
                    }
                }
            },
            orderBy: {
                updatedAt: "desc"
            }

        });

        res.json(records);

    } catch (error) {
        console.error("Error fetching records:", error);
        res.status(500).json({
            message: error.message
        });

    }

};
// ==========================
// EDIT/UPDATE USER RECORDS
// ==========================


export const updateRecord = async (req, res) => {

  try {

    const { title, description } = req.body;

    const recordId = parseInt(req.params.id);

    // Find record
    const existingRecord = await prisma.record.findUnique({
      where: {
        id: recordId
      }
    });

    // Record not found
    if (!existingRecord) {

      return res.status(404).json({
        message: "Record not found"
      });

    }

    // Verify owner
    if (existingRecord.ownerId !== req.user.id) {

      return res.status(401).json({
        message: "Unauthorized"
      });

    }

    // Update record
    const updatedRecord = await prisma.record.update({

      where: {
        id: recordId
      },

      data: {
        title,
        description
      }

    });

    res.json(updatedRecord);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
// ==========================
// DELETE RECORDS
// ==========================


export const deleteRecord = async (req, res) => {

  try {

    const recordId = parseInt(req.params.id);

    // Find record
    const existingRecord = await prisma.record.findUnique({
      where: {
        id: recordId
      }
    });

    // Not found
    if (!existingRecord) {

      return res.status(404).json({
        message: "Record not found"
      });

    }

    // Verify ownership
    if (existingRecord.ownerId !== req.user.id) {

      return res.status(401).json({
        message: "Unauthorized"
      });

    }

    // Delete record
    await prisma.record.delete({

      where: {
        id: recordId
      }

    });

    res.json({
      message: "Record deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
// ==========================
// TOGGLE FAVOURITE
// ==========================

export const toggleFavourite = async (req, res) => {

    try {

        const recordId = parseInt(req.params.id);

        // Find record
        const existingRecord = await prisma.record.findUnique({
            where: {
                id: recordId
            }
        });

        // Record not found
        if (!existingRecord) {

            return res.status(404).json({
                message: "Record not found"
            });

        }

        // Verify ownership
        if (existingRecord.ownerId !== req.user.id) {

            return res.status(401).json({
                message: "Unauthorized"
            });

        }

        // Toggle favourite
        const updatedRecord = await prisma.record.update({

            where: {
                id: recordId
            },

            data: {
                starred: !existingRecord.starred
            },

            include: {

                owner: {
                    select: {
                        fname: true,
                        lname: true
                    }
                }

            }

        });

        res.json(updatedRecord);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};