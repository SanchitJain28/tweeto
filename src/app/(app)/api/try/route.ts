import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {name,age}= await req.json()
    return NextResponse.json({
        text : `hi ${name} of age ${age}`
    })
}