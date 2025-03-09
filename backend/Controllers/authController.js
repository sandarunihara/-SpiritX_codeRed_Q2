import User from "../models/Usermodel.js";
import Team from "../models/Teammodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, password, confirmPassword, teamname } = req.body;

  if (!username || !password || !confirmPassword || !teamname) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ username });
    const existingTeam = await Team.findOne({ teamname });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (existingTeam) {
      return res.status(400).json({ message: "Team name already exists" });
    }


    const role= "user";
    const user = new User({ username, password, teamname ,role});


    await user.save();

    // Create a new team with the provided team name
    const team = new Team({ teamname });
    await team.save();

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        cashamount: user.cashamount,
        teamname: user.teamname,
        teamcount: user.teamcount,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.error(`Login Error: User not found for username: ${username}`);
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      console.error(
        `Login Error: Invalid credentials for username: ${username}`
      );
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        cashamount: user.cashamount,
        teamname: user.teamname,
        teamcount: user.teamcount,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
