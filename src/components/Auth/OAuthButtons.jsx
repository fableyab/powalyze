import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Github, Facebook, Twitter, Linkedin, Slack } from 'lucide-react';

const OAuthButtons = () => {
  const { socialLogin, loading } = useAuth();

  const handleLogin = (provider) => {
    if (loading) return;
    socialLogin(provider);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-in fade-in duration-700 delay-100">
       <Button 
         variant="outline" 
         disabled={loading}
         className="w-full flex items-center justify-center gap-2 border-white/10 hover:bg-white/5 text-white h-11 transition-all duration-300 hover:scale-105" 
         onClick={() => handleLogin('google')}
       >
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google
       </Button>
       
       <Button 
         variant="outline" 
         disabled={loading}
         className="w-full flex items-center justify-center gap-2 border-white/10 hover:bg-white/5 text-white h-11 transition-all duration-300 hover:scale-105" 
         onClick={() => handleLogin('microsoft')}
       >
          <svg className="w-4 h-4" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
             <path fill="#f35325" d="M1 1h10v10H1z"/>
             <path fill="#81bc06" d="M12 1h10v10H12z"/>
             <path fill="#05a6f0" d="M1 12h10v10H1z"/>
             <path fill="#ffba08" d="M12 12h10v10H12z"/>
          </svg>
          Microsoft
       </Button>

       <Button 
         variant="outline" 
         disabled={loading}
         className="w-full flex items-center justify-center gap-2 border-white/10 hover:bg-white/5 text-white h-11 transition-all duration-300 hover:scale-105" 
         onClick={() => handleLogin('github')}
       >
          <Github size={16} />
          GitHub
       </Button>

       <Button 
         variant="outline" 
         disabled={loading}
         className="w-full flex items-center justify-center gap-2 border-white/10 hover:bg-white/5 text-white h-11 transition-all duration-300 hover:scale-105" 
         onClick={() => handleLogin('apple')}
       >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.84 9.49.5.09.68-.21.68-.47v-1.71c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.335 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.65.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.57.69.48A10.002 10.002 0 0022 12c0-5.523-4.477-10-10-10z"/></svg>
          Apple
       </Button>

       <Button 
         variant="outline" 
         disabled={loading}
         className="w-full flex items-center justify-center gap-2 border-white/10 hover:bg-white/5 text-white h-11 transition-all duration-300 hover:scale-105" 
         onClick={() => handleLogin('linkedin')}
       >
          <Linkedin size={16} color="#0A66C2" />
          LinkedIn
       </Button>

       <Button 
         variant="outline" 
         disabled={loading}
         className="w-full flex items-center justify-center gap-2 border-white/10 hover:bg-white/5 text-white h-11 transition-all duration-300 hover:scale-105" 
         onClick={() => handleLogin('facebook')}
       >
          <Facebook size={16} color="#1877F2" />
          Facebook
       </Button>

       <Button 
         variant="outline" 
         disabled={loading}
         className="w-full flex items-center justify-center gap-2 border-white/10 hover:bg-white/5 text-white h-11 transition-all duration-300 hover:scale-105" 
         onClick={() => handleLogin('twitter')}
       >
          <Twitter size={16} color="#1DA1F2" />
          Twitter
       </Button>

       <Button 
         variant="outline" 
         disabled={loading}
         className="w-full flex items-center justify-center gap-2 border-white/10 hover:bg-white/5 text-white h-11 transition-all duration-300 hover:scale-105" 
         onClick={() => handleLogin('okta')}
       >
          <span className="font-bold text-lg">O</span>
          Okta
       </Button>

       <Button 
         variant="outline" 
         disabled={loading}
         className="w-full flex items-center justify-center gap-2 border-white/10 hover:bg-white/5 text-white h-11 transition-all duration-300 hover:scale-105" 
         onClick={() => handleLogin('slack')}
       >
          <Slack size={16} />
          Slack
       </Button>
    </div>
  );
};

export default OAuthButtons;