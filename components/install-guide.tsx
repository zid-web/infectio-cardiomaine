'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone, Chrome, Apple, CheckCircle2 } from 'lucide-react';

export function InstallGuide() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');

  useEffect(() => {
    // Détecter la plateforme
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/.test(userAgent)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    // Vérifier si déjà installé
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Capturer l'événement d'installation
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    
    // Vérifier si l'app a été installée
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setShowGuide(true);
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  if (isInstalled) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-scale-in">
        <div className="px-6 py-3 rounded-2xl bg-green-600 text-white shadow-lg flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold">Application installée</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Bouton flottant */}
      {!showGuide && deferredPrompt && (
        <button
          onClick={handleInstallClick}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 animate-pulse"
        >
          <Download className="w-5 h-5" />
          <div className="text-left">
            <div className="text-sm font-bold">Installer l'application</div>
            <div className="text-xs opacity-90">Accès rapide hors ligne</div>
          </div>
        </button>
      )}

      {/* Guide d'installation modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Installer l'application</h3>
              <button
                onClick={() => setShowGuide(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {platform === 'ios' && (
                <>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200">
                    <Apple className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-semibold text-blue-900">iOS / Safari</div>
                      <div className="text-sm text-blue-700">Installation sur iPhone ou iPad</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Ouvrir le menu de partage</div>
                        <div className="text-sm text-muted-foreground">
                          Appuyez sur l'icône de partage (carré avec flèche vers le haut) en bas de Safari
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Ajouter à l'écran d'accueil</div>
                        <div className="text-sm text-muted-foreground">
                          Faites défiler et sélectionnez "Sur l'écran d'accueil"
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Confirmer</div>
                        <div className="text-sm text-muted-foreground">
                          Appuyez sur "Ajouter" pour installer l'application
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {platform === 'android' && (
                <>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 border border-green-200">
                    <Smartphone className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="font-semibold text-green-900">Android / Chrome</div>
                      <div className="text-sm text-green-700">Installation sur Android</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Ouvrir le menu</div>
                        <div className="text-sm text-muted-foreground">
                          Appuyez sur les trois points verticaux en haut à droite de Chrome
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Installer l'application</div>
                        <div className="text-sm text-muted-foreground">
                          Sélectionnez "Installer l'application" ou "Ajouter à l'écran d'accueil"
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Confirmer</div>
                        <div className="text-sm text-muted-foreground">
                          Appuyez sur "Installer" pour finaliser
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {platform === 'desktop' && (
                <>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-purple-50 border border-purple-200">
                    <Chrome className="w-8 h-8 text-purple-600" />
                    <div>
                      <div className="font-semibold text-purple-900">Desktop / Chrome</div>
                      <div className="text-sm text-purple-700">Installation sur ordinateur</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Icône d'installation</div>
                        <div className="text-sm text-muted-foreground">
                          Cliquez sur l'icône d'installation dans la barre d'adresse (à droite)
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Confirmer l'installation</div>
                        <div className="text-sm text-muted-foreground">
                          Cliquez sur "Installer" dans la fenêtre contextuelle
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Lancer l'application</div>
                        <div className="text-sm text-muted-foreground">
                          L'application s'ouvrira dans une fenêtre dédiée
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-sm text-blue-900">
                    <div className="font-semibold mb-1">Avantages de l'installation</div>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Accès rapide depuis l'écran d'accueil</li>
                      <li>• Consultation hors ligne des données</li>
                      <li>• Interface optimisée en plein écran</li>
                      <li>• Notifications push (à venir)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}
