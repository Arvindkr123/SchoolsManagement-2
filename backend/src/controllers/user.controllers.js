import asyncHandler from "../middlewares/asyncHandler.js";
import { userModel } from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/createToken.js";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js";

// add user controller
export const addUsersControllers = asyncHandler(async (req, res, next) => {
    // console.log(req.headers);
    console.log(req.body);
    try {
        const { fName, lName, email, password, phone, role } = req.body;

        switch (true) {
            case !fName:
                return res.status(401).json('Name is required!');
            case !lName:
                return res.status(401).json('Last Name is required!');
            case !email:
                return res.status(401).json('Email is required!');
            case !password:
                return res.status(401).json('Password is required!');
            case !phone:
                return res.status(401).json('Phone is required!');
            case !role:
                return res.status(401).json('User role is required');
        }

        const existedUser = await userModel.findOne({ email });
        if (existedUser) {
            return res.status(404).json({ error: "User already exists!" });
        }

        let hashPassword = await bcryptjs.hash(password, await bcryptjs.genSalt(10));

        let user = new userModel({
            fName,
            lName,
            email,
            password: hashPassword,
            phone,
            role
        });
        let token = generateToken(res, user._id);
        user.api_token = token;
        await user.save();
        // If all validations pass and user is saved, send a success response
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        // Handle errors appropriately
        res.status(500).json({ error: error.message });
    }
});

// login user controller
export const loginUserController = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            res.status(401);
            throw new Error("Email is required !");
            return;
        }
        if (!password) {
            res.status(401);
            throw new Error("Password is required !");
            return;
        }

        // find the user
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(404);
            throw new Error("User not found!")
        }

        // then compare password of the user
        const token = generateToken(res, user._id)
        let comparePassword = await bcryptjs.compare(password, user.password);
        if (!comparePassword) {
            res.status(404);
            throw new Error("worng credentials")
        }

        //  then return user-
        res.status(200).json({
            _id: user._id, first_name: user.fName, role: user.role, email: user.email, api_token: token, last_name: user.lName,
            email_verified_at: user.createdAt,
            updated_at: user.updatedAt
        })
    } catch (error) {
        res.status(401);
        throw new Error(error)
    }
})

// get user by token
export const getUserByTokn = asyncHandler(async (req, res, next) => {
    try {
        const { api_token } = req.body;
        if (!api_token) {
            res.status(404);
            throw new Error("Please provide token")
        }
        const { userId } = jwt.verify(api_token, JWT_SECRET);
        // now find the user
        const user = await userModel.findById(userId).select("-password");
        res.status(200).send(
            {
                "id": user._id,
                "first_name": user.fName,
                "last_name": user.lName,
                "email": user.email,
                "email_verified_at": user.createdAt,
                "created_at": user.createdAt,
                "updated_at": user.createdAt,
                "api_token": user.api_token
            }
        );

    } catch (error) {
        res.status(404);
        throw new Error(error);
        return;
    }
})


export const requsetUserPasswordController = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(404);
            throw new Error("User not found..")
        }
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(200).send(true)
        }
        res.status(404).send(false)
    } catch (error) {
        res.status(404);
        throw new Error(error)
    }
})


export const getAllUsersController = asyncHandler(async (req, res, next) => {
    // console.log(req.headers.authorization.split(" ")[1]);
    try {
        // Extract page and items_per_page from the query parameters
        const { page = 1, items_per_page = 10, search } = req.query;

        // Convert page and items_per_page to numbers
        const skip = (parseInt(page) - 1) * parseInt(items_per_page);
        const limit = parseInt(items_per_page);

        // Build the search query
        const searchQuery = search
            ? {
                $or: [
                    { fName: new RegExp(search, 'i') },
                    { lName: new RegExp(search, 'i') },
                    { email: new RegExp(search, 'i') },
                    // Add more fields as needed
                ]
            }
            : {};

        // Use the skip and limit values in your MongoDB query to implement pagination
        let users = await userModel.find(searchQuery).skip(skip).limit(limit);

        // Mock total users count (replace with actual count from your database)
        const totalUsersCount = await userModel.countDocuments(searchQuery);

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Respond with the array of users and pagination details
        const responseData = {
            data: users.map(user => ({
                id: user.id,
                fName: user.fName,
                email: user.email,
                role: user.role,
                phone: user.phone,
                last_login: daysOfWeek[new Date(user.createdAt).getDay()]
                // Add other user properties as needed
            })),
            payload: {
                pagination: {
                    page: parseInt(page),
                    first_page_url: `/?page=1`,
                    from: skip + 1,
                    last_page: Math.ceil(totalUsersCount / limit),
                    links: [
                        {
                            url: null,
                            label: "&laquo; Previous",
                            active: page > 1,
                            page: page > 1 ? page - 1 : null
                        },
                        {
                            url: `/?page=${page}`,
                            label: page.toString(),
                            active: true,
                            page: parseInt(page)
                        },
                        {
                            url: `/?page=${page + 1}`,
                            label: (page + 1).toString(),
                            active: page < Math.ceil(totalUsersCount / limit),
                            page: page < Math.ceil(totalUsersCount / limit) ? page + 1 : null
                        },
                        {
                            url: `/?page=${Math.ceil(totalUsersCount / limit)}`,
                            label: "Next &raquo;",
                            active: page < Math.ceil(totalUsersCount / limit),
                            page: page < Math.ceil(totalUsersCount / limit) ? Math.ceil(totalUsersCount / limit) : null
                        }
                    ],
                    next_page_url: page < Math.ceil(totalUsersCount / limit) ? `/?page=${page + 1}` : null,
                    items_per_page: limit,
                    prev_page_url: page > 1 ? `/?page=${page - 1}` : null,
                    to: skip + users.length,
                    total: totalUsersCount
                }
            }
        };

        res.status(200).json(responseData);
    } catch (error) {
        // Handle errors, set status to 500 and throw a new error
        res.status(500);
        throw new Error(error);
    }
});


export const editUserController = asyncHandler(async (req, res, next) => {
    const { fName, lName, email, role, password, phone } = req.body;
    try {
        let user = await userModel.findById(req.params.id);

        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ error: "Cannot edit the current logged-in user." });
        }

        if (user.role === 'SuperAdmin') {
            return res.status(400).json({ error: "Cannot update SuperAdmin user." });
        }

        // Uncomment the input validation block for better validation
        /*
        switch (true) {
            case !fName:
                return res.status(400).json({ error: "First Name is required." });
            // Add similar cases for other required fields
        }
        */

        let hashPassword = await bcryptjs.hash(password, 10);
        user.fName = fName || user.fName;
        user.lName = lName || user.lName;
        user.email = email || user.email;
        user.role = role || user.role;
        user.phone = phone || user.phone;
        user.password = hashPassword || user.password;

        let updateUser = await user.save();
        res.status(200).json({ success: "User updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export const deleteUserController = asyncHandler(async (req, res, next) => {
    try {
        // console.log(req.params.id);
        // console.log(req.user._id.toString());
        // console.log(userId === req.user._id);
        let userId = req.params.id;
        if (userId === req.user._id.toString()) {
            res.status(401).json({ message: "You can not delete current user" });
            return;
        }
        let user = await userModel.findById(userId);
        if (user.role === 'SuperAdmin') {
            res.status(404).json({
                message: "You can delete Super Admin"
            })
            return;
        }
        await userModel.findByIdAndDelete(userId);
        res.status(200).json({
            data: {
                message: "User deleted successfully"
            }
        });
    } catch (error) {
        res.status(404);
        throw new Error(error);
    }
})


// get user by id controller
export const getUserByIdController = asyncHandler(async (req, res, next) => {
    // console.log(req.params.id);
    try {
        let user = await userModel.findById(req.params.id);
        if (!user) {
            res.status(401);
            throw new Error("User not found!");
            return;
        }
        // "id": 1,
        // "name": "Emma Smith",
        // "avatar": "avatars/300-6.jpg",
        // "email": "smith@kpmg.com",
        // "position": "Art Director",
        // "role": "Administrator",
        // "last_login": "Yesterday",
        // "two_steps": false,
        // "joined_day": "10 Nov 2022, 9:23 pm",
        // "online": false
        res.status(200).json({
            data: {
                id: user._id,
                fName: user.fName,
                lName: user.lName,
                email: user.email,
                role: user.role,
                password: user.password,
                phone: user.phone
            }
        })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})

