const Parcel = require('../models/Parcel');

// Get all parcels
const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find();
    res.json(parcels);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a parcel (status, location, logs)
const updateParcelStatus = async (req, res) => {
  try {
    const { status, location, log } = req.body;
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) return res.status(404).json({ msg: 'Parcel not found' });

    if (status) parcel.status = status;
    if (location) parcel.location = location;
    if (log) parcel.logs.push(log);

    await parcel.save();
    res.json(parcel);
  } catch (error) {
    res.status(500).json({ msg: 'Update failed' });
  }
};

// Delete a parcel
const deleteParcel = async (req, res) => {
  try {
    await Parcel.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Parcel deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Deletion failed' });
  }
};

// Create a new parcel (Admin side)
const createParcelAdmin = async (req, res) => {
  try {
    const { trackingNumber, senderName, senderLocation, receiverName, receiverAddress, receiverLocation } = req.body;
    if (!trackingNumber || !senderName || !senderLocation || !receiverName || !receiverAddress || !receiverLocation) {
      return res.status(400).json({ msg: 'Missing fields' });
    }
    const parcel = await Parcel.create({
      trackingNumber,
      senderName,
      senderLocation,
      receiverName,
      receiverAddress,
      receiverLocation,
      status: 'Processing'
    });
    res.json(parcel);
  } catch (error) {
    res.status(500).json({ msg: 'Creation failed' });
  }
};

module.exports = { getAllParcels, updateParcelStatus, deleteParcel, createParcelAdmin };
