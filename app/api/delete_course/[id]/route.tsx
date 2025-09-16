import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (!jwt) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Forward request to backend
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/admin/courses/delete/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.response?.data?.message || err.message },
      { status: err.response?.status || 500 }
    );
  }
}
