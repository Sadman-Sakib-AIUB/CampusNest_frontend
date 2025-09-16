import axios from "axios";
import { cookies } from "next/headers";

export async function getTeacherUsername(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (!jwt) return null;

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/teacher/profile`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return res.data.teacher?.username|| null;
  } catch (error) {
    console.error("Failed to fetch teacher fullname:", error);
    return null;
  }
}
