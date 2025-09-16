import Link from "next/link";

export default function AllUsers(){
    return(
        <div>
        <h1>All users</h1>
        <li><Link href="users/sadman">Sadman</Link></li>
        
        <li><Link href="users/sakib">Sakib</Link></li>
        
        <li><Link href="users/sohag">Sohag</Link></li>
        
        <li><Link href="users/anannya">Anannya</Link></li>
        </div>
        
    )
}