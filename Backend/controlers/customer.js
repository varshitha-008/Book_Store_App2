// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from 'jsonwebtoken';
// import customers from "../Models/customer.js";
// // import { customers } from "../Models/customer.js";
// // import {customers} from "../Models/customer.js";
// // import customers from "../Models/customer.js";
// // const routerin=express.Router();

// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   };
  
//   const generateRefreshToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
//   };


//   export const register = async (req, res) => {

//     try {
//       const { name, email, password } = req.body;
//       if (!name || !email || !password) {
//         res.send('body is not a correct Data');
//       }
//       const userexist = await customers.findOne({ email: email });
//       if (!userexist) {
//         const hashpassword = await bcrypt.hash(password, 10);
  
//         console.log("hashpassword", hashpassword);
//         const data = new customers({ name, email, password: hashpassword });
//         await data.save();
//         console.log("this is error",data);
//         res.json({ msg: "resginter succ", data: data });
//       } else {
//         res.send('user is already exist try to login');
//       }
//     } catch (err) {
//       console.log(err);
//       res.send("this error in backend");
//     }
//   };
  
//   export const login = async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       if (!email || !password) {
//         res.send("Body requere email, password");
//       }
//       const userexist = await customers.findOne({ email: email });
//       console.log(userexist);
//       if (userexist) {
//         console.log(password, userexist.password);
//         const passcheck = await bcrypt.compare(password, userexist.password);
//         if (passcheck) {
//           const accessToken = generateToken(userexist._id);
//           const refreshToken = generateRefreshToken(userexist._id);
//           userexist.refreshToken = refreshToken;
//           await userexist.save();
//           res.status(200).json({ accessToken, refreshToken });
  
//         } else {
//           res.send("password is not correct");
//         }
//       } else {
//         res.send('user not exist try to register');
//       }
//     } catch (err) {
//       console.log(err);
//       res.send("internal error in login");
//     }
//   };
  
// export const token = async (req, res) => {
//     const { refreshToken } = req.body;
//     try {
//       if (!refreshToken) return res.status(401).json({ message: 'No token provided' });
//       const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//       const user = await customers.findById(decoded.id);
//       if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ message: 'Invalid token' });
//       const accessToken = generateToken(user._id);
//       res.status(200).json({ accessToken });
//     } catch (error) {
//       res.status(400).json({ message: 'Token refresh failed', error });
//     }
//   };
  
//   export const logout = async (req, res) => {
//     const { refreshToken } = req.body;
//     try {
//       const user = await customers.findOne({ refreshToken });
//       if (user) {
//         user.refreshToken = null;
//         await user.save();
//       }
//       console.log(user);
//       res.status(200).json({ message: 'User logged out successfully' });
//     } catch (error) {
//       res.status(400).json({ message: 'User logout failed', error });
//     }
//   };
  

import express from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import customers from "../Models/customer.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send('Invalid request data');
        }
        const userexist = await customers.findOne({ where: { email } });
        if (!userexist) {
            const hashpassword = await bcrypt.hash(password, 10);
            const data = await customers.create({ name, email, password: hashpassword });
            res.status(201).json({ msg: "Register successful", data });
        } else {
            res.status(400).send('User already exists, try to login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password required");
        }
        const userexist = await customers.findOne({ where: { email } });
        // console.log(userexist);
        if (userexist) {
            const passcheck = await bcrypt.compare(password, userexist.password);
            if (passcheck) {
                const accessToken = generateToken(userexist.id);
                const refreshToken = generateRefreshToken(userexist.id);
                userexist.refreshToken = refreshToken;
                await userexist.save();
                // console.log(userexist);
                res.status(200).json({ accessToken, refreshToken });
            } else {
                res.status(400).send("Incorrect password");
            }
        } else {
            res.status(400).send('User does not exist, try to register');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

export const token = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        if (!refreshToken) return res.status(401).json({ message: 'No token provided' });
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await customers.findByPk(decoded.id);
        if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ message: 'Invalid token' });
        const accessToken = generateToken(user.id);
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Token refresh failed', error });
    }
};

export const logout = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const user = await customers.findOne({ where: { refreshToken } });
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'User logout failed', error });
    }
};
