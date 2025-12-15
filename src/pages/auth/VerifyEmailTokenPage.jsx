import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { authService } from '@/services/auth/authService';

const VerifyEmailTokenPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error

  useEffect(() => {
    const verify = async () => {
      try {
        await authService.verifyEmailToken(token);
        setStatus('success');
        setTimeout(() => navigate('/login'), 3000);
      } catch (err) {
        setStatus('error');
      }
    };
    if (token) verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
           {status === 'verifying' && (
              <>
                 <Loader2 className="w-16 h-16 text-[#BFA76A] animate-spin mx-auto mb-6" />
                 <h1 className="text-xl font-bold">Vérification en cours...</h1>
              </>
           )}
           {status === 'success' && (
              <>
                 <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                 <h1 className="text-xl font-bold mb-2">Email Vérifié !</h1>
                 <p className="text-gray-400 text-sm">Vous allez être redirigé vers la page de connexion.</p>
              </>
           )}
           {status === 'error' && (
              <>
                 <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                 <h1 className="text-xl font-bold mb-2">Lien invalide ou expiré</h1>
                 <Link to="/login">
                    <Button className="mt-4 bg-[#BFA76A] text-black">Retour à la connexion</Button>
                 </Link>
              </>
           )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default VerifyEmailTokenPage;