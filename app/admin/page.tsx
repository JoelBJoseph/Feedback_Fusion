import {redirect} from "next/navigation";
import {prisma} from "@/lib/prisma";
import {auth} from "@clerk/nextjs/server";
import {GradientHeader} from "@/components/gradient-header";
import AdminFeedbackTable from "@/components/admin-feedback-table";

export default async function Admin() {
    const {userId} = await auth();

    if(!userId) {
        redirect('/sign-in');
    }

    const user = await prisma.user.findUnique({where: {userId: userId}});

    if(!user || user.role != "admin") {
        redirect('/sign-in');
    }

    const post = await prisma.post.findMany({
        include:{
            author: true,
            votes: true,
        },
        orderBy: {
            createdAt: "desc",
        }
    })

    return(
      <div className={'container max-auto'}>
          <GradientHeader title={"Admin Dashboard"} subtitle={'Manage feedback and update their status'}/>
          <AdminFeedbackTable posts={post}/>
      </div>
    );
}