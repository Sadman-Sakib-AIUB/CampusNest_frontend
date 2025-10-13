import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

// Removed: Required interface to fix TypeScript error TS2306/TS2345
// interface ContextProps {
//     params: {
//         id: string;
//     };
// }

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } } // <-- CRITICAL FIX: Reverting to the simplest inline type to satisfy the Next.js compiler
) {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (!jwt) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Forward request to backend
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/admin/courses/delete/${params.id}`, // Retaining your preferred ENV var
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return NextResponse.json(res.data, { status: res.status }); // Added status for better response handling
  } catch (err: any) {
    return NextResponse.json(
      { message: err.response?.data?.message || err.message },
      { status: err.response?.status || 500 }
    );
  }
}
