import React from 'react';

const Input = ({ label, error, disabled = false, icon: Icon = null, helperText, className = '', ...props }) => {
 return (
 <div className={`flex flex-col gap-1.5 ${className}`}>
 {label && <label className="text-sm font-medium font-body text-text-secondary">{label}</label>}

 <div className="relative flex items-center">
 {Icon && <Icon className="absolute left-3 w-5 h-5 text-text-secondary" />}
 <input
 className={`
 w-full px-4 py-2.5 rounded-[14px] border-[1.5px] transition-all duration-300
 bg-[rgba(255,255,255,0.80)] text-white font-body
 placeholder:text-text-muted
 ${Icon ? 'pl-10' : ''}
 ${error
 ? 'border-rose focus:border-rose focus:shadow-[0_0_0_4px_rgba(255,176,176,0.20)]'
 : 'border-[rgba(204,204,204,0.50)] focus:border-indigo focus:shadow-glow-indigo'
 }
 ${disabled ? 'opacity-50 cursor-not-allowed bg-[rgba(204,204,204,0.15)]' : ''}
 focus:outline-none focus:bg-[rgba(255,255,255,0.95)]
 `}
 disabled={disabled}
 {...props}
 />
 </div>

 {error && <span className="text-xs font-body font-medium text-rose">{error}</span>}
 {helperText && !error && <span className="text-xs font-body text-text-muted">{helperText}</span>}
 </div>
 );
};

export default Input;
