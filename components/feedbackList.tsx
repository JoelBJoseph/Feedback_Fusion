import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {MessagesSquare, ThumbsUp, User} from "lucide-react";
import {formatDistanceToNow} from "date-fns";
import {STATUS_GROUPS} from "@/app/data/status-data";
import {Badge} from "@/components/ui/badge";
import {getCategoryDesign} from "@/app/data/category-data";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

export default function FeedbackList({
    initialPosts,
    userId
}:{
    initialPosts: any[];
    userId: string|null;
}) {

    const [posts, setPosts] = useState(initialPosts);
    const handleVote = async (postId: number) => {
        if(!userId) {
            toast.error("Please sign in to vote");
            return;
        }

        const loadingToast = toast.loading("Submitting...");

        try{
            const response = await fetch("/api/votes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    postId: postId,
                })
            })

            if(!response.ok){
                throw new Error('Vote Failed');
            }

            const data = await response.json();
            toast.dismiss(loadingToast);
            toast.success(data.voted ? "vote added" : "vote removed");

            setPosts(
                posts.map((post) => {
                    if(post.id === postId) {
                        const voteCount = post.votes.length;
                        return {
                            ...post,
                            votes: data.voted ? [...post.votes, {userId}] : post.votes.filter((v) => v.userId !== userId),
                            _count: {
                                votes: data.voted ? voteCount+1: voteCount-1,
                            }
                        }
                    }
                    return post;
                })
            )

        }catch(error){
            console.error('Failed to vote', error);
            toast.dismiss(loadingToast);
            toast.error("Vote Failed");
        }
    }

    return (
        <div className={'space-y-4'}>
            {posts.map((post) => (
                <Card key={post.id} className={'hover:shadow-md transition-shadow border'}>
                    <CardHeader>
                        <div className={'flex items-start justify-between gap-2'}>
                            <div className={'flex-1 min-w-0'}>
                                <CardTitle className={'text-lg'}>{post.title}</CardTitle>
                                <CardDescription className={'flex items-center gap-1.5 mt-1'}>
                                    <User className={'h-3 w-3'}/>
                                    {post.author.name}
                                    <span>|</span>
                                    <span className={'whitespace-nowrap'}>
                                        {formatDistanceToNow(new Date(post.created), {
                                        addSuffix: true,
                                    })}</span>
                                </CardDescription>
                            </div>
                            <div className={'flex gap-1.5'}>
                                {(() => {
                                    const statusGroup = STATUS_GROUPS[post.status as keyof typeof STATUS_GROUPS];
                                    if (!statusGroup) return null;
                                    const StatusIcon = statusGroup.icon;

                                    return (
                                        <Badge className={`${statusGroup.countColor} border ${statusGroup.color} flex items-center gap-1`}>
                                            <StatusIcon className={'h-3 w-3'}/>
                                            {statusGroup.title}
                                        </Badge>
                                    )
                                })()}
                                {(() => {
                                    const design = getCategoryDesign(post.category);
                                    const Icon = design.icon;

                                    return (
                                        <Badge variant={'outline'} className={`text-xs ${design.border} border ${design.text} flex items-center gap-1`}>
                                            <Icon className={'h-3 w-3'}/>
                                            {post.category}
                                        </Badge>
                                    )
                                })()}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className={'text-muted-foreground mb-3'}>{post.description}</p>
                        <div className={'flex items-center justify-between'}>
                            <Button variant={'outline'}size={'sm'} onClick={() => {handleVote(post.id)}} className={'gap-2'}>
                                <ThumbsUp className={`h-4 2-4 ${post.votes.some((v) => v.userId === userId) ? 'fill-current' : " "}`}/>
                                {post.votes.length} Votes
                            </Button>
                            <div className={'text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors'}>
                                <MessagesSquare className={'h-4 w-4'}/>
                                Comments
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}