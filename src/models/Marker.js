const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Configure environment
dotenv.config()

// Define the Marker schema
const markerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    latLng: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        }
    },
});


// Static methods to keep CRUD functionality contained
markerSchema.statics.createMarker = async function (markerData) {
    try {
        // Create a new marker instance
        const marker = new this(markerData);

        // Save marker in database
        await marker.save();

        return marker

    } catch (error) {

        throw new Error(error.message);

    }
}

markerSchema.statics.getMarkerById = async function (markerId) {
    try {
        // Search for marker
        const marker = await this.findById(markerId)

        // If marker not found throw error
        if (!marker) {
            throw new Error('Marker not found');
        }

        return marker;

    } catch (error) {

        throw new Error(error.message);

    }
}

markerSchema.statics.updateMarker = async function (markerId, updateData) {
    try {

        // Search for marker and update with data
        const marker = await this.findByIdAndUpdate(markerId, updateData, { new: true });

        // If marker not found throw error
        if (!marker) {
            throw new Error('Marker not found');
        }

        return marker;

    } catch (error) {

        throw new Error(error.message);

    }
}

markerSchema.statics.deleteMarker = async function (markerId) {
    try {
        // Find and delete marker
        const marker = await this.findByIdAndDelete(markerId);

        // If marker not found throw error
        if (!marker) {
            throw new Error('Marker not found');
        }

        return marker;

    } catch (error) {

        throw new Error(error.message);

    }
}

// Create the Marker model
const Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;