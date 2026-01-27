import { useState } from 'react';
import GameLayout from '@/components/layout/GameLayout';
import { Input } from '@/components/ui/input';
import { UserCheck, UserX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PersonPickerProps {
  onBack: () => void;
}

export default function PersonPicker({ onBack }: PersonPickerProps) {
  const [mode, setMode] = useState<'select' | 'eliminate' | null>(null);
  const [step, setStep] = useState<'mode' | 'total' | 'names' | 'action'>('mode');
  const [totalPersons, setTotalPersons] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [currentNameInput, setCurrentNameInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [processedNames, setProcessedNames] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleAddName = () => {
    const trimmedName = currentNameInput.trim();
    
    if (!trimmedName) return;
    
    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      toast({
        title: 'Invalid Name',
        description: 'Please enter alphabets only',
        variant: 'destructive',
      });
      return;
    }

    if (names.includes(trimmedName)) {
      toast({
        title: 'Duplicate Name',
        description: 'This name has already been entered',
        variant: 'destructive',
      });
      return;
    }

    if (names.length < parseInt(totalPersons)) {
      setNames([...names, trimmedName]);
      setCurrentNameInput('');
    }
  };

  const handlePick = () => {
    const availableNames = names.filter(name => !processedNames.has(name));
    
    if (availableNames.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const selectedName = availableNames[randomIndex];
    
    setResult(selectedName);
    setProcessedNames(prev => new Set([...prev, selectedName]));
  };

  const handleContinueToNames = () => {
    const total = parseInt(totalPersons);
    if (!total || total < 2) {
      toast({
        title: 'Invalid Number',
        description: 'Please enter at least 2 persons',
        variant: 'destructive',
      });
      return;
    }
    setStep('names');
  };

  const handleRetry = () => {
    setMode(null);
    setStep('mode');
    setTotalPersons('');
    setNames([]);
    setCurrentNameInput('');
    setResult(null);
    setProcessedNames(new Set());
  };

  return (
    <GameLayout 
      gameName="Random Person Picker" 
      onBack={onBack}
      onRetry={handleRetry}
      showRetry={result !== null}
    >
      <div className="max-w-2xl mx-auto">
        {step === 'mode' ? (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Choose Mode
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => {
                  setMode('select');
                  setStep('total');
                }}
                className="flex-1 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <UserCheck className="w-16 h-16 mx-auto mb-4" />
                <p className="text-2xl font-bold">Select</p>
              </button>
              
              <button
                onClick={() => {
                  setMode('eliminate');
                  setStep('total');
                }}
                className="flex-1 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <UserX className="w-16 h-16 mx-auto mb-4" />
                <p className="text-2xl font-bold">Eliminate</p>
              </button>
            </div>
          </div>
        ) : step === 'total' ? (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Enter Total Number of Persons
            </h2>
            <Input
              type="number"
              min="2"
              value={totalPersons}
              onChange={(e) => setTotalPersons(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleContinueToNames()}
              className="mb-6 text-lg"
              placeholder="Enter number..."
            />
            <button
              onClick={handleContinueToNames}
              className="btn-primary w-full"
            >
              Continue
            </button>
          </div>
        ) : step === 'names' && names.length < parseInt(totalPersons || '0') ? (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Enter Names ({names.length}/{totalPersons})
            </h2>
            
            <div className="flex gap-3 mb-6">
              <Input
                type="text"
                value={currentNameInput}
                onChange={(e) => setCurrentNameInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddName()}
                className="flex-1 text-lg"
                placeholder="Enter name..."
              />
              <button
                onClick={handleAddName}
                className="btn-primary px-6"
              >
                Add
              </button>
            </div>

            {names.length > 0 && (
              <>
                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <p className="text-white font-semibold mb-2">Added Names:</p>
                  <div className="flex flex-wrap gap-2">
                    {names.map((name, i) => (
                      <span key={i} className="bg-purple-500/30 text-white px-3 py-1 rounded-lg">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
                
                {names.length === parseInt(totalPersons) && (
                  <button
                    onClick={() => setStep('action')}
                    className="btn-primary w-full"
                  >
                    Continue
                  </button>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
            {result && (
              <div className={`text-center mb-8 animate-bounce-in p-8 rounded-2xl ${mode === 'select' ? 'bg-green-500/20 border-2 border-green-500' : 'bg-red-500/20 border-2 border-red-500'}`}>
                {mode === 'select' ? (
                  <>
                    <UserCheck className="w-20 h-20 mx-auto mb-4 text-green-400" />
                    <p className="text-3xl font-bold text-green-400 mb-2">
                      Congratulations!
                    </p>
                    <p className="text-2xl text-white">
                      <span className="font-bold text-yellow-400">{result}</span> has been Selected
                    </p>
                  </>
                ) : (
                  <>
                    <UserX className="w-20 h-20 mx-auto mb-4 text-red-400" />
                    <p className="text-3xl font-bold text-red-400 mb-2">
                      {result} has been Eliminated
                    </p>
                  </>
                )}
              </div>
            )}

            {processedNames.size >= names.length && (
              <div className="text-center mb-6">
                <p className="text-xl text-white/80">
                  All persons have been {mode === 'select' ? 'selected' : 'eliminated'}!
                </p>
              </div>
            )}

            <button
              onClick={handlePick}
              disabled={processedNames.size >= names.length}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                mode === 'select' 
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' 
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
              } text-white shadow-lg`}
            >
              {mode === 'select' ? 'Select Person' : 'Eliminate Person'}
            </button>

            <p className="text-center text-white/60 mt-4">
              {mode === 'select' ? 'Selected' : 'Eliminated'}: {processedNames.size} / {names.length}
            </p>

            <div className="mt-6 bg-white/5 rounded-xl p-4">
              <p className="text-white/80 font-semibold mb-2">All Names:</p>
              <div className="flex flex-wrap gap-2">
                {names.map((name, i) => (
                  <span 
                    key={i} 
                    className={`px-3 py-1 rounded-lg ${
                      processedNames.has(name)
                        ? mode === 'select' 
                          ? 'bg-green-500/30 text-green-200 line-through'
                          : 'bg-red-500/30 text-red-200 line-through'
                        : 'bg-purple-500/30 text-white'
                    }`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

        )}
      </div>
    </GameLayout>
  );
}
