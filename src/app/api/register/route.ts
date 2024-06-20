// pages/api/register.js
const User = require('@/models/Users');
const connect = require('@/utils/db');
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request:any) => {
  try {
    const { email, password } = await request.json();

    await connect();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    return new NextResponse(JSON.stringify({ message: "User created successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
