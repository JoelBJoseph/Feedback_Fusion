import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";
import {STATUS_ORDER} from "@/app/data/status-data";

export async function PATCH(request: NextRequest, {params}: {params: Promise<{id: number}>}) {
    try{
        const { userId } = await auth();

        if(!userId){
            return NextResponse.json({error: "User not found"});
        }

        const user = await prisma.user.findUnique({where: {clerkUserId: userId}});

        if(!user || user.role !== "admin"){
            return NextResponse.json({error: "Admin does not exist"});
        }

        const {status} = await request.json();

        const {id: postId} = await params;

        if(!STATUS_ORDER.includes(status)){
            return NextResponse.json({error: "Invalid Status"});
        }

        const updatePost = await prisma.post.update({
            where: {id: postId},
            data: {
                status,
            },
            include: {
                author: true,
                votes: true,
            }
        });

        return NextResponse.json(updatePost);

    }
    catch (error) {
        console.error(error);
        return NextResponse.json({error: "Server Error"});
    }
}