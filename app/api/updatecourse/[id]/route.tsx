import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;
    console.log("JWT:", jwt);

    // Get FormData from client request
    const formData = await req.json();

    // Send request to your backend API
    const apiRes = await axios.patch(
      `${process.env.NEXT_PUBLIC_URL}/admin/courses/update/${params.id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`
           
        },
      }
    );

    return NextResponse.json({ message: "Course update successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.response?.data?.message || err.message },
      { status: err.response?.status || 500 }
    );
  }
}
