
import React, { useState, useEffect, useRef } from 'react';
import { StoreProvider, useStore } from './store';
import { 
  Heart, MapPin, Menu, X, ArrowRight, ShieldCheck, Clock, User, LogOut, 
  CheckCircle, List, Mail, Navigation, HeartHandshake, Phone, Instagram, 
  Youtube, MessageCircle, Send, AlertCircle, Utensils, Truck, Code, Terminal,
  Leaf, Users, Globe, Smile, Lock, Smartphone, Eye, EyeOff, AlertTriangle
} from 'lucide-react';
import { Donation, UserRole } from './types';

// --- APP LOGO (HEART HANDSHAKE - NO LEAF) ---
const AppLogo = () => (
    <div className="bg-emerald-100 p-2 rounded-full mr-2 flex items-center justify-center border-2 border-emerald-500 shadow-sm">
        <HeartHandshake className="h-6 w-6 text-emerald-600" />
    </div>
);

// --- DEVELOPER AVATAR ---
const DeveloperAvatar = () => (
  <div className="h-full w-full bg-slate-800 flex items-center justify-center text-white">
    <Terminal className="h-10 w-10" />
  </div>
);

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"; 
};

// --- CONFETTI ---
const Confetti = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
                <div 
                    key={i} 
                    className="confetti"
                    style={{
                        left: `${Math.random() * 100}%`,
                        backgroundColor: ['#F59E0B', '#10B981', '#EC4899', '#3B82F6'][Math.floor(Math.random() * 4)],
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                    }}
                ></div>
            ))}
        </div>
    );
};

// --- SMART CHATBOT ---
const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{from: 'bot'|'user', text: string}[]>([
        {from: 'bot', text: 'Hi! I\'m MealBridge AI. Need help donating or finding food?'}
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSend = () => {
        if(!input.trim()) return;
        
        const userText = input.trim();
        setMessages(prev => [...prev, {from: 'user', text: userText}]);
        setInput('');
        setIsTyping(true);

        // Smart Response Logic
        setTimeout(() => {
            const lower = userText.toLowerCase();
            let reply = "";

            // GREETINGS & BASICS
            if (lower.match(/\b(hi|hello|hey|greetings|good morning|good evening)\b/)) {
                reply = "Hello! Are you here to Donate Food or Claim Food?";
            }
            
            // DONATION INTENT
            else if (lower.includes('donate') || lower.includes('giving') || lower.includes('post food') || lower.includes('share')) {
                reply = "Great! Log in as a 'Donor' to list your food. It takes less than a minute.";
            }
            
            // NGO / CLAIM INTENT
            else if (lower.includes('ngo') || lower.includes('claim') || lower.includes('receive') || lower.includes('find food') || lower.includes('get food')) {
                reply = "We can help. Use 'NGO Access' to find and claim surplus food nearby instantly.";
            }
            
            // MISSION / VALUES
            else if (lower.includes('mission') || lower.includes('about') || lower.includes('what is') || lower.includes('why')) {
                reply = "We connect surplus food from restaurants to people in need. Zero Waste, Zero Hunger.";
            }

            // SAFETY & QUALITY
            else if (lower.includes('safe') || lower.includes('fresh') || lower.includes('quality') || lower.includes('stale')) {
                reply = "Safety first. Donors must list 'Best Before' times. Please verify food quality upon pickup.";
            }
            
            // CONTACT & SUPPORT
            else if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('support') || lower.includes('developer')) {
                reply = "Email: abhisheksk340@gmail.com\nPhone: +91 98765 43210";
            }
            
            // TECHNICAL / ACCOUNT
            else if (lower.includes('password') || lower.includes('login') || lower.includes('signup') || lower.includes('register')) {
                reply = "Please check you selected the right role (Donor vs NGO). Contact support if you need a reset.";
            }

            // OUT OF BOX / GENERAL
            else if (lower.includes('cost') || lower.includes('price') || lower.includes('money') || lower.includes('pay')) {
                reply = "MealBridge is 100% free. Kindness has no price tag.";
            }
            else if (lower.includes('location') || lower.includes('where') || lower.includes('city')) {
                reply = "We operate in Bengaluru, India. Expanding soon!";
            }
            else if (lower.includes('thank') || lower.includes('good') || lower.includes('great') || lower.includes('love')) {
                reply = "You're welcome! Happy to help. 💚";
            }
            else if (lower.includes('joke') || lower.includes('funny')) {
                reply = "You can't make everyone happy, you aren't a taco. But you CAN feed someone today!";
            }
            
            // DEFAULT FALLBACK
            else {
                reply = "I'm still learning. Ask me about donating, claiming, or our mission.";
            }

            setMessages(prev => [...prev, {from: 'bot', text: reply}]);
            setIsTyping(false);
        }, 800);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl mb-4 w-80 h-96 flex flex-col border border-stone-200 overflow-hidden animate-fade-in ring-1 ring-black/5">
                    <div className="bg-emerald-600 p-4 text-white font-bold flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                           <span>MealBridge AI</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-emerald-700 p-1 rounded transition"><X className="h-4 w-4"/></button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
                        {messages.map((m,i) => (
                            <div key={i} className={`p-3 rounded-xl text-sm max-w-[85%] leading-relaxed shadow-sm ${m.from === 'bot' ? 'bg-white text-slate-700 self-start mr-auto rounded-tl-none border border-stone-100' : 'bg-emerald-600 text-white ml-auto rounded-tr-none'}`}>
                                <p className="whitespace-pre-line">{m.text}</p>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="bg-white p-3 rounded-xl rounded-tl-none border border-stone-100 self-start mr-auto shadow-sm w-12 flex items-center justify-center gap-1">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="p-3 bg-white border-t border-stone-100 flex gap-2">
                        <input 
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 px-4 py-2 border border-stone-200 rounded-full outline-none text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                            placeholder="Type a message..." 
                        />
                        <button onClick={handleSend} disabled={!input.trim()} className="bg-emerald-600 disabled:opacity-50 text-white p-2.5 rounded-full hover:bg-emerald-700 transition shadow-sm"><Send className="h-4 w-4"/></button>
                    </div>
                </div>
            )}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 flex items-center justify-center ring-4 ring-emerald-500/20"
                aria-label="Open Chat Help"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </button>
        </div>
    );
};

// --- FOOTER ---
const Footer = ({ onNavigate, onLoginClick }: { onNavigate: (page: string) => void, onLoginClick: (role: 'donor' | 'ngo') => void }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center text-white mb-3">
                  <AppLogo />
                  <span className="font-heading font-bold text-xl">MealBridge</span>
               </div>
               <p className="text-slate-400 mb-4 leading-relaxed max-w-sm text-sm">
                  We are a student-led initiative committed to solving the hunger crisis through technology. 
                  By connecting abundance with need, we aim to build a community where no meal goes to waste.
               </p>
               <div className="flex gap-3">
                  <a href="https://www.instagram.com/abhisheksks?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 text-pink-500 hover:text-white transition" aria-label="Instagram">
                     <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://www.youtube.com/@maahi_s_k_" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 text-red-500 hover:text-white transition" aria-label="YouTube">
                     <Youtube className="w-4 h-4" />
                  </a>
                  <a href="mailto:abhisheksk340@gmail.com" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 text-blue-500 hover:text-white transition" aria-label="Email">
                     <Mail className="w-4 h-4" />
                  </a>
               </div>
            </div>
            
            <div>
               <h3 className="text-white font-bold mb-4 text-base">Quick Links</h3>
               <ul className="space-y-2 text-sm">
                  <li><button onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); onNavigate('landing'); }} className="hover:text-emerald-400 transition">Home</button></li>
                  <li><button onClick={() => onLoginClick('donor')} className="hover:text-emerald-400 transition">Donate Food</button></li>
                  <li><button onClick={() => onLoginClick('ngo')} className="hover:text-emerald-400 transition">Partner as NGO</button></li>
                  <li><button onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); onNavigate('success'); }} className="hover:text-emerald-400 transition">Success Stories</button></li>
               </ul>
            </div>

            <div>
               <h3 className="text-white font-bold mb-4 text-base">Contact Us</h3>
               <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                     <Mail className="w-4 h-4 mr-2 text-blue-500" />
                     <a href="mailto:abhisheksk340@gmail.com" className="hover:text-emerald-400">abhisheksk340@gmail.com</a>
                  </li>
                  <li className="flex items-center">
                     <Phone className="w-4 h-4 mr-2 text-emerald-500" />
                     <span>+91 98765 43210</span>
                  </li>
                  <li className="flex items-start">
                     <MapPin className="w-4 h-4 mr-2 text-red-500 mt-0.5" />
                     <span>Bengaluru, India</span>
                  </li>
               </ul>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-800 text-center text-slate-500 text-xs">
          <p>Made with ❤️ at <span className="text-emerald-400 font-semibold">DSCASC</span> by Abhishek SK &copy; {new Date().getFullYear()} MealBridge. All rights reserved.</p>
        </div>
    </footer>
  );
};

// --- NAVBAR ---
const Navbar = ({ onNavigate, onLoginClick }: { onNavigate: (page: string) => void, onLoginClick: (role: 'donor' | 'ngo') => void }) => {
  const { userRole, logout, userProfile } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    onNavigate('landing');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('landing')}>
            <AppLogo />
            <span className="font-heading font-bold text-xl text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">MealBridge</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {!userRole ? (
              <>
                <button onClick={() => onNavigate('landing')} className="text-slate-600 hover:text-emerald-600 font-medium transition">Home</button>
                <button onClick={() => onNavigate('success')} className="text-slate-600 hover:text-emerald-600 font-medium transition">Stories</button>
                <button onClick={() => onLoginClick('donor')} className="text-slate-600 hover:text-emerald-600 font-medium transition">Donate</button>
                <button onClick={() => onLoginClick('ngo')} className="px-5 py-2 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  NGO Access
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-slate-700">{userProfile?.name}</span>
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full capitalize">{userRole} Mode</span>
                </div>
                <button onClick={handleLogout} className="flex items-center text-slate-600 hover:text-red-500 transition font-medium ml-2">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 p-2 hover:bg-slate-100 rounded-md transition">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
             {!userRole ? (
                <>
                  <button onClick={() => { onNavigate('landing'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-slate-600 font-medium hover:bg-stone-50 rounded-lg">Home</button>
                  <button onClick={() => { onNavigate('success'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-slate-600 font-medium hover:bg-stone-50 rounded-lg">Success Stories</button>
                  <button onClick={() => { onLoginClick('donor'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-slate-600 font-medium hover:bg-stone-50 rounded-lg">Donate Food</button>
                  <button onClick={() => { onLoginClick('ngo'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 text-emerald-600 font-bold bg-emerald-50 rounded-lg">Find Food</button>
                </>
             ) : (
               <button onClick={handleLogout} className="block w-full text-left px-3 py-3 text-red-500 font-medium hover:bg-red-50 rounded-lg">Logout</button>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

// --- AUTH MODAL ---
const AuthModal = ({ 
  isOpen, 
  onClose, 
  targetRole 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  targetRole: 'donor' | 'ngo' | null 
}) => {
  const { registerUser, loginUser, socialLogin, isLoading } = useStore();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [method, setMethod] = useState<'phone' | 'email'>('email'); // Default to email as requested
  const [role, setRole] = useState<UserRole>(targetRole || 'donor');
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
  });
  const [error, setError] = useState('');

  // Reset state when opening/closing
  useEffect(() => {
    if(targetRole) setRole(targetRole);
    if (!isOpen) {
        setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
        setError('');
        setSuccessMsg('');
        setAuthMode('login'); // Always default to Login
    }
  }, [targetRole, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setSuccessMsg('');

      if (authMode === 'signup') {
          // Validation
          if (formData.password.length < 6) {
              setError('Password must be at least 6 characters.');
              return;
          }
          if (formData.password !== formData.confirmPassword) {
              setError('Passwords do not match.');
              return;
          }

          const res = await registerUser({
              name: formData.name,
              email: formData.email,
              contact: formData.phone,
              password: formData.password,
              role: role
          });
          
          if(res.success) {
            setSuccessMsg('Registration successful! Please log in.');
            setAuthMode('login');
            setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
          }
          else setError(res.message || 'Registration failed.');

      } else {
          // Login
          const identifier = method === 'phone' ? formData.phone : formData.email;
          const res = await loginUser(identifier, formData.password, role);
          if(res.success) onClose();
          else setError(res.message || 'Login failed.');
      }
  };

  const handleSocial = async (provider: 'Google' | 'Facebook') => {
      // Use specific logic based on user request: "mine is already login so take details"
      let email = provider === 'Google' ? "abhisheksk340@gmail.com" : "abhisheksk340@facebook.com";
      let name = "Abhishek SK";

      const res = await socialLogin(email, name);
      
      if(res.success) {
         // User exists, just log them in
         onClose();
      } else {
         // User doesn't exist, switch to Signup and Pre-fill
         setAuthMode('signup');
         setMethod('email');
         setFormData(prev => ({
             ...prev,
             name: name,
             email: email,
             phone: '', // User must add phone
             password: '', // User must set password
             confirmPassword: ''
         }));
         setError('Please create a password and add your phone number to finish connecting.');
      }
  };

  const toggleAuthMode = () => {
      setAuthMode(authMode === 'login' ? 'signup' : 'login');
      setError(''); 
      setSuccessMsg('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      {/* STANDARD SIZE: max-w-[380px] */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[380px] overflow-hidden transform transition-all scale-100 border border-stone-200">
        
        {/* COMPACT GREEN HEADER */}
        <div className="bg-emerald-600 p-5 relative text-center">
          <button onClick={onClose} className="absolute top-4 right-4 text-emerald-100 hover:text-white transition bg-emerald-700/50 rounded-full p-1">
            <X className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-bold text-white mb-0.5">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-emerald-100 text-xs">
            {authMode === 'login' ? 'Partner with us to save food.' : 'Join us to bridge the gap.'}
          </p>
        </div>
        
        <div className="p-5">
            
            {/* Method Tabs */}
            <div className="flex bg-stone-100 p-1 rounded-lg mb-4">
                 <button 
                    onClick={() => { setMethod('email'); setError(''); setSuccessMsg(''); }}
                    className={`flex-1 py-1.5 text-center text-xs font-bold rounded-md transition ${method === 'email' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                 >Email</button>
                 <button 
                    onClick={() => { setMethod('phone'); setError(''); setSuccessMsg(''); }}
                    className={`flex-1 py-1.5 text-center text-xs font-bold rounded-md transition ${method === 'phone' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                 >Phone</button>
            </div>

            {successMsg && (
              <div className="bg-emerald-50 text-emerald-600 p-2 rounded text-[10px] mb-3 flex items-center">
                <CheckCircle className="w-3 h-3 mr-1.5 flex-shrink-0"/> {successMsg}
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-2 rounded text-[10px] mb-3 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0"/> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
                {authMode === 'signup' && (
                    <div>
                        <input 
                            required
                            type="text" 
                            className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
                            placeholder={role === 'ngo' ? "Foundation Name" : "Full Name"}
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                )}

                {method === 'phone' && (
                    <div>
                        <input 
                            required
                            type="tel" 
                            className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
                            placeholder="Phone Number (+91...)"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                )}

                {method === 'email' && (
                    <>
                        <div>
                            <input 
                                required
                                type="email" 
                                className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                readOnly={authMode === 'signup' && (formData.email.includes('google') || formData.email.includes('facebook'))}
                            />
                        </div>
                        {authMode === 'signup' && (
                             <div>
                                <input 
                                    required
                                    type="tel" 
                                    className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
                                    placeholder="Mobile Number (Required)"
                                    value={formData.phone}
                                    onChange={e => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                        )}
                    </>
                )}

                <div>
                    <div className="relative">
                        <input 
                            required
                            type={showPassword ? "text" : "password"}
                            className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
                            placeholder="Password"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                         <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {authMode === 'signup' && (
                     <div>
                        <input 
                            required
                            type={showPassword ? "text" : "password"} 
                            className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                        />
                    </div>
                )}
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-700 transition shadow-md text-sm mt-2"
                >
                  {isLoading ? 'Processing...' : (authMode === 'login' ? 'Log In' : 'Sign Up')}
                </button>
            </form>

            <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200"></div></div>
                <div className="relative flex justify-center text-[10px] text-slate-400 uppercase bg-white px-2"><span>or</span></div>
            </div>

            {/* SIDE BY SIDE Social Buttons */}
            <div className="flex gap-3">
                 <button type="button" onClick={() => handleSocial('Google')} className="flex-1 flex items-center justify-center px-4 py-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition text-xs font-bold text-slate-600">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Google
                 </button>
                 <button type="button" onClick={() => handleSocial('Facebook')} className="flex-1 flex items-center justify-center px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-blue-700 transition text-xs font-bold">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                 </button>
            </div>

            {/* Toggle Link at Bottom */}
            <div className="mt-6 text-center pt-2">
                 <button 
                    onClick={toggleAuthMode}
                    className="text-sm text-slate-500 hover:text-emerald-600 transition"
                 >
                    {authMode === 'login' ? (
                        <>Don't have an account? <span className="font-bold text-emerald-600">Sign Up</span></>
                    ) : (
                        <>Already have an account? <span className="font-bold text-emerald-600">Log In</span></>
                    )}
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- CONFIRM CLAIM MODAL (NGO) ---
const ConfirmClaimModal = ({ isOpen, onClose, onConfirm, ngoName, contact }: { isOpen: boolean, onClose: () => void, onConfirm: (name: string, phone: string) => void, ngoName: string, contact: string }) => {
    const [name, setName] = useState(ngoName);
    const [phone, setPhone] = useState(contact);
    
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-[400px] overflow-hidden">
                {/* ORANGE HEADER */}
                <div className="bg-amber-500 p-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5"/>
                        <h2 className="font-bold text-lg">Confirm Claim</h2>
                    </div>
                    <button onClick={onClose}><X className="w-5 h-5"/></button>
                </div>
                
                <div className="p-6">
                    <p className="text-sm text-slate-500 mb-6">Please confirm your details so the donor knows who is coming.</p>
                    
                    <div className="space-y-4 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Foundation / Organization Name</label>
                            <div className="relative">
                                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400"/>
                                <input type="text" value={name} onChange={e=>setName(e.target.value)} className="w-full pl-9 px-3 py-2 border border-amber-200 rounded-lg text-sm outline-none focus:border-amber-500 focus:bg-white bg-white transition shadow-sm font-medium text-slate-700"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Contact Number</label>
                             <div className="relative">
                                <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400"/>
                                <input type="text" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full pl-9 px-3 py-2 border border-amber-200 rounded-lg text-sm outline-none focus:border-amber-500 focus:bg-white bg-white transition shadow-sm font-medium text-slate-700"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button onClick={onClose} className="flex-1 py-2 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition">Cancel</button>
                        <button onClick={() => onConfirm(name, phone)} className="flex-1 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition shadow-md">Claim Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SUCCESS STORIES ---
const SuccessStories = ({ onNavigate, onLoginClick }: { onNavigate: (page: string) => void, onLoginClick: (role: 'donor' | 'ngo') => void }) => {
  const stories = [
    {
      id: 1,
      title: "The Wedding Feast Rescue",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop", // Vegetarian Biryani
      description: "A grand wedding in Palace Grounds had food for 500 extra guests. Within 30 minutes of posting on MealBridge, 'Feed Bangalore' claimed it. That night, steaming hot Veg Biryani fed hundreds at the local shelter.",
      impact: "500 Meals Saved",
      ngo: "Feed Bangalore",
      donor: "Royal Weddings"
    },
    {
      id: 2,
      title: "Daily Bread for Orphanage",
      image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=800&auto=format&fit=crop", // Roti Basket
      description: "Instead of discarding fresh surplus rotis, this restaurant now donates them. These warm, homemade-style rotis become a comforting dinner for the children at 'Little Angels Orphanage'.",
      impact: "50+ Daily Meals",
      ngo: "Little Angels",
      donor: "Spice Village"
    },
    {
      id: 3,
      title: "Corporate Cafeteria Zero Waste",
      image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=800&auto=format&fit=crop", // Thali
      description: "TechPark Cafeteria realized they were throwing away complete nutritious meals. Now, wholesome rice, dal, and curry serve the construction workers building the metro nearby.",
      impact: "200kg/Week Saved",
      ngo: "Urban Construction Aid",
      donor: "TechPark Cafeteria"
    },
    {
        id: 4,
        title: "Grocery Store Produce",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop", // Vegetables
        description: "Fresh Mart started listing fresh vegetables that didn't meet cosmetic standards. These are now turned into nutritious soups and curries, proving that love comes in all shapes.",
        impact: "Zero Food Waste",
        ngo: "Community Kitchen",
        donor: "Fresh Mart"
      }
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col animate-fade-in">
       <div className="bg-emerald-600 py-16 px-4 text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-4">Stories of Hope</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-lg">Real impact. Real people. See how MealBridge is changing lives one meal at a time.</p>
       </div>
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
             {stories.map(story => (
               <div key={story.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 flex flex-col">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                        src={story.image} 
                        alt={story.title} 
                        className="w-full h-full object-cover transform hover:scale-110 transition duration-700" 
                        onError={handleImageError}
                    />
                    <div className="absolute top-4 right-4">
                        <span className="bg-emerald-500/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">{story.impact}</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">{story.title}</h3>
                     <p className="text-slate-600 leading-relaxed mb-6 flex-grow">{story.description}</p>
                     
                     <div className="border-t border-stone-100 pt-4 mt-auto">
                        <div className="flex justify-between text-sm">
                           <div>
                              <span className="block text-slate-400 text-xs uppercase font-bold">Donor</span>
                              <span className="font-semibold text-emerald-700">{story.donor}</span>
                           </div>
                           <div className="text-right">
                              <span className="block text-slate-400 text-xs uppercase font-bold">NGO Partner</span>
                              <span className="font-semibold text-amber-600">{story.ngo}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
             ))}
          </div>
          
          <div className="mt-16 text-center">
             <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to write your own story?</h2>
             <div className="flex justify-center gap-4">
                <button onClick={() => onLoginClick('donor')} className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition">Start Donating</button>
             </div>
          </div>
       </div>
       <Footer onNavigate={onNavigate} onLoginClick={onLoginClick} />
    </div>
  );
};

// --- LANDING PAGE ---
const LandingPage = ({ onLoginClick, onNavigate }: { onLoginClick: (role: 'donor' | 'ngo') => void, onNavigate: (page: string) => void }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Volunteers serving food" 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          {/* Lighter overlay to highlight children/background image */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-slate-900/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 text-emerald-100 backdrop-blur-md text-sm font-medium shadow-sm">
              <HeartHandshake className="w-4 h-4 mr-2 text-emerald-300 fill-emerald-300/20" />
              Bridging the gap between abundance and need
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 drop-shadow-2xl leading-tight tracking-tight animate-fade-in-up delay-100">
            We make a living by what we get,<br />
            but we make a life by what we give.
          </h1>
          <p className="text-xl text-stone-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200 drop-shadow-lg">
            Turn surplus into sustenance. Connect your restaurant's extra food with local shelters instantly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 animate-fade-in-up delay-300">
            <button 
              onClick={() => onLoginClick('donor')}
              className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-700 transition transform hover:-translate-y-1 shadow-xl hover:shadow-emerald-900/30 flex items-center justify-center ring-4 ring-transparent hover:ring-emerald-500/30"
            >
              I want to Donate <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={() => onLoginClick('ngo')}
              className="px-8 py-4 bg-amber-500 text-white rounded-full font-bold text-lg hover:bg-amber-600 transition transform hover:-translate-y-1 shadow-xl hover:shadow-amber-900/30 flex items-center justify-center ring-4 ring-transparent hover:ring-amber-500/30"
            >
              I need Food <MapPin className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section - Floating & Standard Size & Highlighted */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 -mt-20">
         <div className="bg-white rounded-3xl shadow-2xl border-t-4 border-emerald-500 py-10 px-6 md:px-12 flex flex-col md:flex-row justify-evenly items-center transform transition hover:scale-[1.005] duration-500 gap-8 bg-gradient-to-b from-white to-stone-50">
            
            {/* Stat 1 */}
            <div className="flex items-center space-x-5">
               <div className="w-14 h-14 bg-amber-100 rounded-2xl rotate-3 flex items-center justify-center shadow-inner">
                  <Heart className="w-7 h-7 text-amber-600 fill-amber-600" />
               </div>
               <div>
                 <div className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-none">2,500+</div>
                 <div className="text-slate-500 font-bold uppercase tracking-wider text-xs mt-1.5 text-amber-600">Meals Saved</div>
               </div>
            </div>
            
            {/* Divider */}
            <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>

            {/* Stat 2 */}
            <div className="flex items-center space-x-5">
               <div className="w-14 h-14 bg-emerald-100 rounded-2xl -rotate-2 flex items-center justify-center shadow-inner">
                  <Leaf className="w-7 h-7 text-emerald-600 fill-emerald-600" />
               </div>
               <div>
                 <div className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-none">850 kg</div>
                 <div className="text-slate-500 font-bold uppercase tracking-wider text-xs mt-1.5 text-emerald-600">Food Rescued</div>
               </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent"></div>

            {/* Stat 3 */}
            <div className="flex items-center space-x-5">
               <div className="w-14 h-14 bg-blue-100 rounded-2xl rotate-2 flex items-center justify-center shadow-inner">
                  <Users className="w-7 h-7 text-blue-600 fill-blue-600" />
               </div>
               <div>
                 <div className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-none">150+</div>
                 <div className="text-slate-500 font-bold uppercase tracking-wider text-xs mt-1.5 text-blue-600">Partner NGOs</div>
               </div>
            </div>
         </div>
      </div>

      {/* How it Works */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-16">How MealBridge Works</h2>
            <div className="grid md:grid-cols-3 gap-12">
               <div className="flex flex-col items-center group">
                  <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition duration-300 shadow-md">
                     <Utensils className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">1. Post a Donation</h3>
                  <p className="text-slate-500 max-w-xs">Donors list surplus food details including quantity and pickup time.</p>
               </div>
               <div className="flex flex-col items-center group">
                  <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition duration-300 shadow-md">
                     <MapPin className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">2. Locate Nearby</h3>
                  <p className="text-slate-500 max-w-xs">NGOs get notified of available food within their radius instantly.</p>
               </div>
               <div className="flex flex-col items-center group">
                  <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition duration-300 shadow-md">
                     <Truck className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">3. Pickup & Feed</h3>
                  <p className="text-slate-500 max-w-xs">Food is claimed, picked up, and distributed to those in need.</p>
               </div>
            </div>
         </div>
      </section>

      {/* About Section - Attractive & Standard */}
      <section className="py-24 bg-stone-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-500 mb-6 drop-shadow-sm">
              Engineering a Future Without Hunger
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
             {/* Founder Card */}
             <div className="bg-white rounded-3xl shadow-xl p-8 border border-stone-100 relative overflow-visible group hover:shadow-2xl transition duration-500 transform hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                   <div className="relative">
                     <div className="h-28 w-28 rounded-2xl bg-slate-900 overflow-hidden flex-shrink-0 border-4 border-white shadow-lg ring-1 ring-stone-200 flex items-center justify-center">
                        <DeveloperAvatar />
                     </div>
                   </div>
                   
                   <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-slate-900">Abhishek SK</h3>
                      <p className="text-emerald-600 font-bold mb-1">Lead Developer & Founder</p>
                      <p className="text-slate-500 text-xs font-medium bg-slate-50 inline-block px-3 py-1 rounded-full border border-slate-100">DSCASC Student Initiative</p>
                   </div>
                </div>

                {/* Emotional Story - Updated Bio */}
                <div className="mb-6 text-slate-600 text-sm leading-relaxed border-t border-stone-100 pt-6">
                    <p className="mb-4">
                        "I started MealBridge as a <span className="text-emerald-700 font-semibold">passionate student initiative</span> with a simple question: Why does hunger exist when we have so much surplus?"
                    </p>
                    <p className="italic text-slate-500">
                        As a fresher in the tech world, I wanted to prove that even a single student project can solve complex social problems. This code is my commitment to bridging the gap between abundance and need.
                    </p>
                </div>

                <div className="mt-4 flex justify-center sm:justify-start gap-3">
                  <a 
                    href="https://www.instagram.com/abhisheksks?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-pink-200 text-pink-600 hover:bg-pink-50 transition text-xs font-bold"
                  >
                    <Instagram className="w-3.5 h-3.5" /> Instagram
                  </a>
                  <a 
                    href="https://www.youtube.com/@maahi_s_k_" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition text-xs font-bold"
                  >
                    <Youtube className="w-3.5 h-3.5" /> YouTube
                  </a>
                </div>
             </div>

             <div className="space-y-10 pl-0 md:pl-8">
                <div className="flex items-start group">
                   <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-600 transform group-hover:rotate-6 transition duration-300 shadow-sm">
                         <Globe className="h-7 w-7" />
                      </div>
                   </div>
                   <div className="ml-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition">Our Vision</h4>
                      <p className="text-slate-600 leading-relaxed">
                         To create a city with Zero Hunger and Zero Food Waste by leveraging real-time location data and community participation.
                      </p>
                   </div>
                </div>

                <div className="flex items-start group">
                   <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-100 text-amber-600 transform group-hover:-rotate-6 transition duration-300 shadow-sm">
                         <ShieldCheck className="h-7 w-7" />
                      </div>
                   </div>
                   <div className="ml-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition">Our Mission</h4>
                      <p className="text-slate-600 leading-relaxed mb-4">
                         MealBridge connects local food donors with shelters in real-time to eliminate food waste.
                      </p>
                      <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-slate-600 my-2 bg-emerald-50/50 py-2 rounded-r-lg text-sm">
                        "If you can't feed a hundred people, then feed just one."
                        <footer className="text-slate-400 text-xs mt-1 font-medium not-italic">— Mother Teresa</footer>
                      </blockquote>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} onLoginClick={onLoginClick} />
    </div>
  );
};

// --- DONOR DASHBOARD ---
const DonorDashboard = () => {
  const { donations, addDonation, confirmPickup, isLoading, userProfile, userLocation, updateUserProfile } = useStore();
  const [formData, setFormData] = useState({
    food_title: '',
    quantity: '',
    pickup_address: '',
    best_before_time: '',
    category: 'Cooked Meals',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'
  });
  const [activeTab, setActiveTab] = useState<'donate' | 'history'>('donate');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [contactInput, setContactInput] = useState('');

  const handleUseLocation = () => {
     if (userLocation) {
         setFormData(prev => ({
             ...prev,
             pickup_address: "Current Location (Detected)"
         }));
     }
  };
  
  const handleUpdateContact = () => {
      if(contactInput.length >= 10) {
          updateUserProfile({ contact: contactInput });
      } else {
          alert("Please enter a valid phone number.");
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile?.contact && contactInput.length < 10) {
        alert("Please add your phone number before posting.");
        return;
    }
    
    await addDonation({
      food_title: formData.food_title,
      quantity: formData.quantity,
      category: formData.category,
      pickup_address: formData.pickup_address,
      best_before: new Date(Date.now() + parseInt(formData.best_before_time || '4') * 3600000).toISOString(),
      image_url: formData.image_url,
      latitude: userLocation ? userLocation.lat : 12.9716, 
      longitude: userLocation ? userLocation.lng : 77.5946,
    });
    
    // Clear form
    setFormData({
        food_title: '',
        quantity: '',
        pickup_address: '',
        best_before_time: '',
        category: 'Cooked Meals',
        image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'
    });
    
    setShowSuccessModal(true);
  };

  const myDonations = donations.filter(d => d.donor_id === userProfile?.id);

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-opacity duration-300">
              <Confetti />
              {/* BIGGER MODAL max-w-[480px] */}
              <div className="bg-white rounded-3xl p-8 max-w-[480px] w-full text-center relative animate-pop shadow-2xl border-4 border-white/50 ring-1 ring-stone-200">
                  <div className="flex justify-center mb-6">
                       <div className="bg-emerald-100 p-4 rounded-full animate-bounce-in shadow-inner">
                           <HeartHandshake className="w-10 h-10 text-emerald-600" />
                       </div>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">Congratulations!</h3>
                  <p className="text-emerald-600 font-medium text-base mb-8">You've successfully shared a meal.</p>
                  
                  {/* Highlighted Quote Box */}
                  <div className="mb-8 p-6 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-100 shadow-sm relative">
                      <span className="text-4xl text-emerald-200 absolute -top-2 left-2 font-serif leading-none">“</span>
                      <p className="text-slate-700 italic text-lg leading-relaxed font-medium px-2">
                          Your kindness is the sunshine in someone's cloudy day. Thank you for making a difference.
                      </p>
                      <span className="text-4xl text-emerald-200 absolute -bottom-6 right-4 font-serif leading-none">”</span>
                  </div>
                  
                  <button 
                    onClick={() => { setShowSuccessModal(false); setActiveTab('history'); }}
                    className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5"
                  >
                      View History
                  </button>
              </div>
          </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
             <h1 className="text-3xl font-heading font-bold text-slate-900">Donor Dashboard</h1>
             <p className="text-slate-500 mt-1">Hello, <span className="text-emerald-600 font-semibold">{userProfile?.name}</span></p>
          </div>
          <div className="flex bg-white rounded-lg p-1.5 shadow-sm border border-stone-200">
            <button onClick={() => setActiveTab('donate')} className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === 'donate' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500'}`}>New Donation</button>
            <button onClick={() => setActiveTab('history')} className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === 'history' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500'}`}>History</button>
          </div>
        </div>
        
        {/* MISSING CONTACT WARNING */}
        {(!userProfile?.contact || userProfile.contact.length < 10) && (
             <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg shadow-sm">
                 <div className="flex items-start">
                     <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                     <div className="flex-1">
                         <h4 className="text-amber-800 font-bold text-sm">Missing Contact Information</h4>
                         <p className="text-amber-700 text-xs mb-2">Please add your phone number so NGOs can reach you when they claim your food.</p>
                         <div className="flex gap-2 max-w-xs">
                             <input 
                                type="tel" 
                                placeholder="+91 99999 99999" 
                                className="flex-1 px-3 py-1.5 text-sm border border-amber-300 rounded outline-none focus:border-amber-600"
                                value={contactInput}
                                onChange={e => setContactInput(e.target.value)}
                             />
                             <button onClick={handleUpdateContact} className="bg-amber-600 text-white px-3 py-1.5 rounded text-sm font-bold hover:bg-amber-700">Save</button>
                         </div>
                     </div>
                 </div>
             </div>
        )}

        {activeTab === 'donate' ? (
          <div className="bg-white rounded-2xl shadow-lg border border-stone-100 overflow-hidden animate-fade-in">
             <div className="bg-emerald-600 p-4 text-white">
                 <h2 className="font-bold flex items-center"><Heart className="w-4 h-4 mr-2"/> Post a Donation</h2>
                 <p className="text-emerald-100 text-xs mt-1">Details help NGOs find your food quickly.</p>
             </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Food Title</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-stone-50 text-slate-900 outline-none focus:border-emerald-500 text-sm" placeholder="e.g., Vegetable Stir Fry, Rice, Bread" value={formData.food_title} onChange={e => setFormData({...formData, food_title: e.target.value})} />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 mb-2">Category</label>
                   <select className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-stone-50 text-slate-900 outline-none focus:border-emerald-500 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      <option>Cooked Meals (Veg)</option>
                      <option>Baked Goods</option>
                      <option>Raw Produce</option>
                   </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Quantity</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-stone-50 text-slate-900 outline-none focus:border-emerald-500 text-sm" placeholder="e.g., 20 servings, 5 kg" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">Best Before (Hours from now)</label>
                  <input required type="number" min="1" className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-stone-50 text-slate-900 outline-none focus:border-emerald-500 text-sm" placeholder="e.g., 4" value={formData.best_before_time} onChange={e => setFormData({...formData, best_before_time: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Pickup Address</label>
                <div className="flex gap-2">
                    <input required type="text" className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-stone-50 text-slate-900 outline-none focus:border-emerald-500 text-sm" placeholder="Enter full address or area name" value={formData.pickup_address} onChange={e => setFormData({...formData, pickup_address: e.target.value})} />
                    <button type="button" onClick={handleUseLocation} className="bg-white text-slate-600 font-bold px-4 rounded-lg border border-stone-300 hover:bg-stone-50 whitespace-nowrap text-sm flex items-center"><MapPin className="w-4 h-4 mr-1" /> Use My Location</button>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-emerald-500 text-white font-bold py-3.5 rounded-full hover:bg-emerald-600 transition shadow-lg mt-4">{isLoading ? 'Posting...' : 'Post Donation'}</button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
               {myDonations.length === 0 ? (
                 <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300">
                    <p className="text-slate-400">No donations yet. Start giving!</p>
                 </div>
               ) : (
                 myDonations.map(donation => (
                   <div key={donation.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col md:flex-row justify-between items-start animate-fade-in">
                      <div className="flex items-center space-x-5 w-full md:w-auto">
                         <img src={donation.image_url} alt="Food" className="h-20 w-20 rounded-xl object-cover shadow-sm" onError={handleImageError} />
                         <div>
                            <h3 className="font-bold text-slate-900 text-lg">{donation.food_title}</h3>
                            <p className="text-xs text-slate-500 mb-1">{donation.quantity} • Posted {new Date(donation.created_at).toLocaleDateString()}</p>
                            
                            {donation.status !== 'available' && donation.claimedBy && (
                                <div className="mt-2 text-sm text-slate-600 bg-stone-50 p-2 rounded border border-stone-200">
                                    <span className="font-bold text-emerald-600 block text-[10px] uppercase mb-1">Claimed By</span>
                                    <div className="font-semibold text-xs flex items-center"><User className="w-3 h-3 mr-1"/> {donation.claimedBy.name}</div>
                                    <div className="flex items-center text-slate-500 text-xs mt-1">
                                        <Phone className="w-3 h-3 mr-1"/> {donation.claimedBy.contact}
                                    </div>
                                </div>
                            )}
                         </div>
                      </div>
                      <div className="w-full md:w-auto flex flex-col items-end gap-2 mt-4 md:mt-0">
                         {donation.status === 'available' && (
                             <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span> Available
                             </div>
                         )}
                         
                         {donation.status !== 'picked_up' && (
                             <button className="text-xs text-slate-400 hover:text-emerald-600 flex items-center border border-stone-200 px-2 py-1 rounded">
                                 <CheckCircle className="w-3 h-3 mr-1"/> Mark Picked Up
                             </button>
                         )}

                         {donation.status === 'reserved' && (
                            <div className="flex flex-col gap-2 items-end mt-2">
                                 <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded text-xs font-bold flex items-center">
                                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-2"></span> Reserved
                                 </div>
                                 <button 
                                    onClick={() => confirmPickup(donation.id)}
                                    className="bg-emerald-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-emerald-700 transition flex items-center shadow-sm"
                                 >
                                    <CheckCircle className="w-3 h-3 mr-1" /> Confirm Pickup
                                 </button>
                            </div>
                        )}
                      </div>
                   </div>
                 ))
               )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- NGO DASHBOARD ---
const NGODashboard = () => {
  const { donations, claimDonation, userProfile } = useStore();
  const [activeTab, setActiveTab] = useState<'available' | 'claimed'>('available');
  const [activeFilter, setActiveFilter] = useState<'all' | 'nearby' | 'veg'>('all');
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, id: string | null}>({isOpen: false, id: null});

  const handleClaimClick = (id: string) => {
      setConfirmModal({ isOpen: true, id: id });
  };

  const handleConfirmClaim = (name: string, phone: string) => {
      if (confirmModal.id) {
          claimDonation(confirmModal.id, { name: name, contact: phone });
          setConfirmModal({ isOpen: false, id: null });
          setActiveTab('claimed');
      }
  };

  const availableDonations = donations.filter(d => d.status === 'available');
  const myClaims = donations.filter(d => d.status === 'reserved' && d.claimedBy?.name === userProfile?.name);

  // Filter Logic
  const displayedDonations = (activeTab === 'available' ? availableDonations : myClaims).filter(d => {
      if (activeTab === 'claimed') return true; // Don't filter history unless needed
      
      if (activeFilter === 'nearby') {
          return (d.distance || 0) < 5;
      }
      if (activeFilter === 'veg') {
          const t = d.food_title.toLowerCase();
          const c = (d.category || '').toLowerCase();
          // Exclude non-veg keywords
          if (t.includes('chicken') || t.includes('mutton') || t.includes('fish') || t.includes('egg') || t.includes('meat')) return false;
          // Include veg keywords
          return t.includes('veg') || t.includes('paneer') || t.includes('rice') || t.includes('roti') || t.includes('fruit') || t.includes('bread') || c.includes('veg') || c.includes('produce') || c.includes('baked');
      }
      return true;
  });

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <ConfirmClaimModal 
        isOpen={confirmModal.isOpen} 
        onClose={() => setConfirmModal({isOpen: false, id: null})} 
        onConfirm={handleConfirmClaim}
        ngoName={userProfile?.name || ''}
        contact={userProfile?.contact || ''}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-3xl font-heading font-bold text-slate-900">NGO Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">Welcome, <span className="text-emerald-700 font-bold">{userProfile?.name}</span></p>
            </div>
            
            <div className="flex gap-2">
                <button onClick={() => setActiveTab('available')} className={`px-4 py-2 rounded text-sm font-bold transition ${activeTab === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-white text-slate-500 border border-stone-200'}`}>Find Food</button>
                <button onClick={() => setActiveTab('claimed')} className={`px-4 py-2 rounded text-sm font-bold transition ${activeTab === 'claimed' ? 'bg-emerald-100 text-emerald-800' : 'bg-white text-slate-500 border border-stone-200'}`}>My Claims</button>
            </div>
        </div>
        
        {/* Filters Row */}
        {activeTab === 'available' && (
             <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                 <button 
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition ${activeFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-stone-200'}`}
                 >All Items</button>
                 <button 
                    onClick={() => setActiveFilter('nearby')}
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition ${activeFilter === 'nearby' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-stone-200'}`}
                 >Nearby (&lt; 5km)</button>
                 <button 
                    onClick={() => setActiveFilter('veg')}
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition ${activeFilter === 'veg' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-stone-200'}`}
                 >Veg Only</button>
             </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {displayedDonations.length > 0 ? (
                displayedDonations.map(donation => (
                <div key={donation.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-200 flex flex-col hover:shadow-md transition">
                    <div className="h-48 relative group">
                        <img src={donation.image_url} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" onError={handleImageError} alt="food"/>
                        
                        <div className="absolute top-3 left-3">
                            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wide">
                                {donation.category || 'Cooked Meals'}
                            </span>
                        </div>
                        
                         <div className="absolute top-3 right-3">
                            <span className="bg-slate-900/60 backdrop-blur text-white text-[10px] font-medium px-2 py-1 rounded flex items-center">
                                <Clock className="w-3 h-3 mr-1"/> Use by {new Date(donation.best_before).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                        </div>
                        
                        <div className="absolute bottom-3 left-3">
                            <span className="bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded flex items-center">
                                <MapPin className="w-3 h-3 mr-1 text-emerald-400"/> {donation.distance ? `${donation.distance.toFixed(1)} km away` : '0.0 km away'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col bg-stone-50/50">
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="font-bold text-lg text-slate-800 leading-tight">{donation.food_title}</h3>
                        </div>

                        <div className="text-xs text-slate-500 mb-4 space-y-1">
                             <div className="flex items-center justify-between">
                                <span>{donation.pickup_address}</span>
                                <a 
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${donation.latitude},${donation.longitude}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-emerald-600 hover:text-emerald-800 flex items-center font-bold"
                                >
                                    <Navigation className="w-3 h-3 mr-1" /> Navigate
                                </a>
                             </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-auto border-t border-stone-200 pt-4 mb-4">
                             <div>
                                 <span className="text-[10px] text-slate-400 uppercase font-bold block">Quantity</span>
                                 <span className="text-xs text-slate-600 font-medium flex items-center"><List className="w-3 h-3 mr-1"/> {donation.quantity}</span>
                             </div>
                             <div>
                                 <span className="text-[10px] text-slate-400 uppercase font-bold block">Donor</span>
                                 <span className="text-xs text-slate-600 font-medium flex items-center"><User className="w-3 h-3 mr-1"/> {donation.donor_name}</span>
                             </div>
                        </div>

                        <div className="flex gap-2">
                             <a href={`tel:${donation.donor_contact || ''}`} className="bg-white border border-stone-300 text-slate-600 font-bold py-3 px-3 rounded hover:bg-stone-50 transition shadow-sm flex items-center justify-center">
                                <Phone className="w-4 h-4" />
                             </a>
                            {activeTab === 'available' && (
                                <button onClick={() => handleClaimClick(donation.id)} className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded hover:bg-emerald-700 transition shadow-sm text-sm">Claim Donation</button>
                            )}
                            {activeTab === 'claimed' && (
                                <div className="flex-1 bg-emerald-100 text-emerald-800 font-bold py-3 rounded text-center text-sm border border-emerald-200">
                                    Claimed
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))
            ) : (
                <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300">
                    <p className="text-slate-400">
                        {activeTab === 'available' 
                            ? (activeFilter !== 'all' ? `No ${activeFilter === 'veg' ? 'vegetarian' : 'nearby'} donations found.` : 'No active donations right now.')
                            : "You haven't claimed any donations yet."
                        }
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
const Main = () => {
  const { userRole } = useStore();
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'donor' | 'ngo' | null>(null);

  useEffect(() => {
    if (userRole) setCurrentPage(userRole);
    else if (currentPage !== 'success') setCurrentPage('landing');
  }, [userRole]);

  const handleLoginClick = (role: 'donor' | 'ngo') => {
    setAuthRole(role);
    setIsAuthOpen(true);
  };

  const renderPage = () => {
    switch(currentPage) {
        case 'donor': return <DonorDashboard />;
        case 'ngo': return <NGODashboard />;
        case 'success': return <SuccessStories onNavigate={setCurrentPage} onLoginClick={handleLoginClick} />;
        default: return <LandingPage onNavigate={setCurrentPage} onLoginClick={handleLoginClick} />;
    }
  };

  return (
    <div className="font-sans text-slate-600 bg-stone-50 min-h-screen">
      <Navbar onNavigate={setCurrentPage} onLoginClick={handleLoginClick} />
      <main>{renderPage()}</main>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} targetRole={authRole} />
      {currentPage === 'landing' && <ChatBot />}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  );
}
