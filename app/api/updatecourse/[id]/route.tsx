import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params;
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (!jwt) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get JSON data from client request
    const formData = await req.json();

    // Forward to backend API
    const apiRes = await axios.patch(
      `${process.env.NEXT_PUBLIC_URL}/admin/courses/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return NextResponse.json({
      message: "Course updated successfully",
      data: apiRes.data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.response?.data?.message || err.message },
      { status: err.response?.status || 500 }
    );
  }
}
