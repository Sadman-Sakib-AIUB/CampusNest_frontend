"use client";
import Link from 'next/link';
import {use} from 'react';
export default function UserId({ params }: { params: Promise < { id: string } >})
{
    const {id} = use (params)
    return(
        <>
        <h1> Hello User : {id} </h1>
        <Link href="/users"><button>Back</button></Link>
        </>
    )
}