import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    
    const body = await req.json();

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_URL}/teacher/profile/update`,
      body,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(
      { message: response.data.message || "Profile updated successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.response?.data?.message || err.message },
      { status: err.response?.status || 500 }
    );
  }
}
