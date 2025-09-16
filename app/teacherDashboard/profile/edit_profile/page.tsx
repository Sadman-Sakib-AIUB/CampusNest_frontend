import axios from "axios";
import { cookies } from "next/headers";
import UpdateProfile from "./editprofile";

export default async function EditProfile() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_URL}/teacher/profile`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return <UpdateProfile initialData={res.data} />;
}
