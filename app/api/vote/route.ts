import {NextRequest, NextResponse} from "next/server";
import {syncCurrentUser} from "@/lib/sync-user";
import {prisma} from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {

        const dbUser = await syncCurrentUser();
        if (!dbUser) {
            return NextResponse.json({error: "Database not found"});
        }
        const { postId } = await request.json();
        if (!postId) {
            return NextResponse.json({error: "PostId not found"});
        }

        const existingVote = await prisma.vote.findUnique({
            where: {userId_postId: {
                        userId: dbUser.id,
                        postId,
                }},
        })

        if(existingVote) {
            await prisma.vote.delete({
                where: {
                    id: existingVote.id
                }
            })
            return NextResponse.json({voted: false});

        } else {
            await prisma.vote.create({
                data: {
                    userId: dbUser.id,
                    postId: postId,
                }
            })
            return NextResponse.json({voted: false});
        }

    }
    catch(error) {
        console.error("Error creating post: ", error);
        return NextResponse.json(
            {
                error: "Internal server error",
            },
            { status: 500 }
        );
    }
}