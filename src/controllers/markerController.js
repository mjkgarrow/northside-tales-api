const Marker = require('../models/Marker');
const express = require('express');
const router = express.Router();

// Create a marker
router.post('/markers/', async (req, res) => {
    console.log("Create a marker")
    try {
        // Update marker
        const marker = await Marker.createMarker(req.body);

        // Return updated Marker
        res.json(marker);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
})

// Get all markers
router.get('/markers', async (req, res) => {
    console.log("get markers")
    try {
        // Get all Markers
        const markers = await Marker.find();

        // Return list of Markers
        res.status(200).json(markers);

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
})

// Get marker by ID
router.get('/markers/:id', async (req, res) => {
    console.log("get marker by ID")
    try {
        // Get a Marker by ID
        const marker = await Marker.getMarkerById(req.params.id);

        // Return Marker
        res.json(marker);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
})

// Update a marker by ID
router.put('/markers/:id', async (req, res) => {
    console.log("update marker by ID")
    try {
        // Update marker
        const marker = await Marker.updateMarker(req.params.id, req.body);

        // Return updated Marker
        res.json(marker);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
})

// Delete a marker by ID
router.delete('/markers/:id', async (req, res) => {
    console.log("delete marker by ID")
    try {
        // Delete Marker
        const marker = await Marker.deleteMarker(req.params.id);

        // Return deleted marker
        res.json(marker);

    } catch (error) {

        res.status(404).json({ error: error.message });
    }
})

module.exports = router;
