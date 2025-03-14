import { ShoppingBag } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="relative bg-gradient-to-r from-indigo-500 to-fuchsia-500 p-2.5 rounded-xl transform-gpu group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
          <ShoppingBag className="w-6 h-6 text-white transform-gpu group-hover:-rotate-6 transition-transform duration-500" />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
            Linok
          </span>
          <span className="text-slate-800">.me</span>
        </h1>
      </div>
    </div>
  );
};

export default Logo;
