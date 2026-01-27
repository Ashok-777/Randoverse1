import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/lib/auth';
import { useAuthStore, mapSupabaseUser } from '@/stores/authStore';
import { UserPlus, Mail, Lock, User, KeyRound } from 'lucide-react';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [step, setStep] = useState<'email' | 'verify'>('email');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const login = useAuthStore((state) => state.login);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !username || !password) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Weak Password',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      await authService.sendOtp(email);
      setStep('verify');
      toast({
        title: 'OTP Sent',
        description: 'Check your email for the verification code',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to Send OTP',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 4) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter the 4-digit code',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      const user = await authService.verifyOtpAndSetPassword(email, otp, password, username);
      login(mapSupabaseUser(user));
      toast({
        title: 'Account Created!',
        description: 'Welcome to RandoVerse',
      });
    } catch (error: any) {
      toast({
        title: 'Verification Failed',
        description: error.message || 'Invalid OTP code',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in max-w-md mx-auto">
      <div className="text-center mb-8">
        <UserPlus className="w-16 h-16 mx-auto mb-4 text-green-400" />
        <h2 className="text-3xl font-bold text-white mb-2">Join RandoVerse</h2>
        <p className="text-white/70">Create your account and start playing</p>
      </div>

      {step === 'email' ? (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div>
            <label className="block text-white mb-2 font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="text-lg"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold flex items-center gap-2">
              <User className="w-4 h-4" /> Username
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className="text-lg"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold flex items-center gap-2">
              <Lock className="w-4 h-4" /> Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min 6 chars)"
              className="text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Sending OTP...' : 'Send Verification Code'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyAndSignup} className="space-y-6">
          <div>
            <label className="block text-white mb-2 font-semibold flex items-center gap-2">
              <KeyRound className="w-4 h-4" /> Verification Code
            </label>
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.slice(0, 4))}
              placeholder="Enter 4-digit code"
              maxLength={4}
              className="text-lg text-center tracking-widest"
            />
            <p className="text-white/60 text-sm mt-2">
              Code sent to {email}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify & Create Account'}
          </button>

          <button
            type="button"
            onClick={() => setStep('email')}
            className="w-full text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Back to email
          </button>
        </form>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={onSwitchToLogin}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          Already have an account? <span className="font-bold">Login</span>
        </button>
      </div>
    </div>
  );
}
