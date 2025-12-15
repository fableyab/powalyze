import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Copy, Download, CheckCircle } from 'lucide-react';
import { twoFactorAuthService } from '@/services/auth/twoFactorAuthService';

const TwoFactorAuthSetup = ({ userId, onComplete }) => {
  const { toast } = useToast();
  const [step, setStep] = useState('init'); // init, verify, backup
  const [secretData, setSecretData] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);

  const startSetup = async () => {
    setLoading(true);
    try {
      const data = await twoFactorAuthService.enableTwoFactorAuth(userId);
      setSecretData(data);
      setStep('verify');
    } catch (err) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible d'initialiser le 2FA." });
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    try {
      await twoFactorAuthService.verifyTwoFactorCode(userId, verificationCode);
      const codes = await twoFactorAuthService.generateBackupCodes(userId);
      setBackupCodes(codes);
      setStep('backup');
      toast({ title: "Succès", description: "Code vérifié. Sauvegardez vos codes de secours." });
    } catch (err) {
      toast({ variant: "destructive", title: "Erreur", description: "Code incorrect." });
    } finally {
      setLoading(false);
    }
  };

  const copyCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    toast({ title: "Copié", description: "Codes de secours copiés dans le presse-papier." });
  };

  const finishSetup = () => {
    onComplete();
  };

  if (step === 'init') {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-400">Protégez votre compte avec l'authentification à deux facteurs.</p>
        <Button onClick={startSetup} disabled={loading} className="bg-[#BFA76A] text-black hover:bg-white font-bold">
          {loading ? <Loader2 className="animate-spin" /> : 'Commencer la configuration'}
        </Button>
      </div>
    );
  }

  if (step === 'verify') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-48 h-48 bg-white p-2 rounded-lg flex items-center justify-center text-black font-mono text-xs">
            [MOCK QR CODE]
            <br/>
            {secretData?.secret}
          </div>
          <p className="text-sm text-gray-400 text-center">Scannez ce QR code avec votre application d'authentification (Google Authenticator, Authy, etc.)</p>
        </div>
        <div className="space-y-2 max-w-xs mx-auto">
          <Label>Entrez le code à 6 chiffres</Label>
          <Input 
            value={verificationCode} 
            onChange={(e) => setVerificationCode(e.target.value)} 
            className="text-center tracking-widest text-lg bg-black/50 border-white/10"
            maxLength={6}
          />
        </div>
        <Button onClick={verifyCode} disabled={loading || verificationCode.length !== 6} className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold">
           {loading ? <Loader2 className="animate-spin" /> : 'Vérifier le code'}
        </Button>
      </div>
    );
  }

  if (step === 'backup') {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
           <div className="flex justify-center mb-2"><CheckCircle className="text-green-500 w-12 h-12" /></div>
           <h3 className="font-bold text-lg">2FA Activé avec succès !</h3>
           <p className="text-gray-400 text-sm">Sauvegardez ces codes de secours en lieu sûr. Ils vous permettront d'accéder à votre compte si vous perdez votre téléphone.</p>
        </div>
        <div className="bg-black/30 p-4 rounded-lg border border-white/10 grid grid-cols-2 gap-2 font-mono text-sm text-[#BFA76A]">
           {backupCodes.map((code, i) => <div key={i} className="text-center">{code}</div>)}
        </div>
        <div className="flex gap-2">
           <Button onClick={copyCodes} variant="outline" className="flex-1 border-white/10"><Copy size={16} className="mr-2"/> Copier</Button>
           <Button variant="outline" className="flex-1 border-white/10"><Download size={16} className="mr-2"/> Télécharger</Button>
        </div>
        <Button onClick={finishSetup} className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold">Terminer</Button>
      </div>
    );
  }

  return null;
};

export default TwoFactorAuthSetup;