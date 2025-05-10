const Parcel = require('../models/Parcel');

// Public track parcel
const trackParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findOne({ trackingNumber: req.params.trackingNumber });
    if (!parcel) return res.status(404).json({ msg: 'Parcel not found' });
    res.json(parcel);
  } catch (error) {
    res.status(500).json({ msg: 'Tracking failed' });
  }
};

// Public create parcel (optional)
const createParcel = async (req, res) => {
  try {
    const { trackingNumber, senderName, senderLocation, receiverName, receiverAddress, receiverLocation } = req.body;
    const parcel = await Parcel.create({
      trackingNumber,
      senderName,
      senderLocation,
      receiverName,
      receiverAddress,
      receiverLocation
    });
    res.json(parcel);
  } catch (error) {
    res.status(500).json({ msg: 'Parcel creation failed' });
  }
};

module.exports = { trackParcel, createParcel };
