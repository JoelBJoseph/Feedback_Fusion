import Image from "next/image";
import {GradientHeader} from "@/components/gradient-header";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight, BarChart, Map, MessagesSquare, UsersIcon, Zap} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function Home() {
  return (
      <div className={'space-y-12'}>

          <GradientHeader title={'Shape the future of our Products'}
                          subtitle={'Feedback Fusion is where your ideas come to life. Suggest features to be added.'}>
              <div className={'flex gap-4 justify-center pt-4'}>
                  <Button asChild size={'lg'} className={'bg-white text-blue-600 hover:bg-gray-100'}>
                      <Link href='/feedback/new'>Submit Feedback <ArrowRight className={'ml-2 h-4 w-4'}/></Link>
                  </Button>
                  <Button asChild size={'lg'} className={'bg-white text-black hover:bg-gray-100'}>
                      <Link href='/roadmap'>View Roadmap<Map className={'ml-2 h-4 w-4'}/></Link>
                  </Button>
              </div>
          </GradientHeader>

          <section>
              <h2 className={'text-3xl font-bold text-center mb-8'}>How It Works</h2>
              <div className={'grid grid-cols-1 mf:grid-cols-2 lg:grid-cols-4 gap-4'}>
                  <Card>
                      <CardHeader>
                          <MessagesSquare className={'h-8 w-8 text-primary mb-2'}/>
                          <CardTitle>Submit Ideas</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className={'text-muted-foreground'}>
                              Share your suggestion and feature request with the community.
                          </p>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <BarChart className={'h-8 w-8 text-primary mb-2'}/>
                          <CardTitle>Vote & Prioritize</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className={'text-muted-foreground'}>
                              Upvote ideas you love to help us understand what matters most.
                          </p>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <UsersIcon className={'h-8 w-8 text-primary mb-2'}/>
                          <CardTitle>Track Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className={'text-muted-foreground'}>
                              Follow our public roadmap to see what we&#39;re working on next.
                          </p>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <Zap className={'h-8 w-8 text-primary mb-2'}/>
                          <CardTitle>See Results</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className={'text-muted-foreground'}>
                              Watch as your feedback transforms into real features and improvement.
                          </p>
                      </CardContent>
                  </Card>
              </div>
          </section>

          <section className={'text-center'}>
              <div className={'inline-grid grid-col-3 gap-8'}>
                  <div>
                      <div className={'text-3xl font-bold'}>1234+</div>
                      <div className={'text-muted-foreground'}>Suggestions</div>
                  </div>
                  <div>
                      <div className={'text-3xl font-bold'}>8901+</div>
                      <div className={'text-muted-foreground'}>Votes Cast</div>
                  </div>
                  <div>
                      <div className={'text-3xl font-bold'}>254+</div>
                      <div className={'text-muted-foreground'}>Features Shipped</div>
                  </div>
              </div>
          </section>

      </div>
  );
}
