import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  addRecord,
  getRecords,
  updateRecord,
  deleteRecord,
  toggleFavourite
} from "../controllers/recordController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, addRecord);

router.get("/", protect, getRecords);

router.put("/:id", protect, updateRecord);

router.delete("/:id", protect, deleteRecord);

router.post("/upload",protect,upload.single("file"),
  (req, res) => {

    res.json({
      filePath: req.file.path
    });

  }
);
router.patch(
    "/:id/favourite",
    protect,
    toggleFavourite
);

export default router;
