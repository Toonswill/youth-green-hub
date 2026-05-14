import { Leaf, FileText, BookOpen, Upload } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-emerald-400" />
              <span className="font-bold text-lg">Youth in Green Hydrogen</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering African youth to shape the clean energy future through policy engagement and knowledge sharing.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/policies" className="hover:text-emerald-400 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Policy Library
              </Link></li>
              <li><Link href="/knowledge" className="hover:text-emerald-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Knowledge Hub
              </Link></li>
              <li><Link href="/upload" className="hover:text-emerald-400 flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload Brief
              </Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-emerald-400">FAQs</a></li>
              <li><a href="#" className="hover:text-emerald-400">Glossary</a></li>
              <li><a href="#" className="hover:text-emerald-400">Research Papers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-emerald-400">Our Mission</a></li>
              <li><a href="#" className="hover:text-emerald-400">Contact Us</a></li>
              <li><a href="#" className="hover:text-emerald-400">Partners</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © 2024 Youth in Green Hydrogen. All rights reserved.
        </div>
      </div>
    </footer>
  )
}