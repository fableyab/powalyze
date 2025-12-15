
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      // Toast handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          required 
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          className="bg-[#1A1A1A] border-white/10"
          placeholder="name@company.com"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="/forgot-password" class="text-xs text-[#BFA76A] hover:underline">Forgot password?</a>
        </div>
        <Input 
          id="password" 
          type="password" 
          required 
          value={formData.password}
          onChange={e => setFormData({...formData, password: e.target.value})}
          className="bg-[#1A1A1A] border-white/10"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold h-12">
        {loading ? <Loader2 className="animate-spin" /> : 'Log In'}
      </Button>
    </form>
  );
};

export default LoginForm;
