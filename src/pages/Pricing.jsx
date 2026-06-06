import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const PLANS = [
 {
 name: 'Free Forever',
 price: '₹0',
 desc: 'Perfect for getting started with AI learning.',
 features: [
 'Basic AI Tutor Chat (50 msgs/day)',
 'Chapter-wise Study Notes',
 'Standard Mock Tests (1/week)',
 'Flashcards & Formula Vault',
 'Community Study Groups'
 ],
 cta: 'Start Free',
 popular: false,
 color: 'border-glass-border',
 btnClass: 'btn-ghost w-full text-center'
 },
 {
 name: 'Pro Student',
 price: '₹299',
 period: '/mo',
 desc: 'Everything you need to crack JEE/NEET or ace your degree.',
 features: [
 'Unlimited AI Tutor (Groq + DeepSeek)',
 'Image Doubt Solving (Gemini Vision)',
 'Unlimited Adaptive Practice & PYQs',
 'Advanced Mock Test Analysis',
 'Personalized Study Planner',
 'Feynman Mode Voice Sessions'
 ],
 cta: 'Upgrade to Pro',
 popular: true,
 color: 'border-indigo shadow-glow-indigo',
 btnClass: 'btn-primary w-full text-center'
 }
];

export default function Pricing() {
 return (
 <div className="min-h-screen bg-bg-primary text-white pt-[70px] pb-24">
 <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16">
 
 <div className="text-center max-w-2xl mx-auto mb-20 animate-fade-in-up">
 <div className="text-pink font-bold tracking-widest text-sm mb-4 uppercase">Pricing</div>
 <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
 An entire coaching institute for the price of a Netflix subscription
 </h1>
 <p className="text-text-secondary text-lg">
 No hidden fees. No sneaky upsells. Just powerful AI tools to help you succeed.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
 {PLANS.map((plan, i) => (
 <div key={plan.name} className={`glass-card p-10 relative animate-fade-in-up d${i+1} ${plan.color} ${plan.popular ? 'bg-glass-hover transform md:-translate-y-4' : ''}`}>
 {plan.popular && (
 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo to-violet text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
 Most Popular
 </div>
 )}
 
 <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
 <p className="text-text-muted text-sm mb-6 h-10">{plan.desc}</p>
 
 <div className="mb-8 border-b border-glass-border pb-8">
 <span className="text-5xl font-display font-bold text-white">{plan.price}</span>
 {plan.period && <span className="text-text-secondary font-medium ml-1">{plan.period}</span>}
 </div>
 
 <ul className="space-y-4 mb-10 min-h-[240px]">
 {plan.features.map(f => (
 <li key={f} className="flex items-start gap-3">
 <Check size={18} className={plan.popular ? "text-indigo-light mt-0.5" : "text-text-muted mt-0.5"} />
 <span className="text-text-secondary text-sm leading-relaxed">{f}</span>
 </li>
 ))}
 </ul>
 
 <Link to="/onboarding/step1" className={plan.btnClass}>
 {plan.cta}
 </Link>
 </div>
 ))}
 </div>

 <div className="mt-20 text-center animate-fade-in-up d3">
 <p className="text-text-muted text-sm">
 Are you a school or coaching institute? <a href="#" className="text-indigo-light hover:underline">Contact us for bulk pricing.</a>
 </p>
 </div>

 </div>
 </div>
 );
}
