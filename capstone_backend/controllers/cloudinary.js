const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "datilseem",
  api_key: "169648869596258",
  api_secret: "HV5Ji5BYz7q-i28c_XS0CCj2Rb4",
});
exports.upload = async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.remove = async (req, res) => {
  let image_id = req.body.public_id;

  let result = await cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ sucess: false, err });
    res.send("ok");
  });
};
