const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  trackingNumber: { type: String, unique: true, required: true },
  senderName: { type: String, required: true },
  senderLocation: { type: String, required: true },
  receiverName: { type: String, required: true },
  receiverAddress: { type: String, required: true },
  receiverLocation: { type: String, required: true },
  status: { type: String, default: 'Processing' },
  location: { type: String },
  logs: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Parcel', parcelSchema);
