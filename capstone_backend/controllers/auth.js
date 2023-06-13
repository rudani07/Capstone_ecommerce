const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );
  if (user) {
    res.json(user);
  } else {
    res.json({
      data: "hey you hit node API",
    });
    const newUser = await new User({ email, name, picture }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};
