
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';

const RegistrationForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    firstName: '',
    lastName: '',
    email: '', 
    password: '',
    confirmPassword: '',
    company: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        company: formData.company
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" required value={formData.firstName} onChange={handleChange} className="bg-[#1A1A1A] border-white/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" required value={formData.lastName} onChange={handleChange} className="bg-[#1A1A1A] border-white/10" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required value={formData.email} onChange={handleChange} className="bg-[#1A1A1A] border-white/10" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company (Optional)</Label>
        <Input id="company" value={formData.company} onChange={handleChange} className="bg-[#1A1A1A] border-white/10" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required value={formData.password} onChange={handleChange} className="bg-[#1A1A1A] border-white/10" />
        <PasswordStrengthIndicator password={formData.password} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="bg-[#1A1A1A] border-white/10" />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button type="submit" disabled={loading} className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold h-12 mt-4">
        {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;
