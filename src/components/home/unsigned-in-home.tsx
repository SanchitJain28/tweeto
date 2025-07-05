"use client";

import { Button } from "@/components/ui/button";
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
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function UnsignedHome() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <Badge
                  variant="secondary"
                  className="w-fit bg-orange-100 text-orange-700 border-orange-200"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Now in Beta - Join the community!
                </Badge>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Share your thoughts with the world on{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    tweeto
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                  Connect, share, and discover amazing content. Join the next
                  generation social platform where your voice matters and
                  authentic conversations thrive.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                  asChild
                >
                  <Link href="/signup">
                    Join tweeto Today
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 bg-transparent"
                  asChild
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  Free to join
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  No ads
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  Privacy focused
                </div>
              </div>
            </div>

            {/* Right Content - Demo Post */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur-3xl opacity-20"></div>
                <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm sm:text-base">
                            JD
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-slate-900">
                              John Doe
                            </p>
                            <Badge className="bg-blue-500 text-white text-xs px-1.5 py-0.5">
                              ✓
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">@johndoe</p>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                        Just joined tweeto and I am loving the clean interface
                        and genuine conversations! This is what social media
                        should be. 🚀
                      </p>

                      <div className="flex items-center gap-6 text-sm text-slate-600">
                        <button className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span>24</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span>8</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span>3</span>
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
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <Badge variant="secondary" className="bg-slate-100 text-slate-700">
              Features
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Everything you need for meaningful connections
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              tweeto combines the best of social media with a focus on authentic
              conversations and user privacy.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Experience blazing fast performance with our optimized platform. Share thoughts instantly.",
              },
              {
                icon: Shield,
                title: "Privacy First",
                description:
                  "Your data belongs to you. We don't sell your information or show intrusive ads.",
              },
              {
                icon: Users,
                title: "Real Communities",
                description:
                  "Connect with like-minded people and build genuine relationships in topic-based communities.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description:
                  "Connect with people from around the world and discover diverse perspectives and cultures.",
              },
              {
                icon: MessageCircle,
                title: "Rich Conversations",
                description:
                  "Engage in meaningful discussions with advanced threading and conversation tools.",
              },
              {
                icon: Star,
                title: "Quality Content",
                description:
                  "Our algorithm promotes quality content and meaningful interactions over viral noise.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-r from-orange-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="text-center text-white space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Ready to join the conversation?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed">
                Start sharing your thoughts and connecting with amazing people
                today. It is free and always will be.
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-orange-500 hover:bg-white/90 font-semibold flex-1"
                  asChild
                >
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <p className="text-xs sm:text-sm text-orange-100">
                By signing up, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-2 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-xl">
                <Bird className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                tweeto
              </span>
            </div>

            <p className="text-sm text-slate-600">
              © 2025 tweeto. All rights reserved.
            </p>

            <nav className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
