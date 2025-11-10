import { NextResponse } from "next/server";



export const POST = async () => {
  try {
    const response = NextResponse.json({
      message: "Logged out successfully ✅",
      success: true,
    });


    response.cookies.delete("authtoken");

    return response;
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
};
