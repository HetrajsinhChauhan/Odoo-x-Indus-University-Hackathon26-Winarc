import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Package, 
  Building2, 
  LineChart, 
  Boxes,
  Search,
  Bell,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  TrendingUp,
  LayoutDashboard,
  Settings,
  Users
} from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Boxes size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">CoreInventory</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#docs" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Docs</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            </div>

            {/* Login / CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Log in</a>
              <a href="#signup" className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-all shadow-sm hover:shadow">
                Get Started
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a href="#features" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md">Features</a>
              <a href="#docs" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md">Docs</a>
              <a href="#pricing" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md">Pricing</a>
              <div className="pt-4 flex flex-col gap-2">
                <a href="#login" className="block w-full text-center px-3 py-2 text-base font-medium text-slate-700 bg-slate-100 rounded-lg">Log in</a>
                <a href="#signup" className="block w-full text-center px-3 py-2 text-base font-medium text-white bg-indigo-600 rounded-lg">Get Started</a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
                Introducing CoreInventory 2.0
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Inventory automation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">modern teams.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Stop manually tracking stock. CoreInventory syncs your warehouses, automates reordering, and gives you real-time visibility into your entire supply chain.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href="#start" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-base font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                  Get Started <ArrowRight size={18} />
                </a>
                <a href="#learn-more" className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 text-base font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all">
                  Learn More
                </a>
              </div>
              <p className="mt-5 text-sm text-slate-500 flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" /> No credit card required. 14-day free trial.
              </p>
            </div>

            {/* Hero Illustration / Mini Mockup */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-blue-50 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-2xl"></div>
              <div className="relative bg-white border border-slate-200/60 rounded-2xl shadow-2xl shadow-indigo-900/5 p-6 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <BarChart3 className="text-indigo-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Total Value</p>
                      <p className="text-xs text-slate-500">Across all warehouses</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-slate-900">$842,500.00</p>
                    <p className="text-xs font-medium text-emerald-600 flex items-center gap-1 justify-end">
                      <TrendingUp size={12} /> +12.5%
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'MacBook Pro 16"', sku: 'SKU-MBP-16', stock: 142, status: 'In Stock', color: 'bg-emerald-100 text-emerald-700' },
                    { name: 'Ergonomic Chair', sku: 'SKU-ERG-01', stock: 12, status: 'Low Stock', color: 'bg-amber-100 text-amber-700' },
                    { name: 'Mechanical Keyboard', sku: 'SKU-KB-02', stock: 0, status: 'Out of Stock', color: 'bg-red-100 text-red-700' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors cursor-default">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                          <Package size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">{item.sku}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">{item.stock}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.color}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to scale</h2>
            <p className="text-lg text-slate-600">
              Powerful features designed to automate your workflows and eliminate stockouts forever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Package className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Product Management</h3>
              <p className="text-slate-600 leading-relaxed">
                Centralize your product catalog with variants, custom SKUs, and barcode generation. Bulk import in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Multi-Warehouse Support</h3>
              <p className="text-slate-600 leading-relaxed">
                Track stock levels across multiple locations, retail stores, or dropshipping partners from one unified dashboard.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LineChart className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-Time Analytics</h3>
              <p className="text-slate-600 leading-relaxed">
                Make data-driven decisions with forecasting, COGS analysis, and automated low-stock alerts sent to your email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-24 bg-slate-50 overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">A dashboard you'll actually love using</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              No clunky interfaces. CoreInventory is built for speed and simplicity.
            </p>
          </div>

          {/* Full Dashboard UI Mockup */}
          <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-300/40 overflow-hidden flex flex-col md:flex-row h-[600px]">
            
            {/* Mock Sidebar */}
            <div className="w-64 bg-slate-50 border-r border-slate-200 hidden md:flex flex-col p-4">
              <div className="flex items-center gap-2 px-2 pb-6 pt-2">
                <div className="bg-indigo-600 p-1 rounded-md text-white"><Boxes size={16} /></div>
                <span className="font-bold text-slate-800 text-sm">CoreInventory</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg shadow-sm border border-slate-200 text-indigo-600 font-medium text-sm">
                  <LayoutDashboard size={16} /> Dashboard
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                  <Package size={16} /> Inventory
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                  <Building2 size={16} /> Warehouses
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                  <Users size={16} /> Suppliers
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                  <Settings size={16} /> Settings
                </div>
              </div>
            </div>

            {/* Mock Main Content */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Mock Topbar */}
              <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg w-64 text-slate-400">
                  <Search size={16} />
                  <span className="text-sm">Search inventory...</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <Bell size={20} className="hover:text-slate-600 cursor-pointer" />
                  <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    JD
                  </div>
                </div>
              </div>

              {/* Mock Page Content */}
              <div className="p-6 flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Inventory Overview</h3>
                  <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm">
                    + Add Product
                  </button>
                </div>

                {/* Mock Table */}
                <div className="flex-1 border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                  <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 grid grid-cols-12 gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="col-span-5">Product Details</div>
                    <div className="col-span-3">Category</div>
                    <div className="col-span-2 text-right">Stock</div>
                    <div className="col-span-2 text-right">Status</div>
                  </div>
                  <div className="flex-1 overflow-y-auto bg-white p-2">
                    {[
                      { name: 'Wireless Noise-Cancelling Headphones', sku: 'AUDIO-WH-100', cat: 'Electronics', stock: 432, status: 'Healthy' },
                      { name: 'Ergonomic Office Chair V2', sku: 'FURN-CHR-02', cat: 'Furniture', stock: 12, status: 'Low Stock' },
                      { name: '4K Ultra HD Monitor 27"', sku: 'TECH-MON-27', cat: 'Electronics', stock: 85, status: 'Healthy' },
                      { name: 'Mechanical Keyboard (Brown Switches)', sku: 'TECH-KB-BR', cat: 'Accessories', stock: 0, status: 'Out of Stock' },
                      { name: 'USB-C Hub 7-in-1', sku: 'ACC-USB-07', cat: 'Accessories', stock: 156, status: 'Healthy' },
                    ].map((row, idx) => (
                      <div key={idx} className="px-4 py-3 border-b border-slate-50 last:border-0 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/50 rounded-lg transition-colors cursor-pointer">
                        <div className="col-span-5 flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                            <Package size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 truncate pr-4">{row.name}</p>
                            <p className="text-xs text-slate-500">{row.sku}</p>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <span className="text-sm text-slate-600">{row.cat}</span>
                        </div>
                        <div className="col-span-2 text-right">
                          <span className="text-sm font-semibold text-slate-900">{row.stock}</span>
                        </div>
                        <div className="col-span-2 text-right flex justify-end">
                          <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium
                            ${row.status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' : 
                              row.status === 'Low Stock' ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20' : 
                              'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10'}`}>
                            {row.status === 'Healthy' && <CheckCircle2 size={12} className="mr-1" />}
                            {row.status === 'Low Stock' && <AlertCircle size={12} className="mr-1" />}
                            {row.status === 'Out of Stock' && <AlertCircle size={12} className="mr-1" />}
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Start managing inventory smarter
              </h2>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                Join thousands of businesses that trust CoreInventory to run their supply chain operations smoothly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-full transition-colors text-lg shadow-lg shadow-indigo-500/25">
                  Create Free Account
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-colors text-lg backdrop-blur-sm">
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2 pr-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-600 p-1 rounded-md text-white">
                  <Boxes size={18} />
                </div>
                <span className="font-bold text-lg text-slate-900">CoreInventory</span>
              </div>
              <p className="text-sm text-slate-500 mb-6 max-w-xs leading-relaxed">
                The modern inventory management system for scaling ecommerce brands and retail businesses.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-4 text-sm">Product</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4 text-sm">Company</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4 text-sm">Resources</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} CoreInventory, Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-slate-600">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}