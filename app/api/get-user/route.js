// app/api/get-user/route.js
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    return NextResponse.json({
      success: true,
      user: {
        id: decoded.id,
        username: decoded.username,
      },
    });
  } catch (error) {
    console.error("Token verification failed:", error);

    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}
