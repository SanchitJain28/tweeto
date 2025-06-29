import { Button } from "@/components/ui/button";
import { ArrowRight, Bird } from "lucide-react";
import Link from "next/link";


export default function NotSignedIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="w-full px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bird className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Tweeto</span>
          </div>
          <Link href="/login">
            <Button variant="outline" className="hover:bg-blue-50">
              Sign In
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to
            <span className="text-blue-600 block">Tweeto</span>
          </h1>

          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg group">
                Sign in 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

          </div>
        </div>

        {/* Features Grid */}
    

        {/* CTA Section */}
       
      </main>


    </div>
  );
};

