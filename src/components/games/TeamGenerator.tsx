import { useState } from 'react';
import GameLayout from '@/components/layout/GameLayout';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface TeamGeneratorProps {
  onBack: () => void;
}

export default function TeamGenerator({ onBack }: TeamGeneratorProps) {
  const [step, setStep] = useState<'count' | 'names' | 'config' | 'result'>('count');
  const [totalPersons, setTotalPersons] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const [currentNameInput, setCurrentNameInput] = useState('');
  const [personsPerTeam, setPersonsPerTeam] = useState('');
  const [totalTeams, setTotalTeams] = useState('');
  const [teams, setTeams] = useState<string[][]>([]);
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
      
      if (names.length + 1 === parseInt(totalPersons)) {
        setStep('config');
      }
    }
  };

  const generateTeams = () => {
    const ppt = parseInt(personsPerTeam);
    const tt = parseInt(totalTeams);

    if (ppt && ppt * tt !== names.length) {
      toast({
        title: 'Invalid Configuration',
        description: 'Team formation is impossible with these numbers',
        variant: 'destructive',
      });
      return;
    }

    if (tt && names.length % tt !== 0) {
      toast({
        title: 'Invalid Configuration',
        description: 'Cannot divide evenly into teams',
        variant: 'destructive',
      });
      return;
    }

    const shuffled = [...names].sort(() => Math.random() - 0.5);
    const generatedTeams: string[][] = [];
    const teamSize = ppt || Math.floor(names.length / tt);
    
    for (let i = 0; i < shuffled.length; i += teamSize) {
      generatedTeams.push(shuffled.slice(i, i + teamSize));
    }

    setTeams(generatedTeams);
    setStep('result');
  };

  const handleRetry = () => {
    setStep('count');
    setTotalPersons('');
    setNames([]);
    setCurrentNameInput('');
    setPersonsPerTeam('');
    setTotalTeams('');
    setTeams([]);
  };

  return (
    <GameLayout 
      gameName="Random Team Generator" 
      onBack={onBack}
      onRetry={handleRetry}
      showRetry={step === 'result'}
    >
      <div className="max-w-2xl mx-auto">
        {step === 'count' && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Enter Total Number of Persons
            </h2>
            <Input
              type="number"
              min="2"
              value={totalPersons}
              onChange={(e) => setTotalPersons(e.target.value)}
              className="mb-6 text-lg"
              placeholder="Enter number..."
            />
            <button
              onClick={() => {
                if (parseInt(totalPersons) >= 2) {
                  setStep('names');
                } else {
                  toast({
                    title: 'Invalid Number',
                    description: 'Please enter at least 2 persons',
                    variant: 'destructive',
                  });
                }
              }}
              disabled={!totalPersons || parseInt(totalPersons) < 2}
              className="btn-primary w-full disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'names' && (
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
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white font-semibold mb-2">Added Names:</p>
                <div className="flex flex-wrap gap-2">
                  {names.map((name, i) => (
                    <span key={i} className="bg-purple-500/30 text-white px-3 py-1 rounded-lg">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'config' && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Configure Teams
            </h2>
            
            <div className="space-y-6 mb-6">
              <div>
                <label className="block text-white mb-2">Persons per Team</label>
                <Input
                  type="number"
                  min="1"
                  value={personsPerTeam}
                  onChange={(e) => {
                    setPersonsPerTeam(e.target.value);
                    setTotalTeams('');
                  }}
                  className="text-lg"
                  placeholder="Enter number..."
                />
              </div>

              <div className="text-center text-white/60">OR</div>

              <div>
                <label className="block text-white mb-2">Total Number of Teams</label>
                <Input
                  type="number"
                  min="2"
                  value={totalTeams}
                  onChange={(e) => {
                    setTotalTeams(e.target.value);
                    setPersonsPerTeam('');
                  }}
                  className="text-lg"
                  placeholder="Enter number..."
                />
              </div>
            </div>

            <button
              onClick={generateTeams}
              disabled={!personsPerTeam && !totalTeams}
              className="btn-primary w-full disabled:opacity-50"
            >
              Generate Teams
            </button>
          </div>
        )}

        {step === 'result' && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
            <h2 className="text-3xl font-bold text-green-400 text-center mb-8">
              The teams are:
            </h2>
            
            <div className="space-y-6">
              {teams.map((team, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-6 border border-purple-500/30 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <h3 className="text-2xl font-bold text-purple-400 mb-4">
                    Team {i + 1}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {team.map((name, j) => (
                      <span key={j} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
    }
