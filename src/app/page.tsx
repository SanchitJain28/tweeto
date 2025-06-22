"use client";
import LoadingBackdrop from "@/components/loading/loadingBackdrop";
import {  useAuth, useProfile } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bird,
  Users,
  MessageCircle,
  Heart,
  Share2,
  Zap,
  Shield,
  Globe,
  Star,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import NotSignedIn from "@/components/signin-signup/not-signedin";
import Header from "@/components/header-footer-sidebar/Header";

export default function Home() {
  const { user, loading } = useAuth();

  const {data:USER , isPending} = useProfile({id:user?.id ?? "" , enabled:!loading})

  const LOADING = loading || isPending

  if (LOADING) {
    return (
      <LoadingBackdrop isVisible={loading} message="Loading , Please wait" />
    );
  }

  if (!user) {
    return <NotSignedIn />;
  }

  return (
    <div className="">
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header isWithProfile={true} firstName="Sanchit Jain"/>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-orange-50 to-pink-50">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="w-fit">
                      🎉 Now in Beta - Join thousands of early users!
                    </Badge>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Share your thoughts with the world on{" "}
                      <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                        tweeto
                      </span>
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Connect, share, and discover amazing content. Join the
                      next generation social platform where your voice matters
                      and authentic conversations thrive.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    >
                      Join tweeto Today
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="lg">
                      Watch Demo
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-green-500" />
                      Free to join
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-green-500" />
                      No ads
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-green-500" />
                      Privacy focused
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur-3xl opacity-20"></div>
                    <Card className="relative bg-white/80 backdrop-blur border-0 shadow-2xl">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                JD
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold">John Doe</p>
                              <p className="text-sm text-muted-foreground">
                                @johndoe
                              </p>
                            </div>
                          </div>
                          <p className="text-sm">
                            Just joined tweeto and I m loving the clean
                            interface and genuine conversations! This is what
                            social media should be. 🚀
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                              <Heart className="h-4 w-4" />
                              24
                            </button>
                            <button className="flex items-center gap-1 hover:text-orange-500 transition-colors">
                              <MessageCircle className="h-4 w-4" />8
                            </button>
                            <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                              <Share2 className="h-4 w-4" />3
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <Badge variant="secondary">Features</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Everything you need for meaningful connections
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    tweeto combines the best of social media with a focus on
                    authentic conversations and user privacy.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-pink-500">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                    <p className="text-muted-foreground">
                      Experience blazing fast performance with our optimized
                      platform. Share thoughts instantly.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-pink-500">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Privacy First</h3>
                    <p className="text-muted-foreground">
                      Your data belongs to you. We don t sell your information
                      or show intrusive ads.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-pink-500">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Real Communities</h3>
                    <p className="text-muted-foreground">
                      Connect with like-minded people and build genuine
                      relationships in topic-based communities.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-pink-500">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                    <p className="text-muted-foreground">
                      Connect with people from around the world and discover
                      diverse perspectives and cultures.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-pink-500">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Rich Conversations
                    </h3>
                    <p className="text-muted-foreground">
                      Engage in meaningful discussions with advanced threading
                      and conversation tools.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-pink-500">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Quality Content</h3>
                    <p className="text-muted-foreground">
                      Our algorithm promotes quality content and meaningful
                      interactions over viral noise.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-4 lg:gap-12">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="text-3xl font-bold text-orange-500">50K+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Users
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="text-3xl font-bold text-pink-500">1M+</div>
                  <div className="text-sm text-muted-foreground">
                    Posts Shared
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="text-3xl font-bold text-orange-500">
                    99.9%
                  </div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="text-3xl font-bold text-pink-500">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-orange-500 to-pink-500">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to join the conversation?
                  </h2>
                  <p className="mx-auto max-w-[600px] text-orange-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Start sharing your thoughts and connecting with amazing
                    people today. It s free and always will be.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      className="bg-white text-orange-500 hover:bg-white/90"
                    >
                      Join Now
                    </Button>
                  </form>
                  <p className="text-xs text-orange-100">
                    By signing up, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="underline underline-offset-2 hover:text-white"
                    >
                      Terms of Service
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-1.5 rounded-lg">
              <Bird className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              tweeto
            </span>
          </div>
          <p className="text-xs text-muted-foreground sm:ml-4">
            © 2025 tweeto. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="text-xs hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs hover:underline underline-offset-4"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-xs hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
