import React from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
 return (
 <div className="min-h-screen bg-bg-primary text-white pt-[70px] pb-24 flex flex-col items-center justify-center">
 <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center animate-fade-in-up">
 
 <div className="w-24 h-24 bg-glass-fill border border-glass-border rounded-3xl mx-auto mb-8 flex items-center justify-center">
 <span className="text-4xl">✍️</span>
 </div>
 
 <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
 EduMesh Blog
 </h1>
 <p className="text-text-secondary text-lg mb-10">
 Articles on AI in education, study strategies, and exam preparation guides are coming soon.
 </p>
 
 <Link to="/" className="btn-ghost">
 &larr; Back to Home
 </Link>
 
 </div>
 </div>
 );
}
