import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";
import {GradientHeader} from "@/components/gradient-header";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Icon, Map, PlusIcon} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getCategoryDesign} from "@/app/data/category-data";
import {Badge} from "@/components/ui/badge";
import FeedbackList from "@/components/feedbackList";

export default async function FeedbackPage() {

    const {userId} = await auth();

    const posts = await prisma.post.findMany({
        include: {
            author: true,
            votes: true,
        },
        orderBy:{
            createdAt: "desc",
        },
    });

    const categories = await prisma.post.groupBy({
        by: ["category"],
        _count: true,
    })

    return(
        <>
            <div className={'space-y-6'}>
                <GradientHeader title={"Coomunity Feedback"} subtitle={'Explore, vote, and contribute that matters most'}>
                    <div className={'flex gap-4 justify-center pt-4'}>
                        <Button asChild size={'lg'} className={'bg-white text-blue-600 hover:bg-gray-100'}>
                            <Link href='/feedback/new'>New Feedback <PlusIcon className={'ml-2 h-4 w-4'}/></Link>
                        </Button>
                        <Button asChild size={'lg'} className={'bg-white text-black hover:bg-gray-100'}>
                            <Link href='/roadmap'>View Roadmap<Map className={'ml-2 h-4 w-4'}/></Link>
                        </Button>
                    </div>
                </GradientHeader>

                <div className={'grid grid-cols-1 lg:grid-cols-4 gap-6'}>
                    <div className={'lg:col-span-1 space-y-6'}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Categories</CardTitle>
                                <CardDescription>Browse feedback by category</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className={'space-y-3'}>
                                    {categories.map((cat) => {
                                        const design = getCategoryDesign(cat.category);
                                        const icon = design.icon;

                                        return <div key={cat.category} className={'group flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer'}>
                                            <div className={'flex items-center gap-3'}>
                                                <div className={`p-2 rounded-lg ${design.light} ${design.border} border`}>
                                                    <Icon className={`h-4 w-4 ${design.text}`} iconNode={[]}/>
                                                </div>
                                                <span className={'font-medium text-sm'}>{cat.category}</span>
                                            </div>
                                            <Badge variant={'secondary'} className={`${design.light} ${design.text}`}>
                                                {cat._count}
                                            </Badge>
                                        </div>
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className={'lg:col-span-3'}>
                        <FeedbackList initialPosts={posts} userId={userId}/>
                    </div>

                </div>
            </div>
        </>

    );
}