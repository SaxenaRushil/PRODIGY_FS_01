// pages/api/login.js
const User = require('@/models/Users');
const connect = require('@/utils/db');
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signIn } from "next-auth/react";

export const POST = async (request:any) => {
  try {
    const { email, password } = await request.json();

    await connect();

    
    const user = await User.findOne({ email });
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new NextResponse(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
    }

 
    return new NextResponse(JSON.stringify({ message: "Login successful" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
