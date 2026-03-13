import React from "react";
import { Shield, Bell, User, Menu } from "lucide-react";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
              <Shield className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">InjuryIQ</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-teal-600">Dashboard</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-teal-600">Safety Insights</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-teal-600">Performance</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
              <User className="h-5 w-5 text-slate-500" />
            </div>
            <button className="md:hidden rounded-full p-2 text-slate-400 hover:bg-slate-100">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-teal-600" />
                <span className="text-lg font-bold">InjuryIQ</span>
              </div>
              <p className="text-sm text-slate-500 max-w-xs">
                The intelligent platform for injury prevention and athlete safety in youth sports.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-teal-600">Features</a></li>
                  <li><a href="#" className="hover:text-teal-600">Pricing</a></li>
                  <li><a href="#" className="hover:text-teal-600">Security</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-teal-600">About</a></li>
                  <li><a href="#" className="hover:text-teal-600">Blog</a></li>
                  <li><a href="#" className="hover:text-teal-600">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-teal-600">Privacy</a></li>
                  <li><a href="#" className="hover:text-teal-600">Terms</a></li>
                  <li><a href="#" className="hover:text-teal-600">COPPA</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
            © 2026 InjuryIQ Technologies Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
