import {NextRequest, NextResponse} from "next/server";
import {syncCurrentUser} from "@/lib/sync-user";
import {prisma} from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try{
        const dbUser = await syncCurrentUser();
        if(!dbUser){
            return NextResponse.json({ error: "User not found" });
        }

        const body = await request.json();
        const { title, description, category } = body;

        const post = await prisma.post.create({
            data: {
                title,
                description,
                category,
                authorId: dbUser.id,
            }
        })
        return NextResponse.json(post);
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" },{status:500});
    }
}

export async function GET() {
    try{
        const posts = await prisma.post.findMany({
            include: {
                author: true,
                votes: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(posts);
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" },{status:500});
    }
}