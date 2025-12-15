
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import RegistrationForm from '@/components/Forms/RegistrationForm';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <SEO title="Create Account | Powalyze" />
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-display font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">Join Powalyze to manage your projects efficiently.</p>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <RegistrationForm />
            
            <div className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-[#BFA76A] hover:underline font-medium">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
