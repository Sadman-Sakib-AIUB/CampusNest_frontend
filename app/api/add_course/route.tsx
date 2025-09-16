import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";


export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    // console.log(jwt)
    
    // Get formData directly (files + fields)
    const formData = await req.json();;

    //  console.log(formData)

    
    await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/admin/courses/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        },
      }
    );

    return NextResponse.json({ message: "Course added successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.response?.data?.message || err.message },
      { status: err.response?.status || 500 }
    );
  }
}
