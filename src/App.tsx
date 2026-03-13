import React, { useState } from 'react';
import { Image as ImageIcon, Send, History, Settings, User, Heart, MessageCircle, Share2, PlusCircle, LayoutDashboard, Zap, Globe, Search, ShieldCheck, MapPin, Phone, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { parsePhoneNumber } from 'libphonenumber-js';

const InstagramAgent = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [agentActive, setAgentActive] = useState(false);
  const [pendingCount] = useState(3); // Mock count
  const [phoneNumber, setPhoneNumber] = useState('');
  const [geoData, setGeoData] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [signalStrength, setSignalStrength] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!image || !caption) return;
    setIsPosting(true);
    setStatus('Initializing AI Agent...');

    // Simulate posting process
    setTimeout(() => setStatus('Authenticating with Instagram...'), 2000);
    setTimeout(() => setStatus('Uploading Media...'), 4000);
    setTimeout(() => {
      setStatus('Post Successful! ✨');
      setIsPosting(false);
      // Reset after success
      setTimeout(() => {
        setStatus(null);
        setImage(null);
        setCaption('');
      }, 3000);
    }, 6000);
  };

  const handleGeoScan = () => {
    if (!phoneNumber) return;
    setIsScanning(true);
    setScanLog([]);
    setGeoData(null);

    const logs = [
      "Initializing HLR Lookup...",
      "Connecting to Global SS7 Network...",
      "Querying Carrier Metadata...",
      "Extracting MCC/MNC Identifiers...",
      "Triangulating Regional Dialing Code...",
      "Scanning Public Regulatory Databases...",
      "Finalizing Localization Data..."
    ];

    logs.forEach((log, i) => {
      setTimeout(() => setScanLog(prev => [...prev, `[geo01] > ${log}`]), i * 800);
    });

    setTimeout(() => {
      try {
        const parsed = parsePhoneNumber(phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`);
        const number = parsed.number.toString();
        let carrier = "Global Network Identified";

        // Morocco Operator Detection (+212)
        if (parsed.country === 'MA') {
          const prefix = number.substring(3, 5);
          if (['61', '64', '65', '66', '67'].includes(prefix)) carrier = "Maroc Telecom (IAM)";
          else if (['62', '63', '69'].includes(prefix)) carrier = "Orange Morocco";
          else if (['60', '68', '70', '77'].includes(prefix)) carrier = "Inwi";
        }

        // Calibrating Signal Pursuit to target precise nodes
        const mockCoords = parsed.country === 'MA'
          ? { lat: 33.7189 + (Math.random() - 0.5) * 0.01, lng: -6.7247 + (Math.random() - 0.5) * 0.01 }
          : { lat: 0, lng: 0 };

        setGeoData({
          country: parsed.country,
          carrier: carrier,
          type: parsed.getType() || 'Mobile',
          valid: parsed.isValid(),
          format: parsed.formatInternational(),
          region: "Signal identified near Cell Node",
          timezone: "UTC+1 (Estimated)",
          lat: mockCoords.lat,
          lng: mockCoords.lng,
          mapUrl: `https://www.google.com/maps?q=${mockCoords.lat},${mockCoords.lng}&z=12&output=embed`
        });
      } catch (e) {
        setGeoData({ error: "Invalid format. Use international style (+...)" });
      }
      setIsScanning(false);
      setIsTracking(true);

      // Start Signal Pursuit Animation
      let strength = 0;
      const interval = setInterval(() => {
        strength = Math.min(100, Math.max(0, strength + (Math.random() * 20 - 8)));
        setSignalStrength(Math.floor(strength));
        if (strength >= 95) {
          setScanLog(prev => [...prev, `[geo01] > SIGNAL LOCKED. COORDINATES VERIFIED.`]);
          clearInterval(interval);
        }
      }, 500);

    }, logs.length * 800 + 400);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#050505] text-white overflow-hidden">
      {/* Sidebar */}
      <nav className="w-20 md:w-64 border-r border-white/5 flex flex-col p-4 md:p-6 gap-8 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl insta-gradient flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <span className="font-bold text-xl hidden md:block">InstaAgent</span>
        </div>

        <div className="flex flex-col gap-2 flex-grow">
          {[
            { id: 'create', icon: PlusCircle, label: 'Create Post' },
            { id: 'test01', icon: Zap, label: 'Agent test01' },
            { id: 'geo01', icon: Globe, label: 'Agent geo01' },
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'history', icon: History, label: 'History' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id
                ? 'bg-white/10 text-white shadow-xl translate-x-1'
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
            >
              <item.icon size={22} className={activeTab === item.id ? 'insta-text-gradient' : ''} />
              <span className="font-medium hidden md:block">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 p-2 rounded-2xl bg-white/5 border border-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <User size={20} className="text-white/50" />
            </div>
          </div>
          <div className="hidden md:block overflow-hidden">
            <p className="text-sm font-bold truncate">Demo User</p>
            <p className="text-xs text-white/40">Personal Account</p>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-4 md:p-12 relative">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'test01' ? (
              <motion.div
                key="test01"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2 h-2 rounded-full ${agentActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${agentActive ? 'text-emerald-500' : 'text-red-500'}`}>
                        {agentActive ? 'Agent test01: Active' : 'Agent test01: Standby'}
                      </span>
                    </div>
                    <h1 className="text-4xl font-black mb-2">Sales Specialist: test01</h1>
                    <p className="text-white/40">Managing @amsabijouriel Reels and Interactions.</p>
                  </div>
                  <button
                    onClick={() => setAgentActive(!agentActive)}
                    className={`px-8 py-3 rounded-xl font-bold transition-all ${agentActive ? 'bg-red-500/10 text-red-500' : 'insta-gradient text-white'}`}
                  >
                    {agentActive ? 'Deactivate Agent' : 'Activate Agent'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card p-6 flex flex-col items-center justify-center text-center gap-4 border-emerald-500/20">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <ImageIcon className="text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-black">{pendingCount}</p>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-tighter">Images in Folder</p>
                    </div>
                  </div>
                  <div className="glass-card p-6 flex flex-col items-center justify-center text-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <MessageCircle className="text-purple-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-black">12</p>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-tighter">Messages Replied</p>
                    </div>
                  </div>
                  <div className="glass-card p-6 flex flex-col items-center justify-center text-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <Heart className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-black">84</p>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-tighter">New Likes Generated</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Settings size={20} className="text-white/40" />
                    Agent Configuration
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-white/60 uppercase tracking-widest">Target Account</p>
                      <input disabled value="https://www.instagram.com/amsabijouriel/reels/" className="w-full text-xs text-emerald-500 font-mono" />

                      <p className="text-sm font-medium text-white/60 uppercase tracking-widest mt-6">Local Media Folder</p>
                      <div className="flex gap-2">
                        <input disabled value="C:\Users\LENOVO\...\uploads" className="w-full text-xs text-white/40 font-mono" />
                        <button className="px-4 py-2 bg-white/5 rounded-lg text-xs hover:bg-white/10 transition-colors">Change</button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-white/60 uppercase tracking-widest">Sales Persona</p>
                      <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-sm text-white/60 leading-relaxed italic">
                        "Greetings! I'm test01. I represent Amsa Bijouriel. My goal is to showcase our fine jewelry and assist customers with their purchases using professional, luxurious tone..."
                      </div>
                      <button className="w-full py-3 bg-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors">Customize Intelligence</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'geo01' ? (
              <motion.div
                key="geo01"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Signal Intelligence</span>
                  </div>
                  <h1 className="text-4xl font-black mb-2">Geo-Locator: geo01</h1>
                  <p className="text-white/40">Analyzing global telecommunication nodes for localization.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-6 space-y-4">
                      <label className="text-xs font-bold text-white/40 uppercase">Enter Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+212 6..."
                          className="w-full pl-12 bg-black/40 border-white/5"
                        />
                      </div>
                      <button
                        onClick={handleGeoScan}
                        disabled={isScanning || !phoneNumber}
                        className="w-full py-4 rounded-xl insta-gradient text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isScanning ? <Cpu className="animate-spin" size={20} /> : <Search size={20} />}
                        {isScanning ? "Processing..." : "Search Location"}
                      </button>
                    </div>

                    <div className="glass-card p-4 bg-black/60 font-mono text-[10px] h-48 overflow-y-auto border-white/5">
                      <div className="text-emerald-500 mb-2">System Terminal Initialized...</div>
                      {scanLog.map((log, i) => (
                        <div key={i} className="text-white/40 mb-1">{log}</div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card relative overflow-hidden min-h-[500px] flex flex-col">
                      <div className="absolute inset-0 z-0 pointer-events-none">
                        {geoData && !geoData.error && (
                          <iframe
                            title="Location Map"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0, opacity: 0.3, filter: 'invert(100%) hue-rotate(180deg) brightness(0.6)' }}
                            src={geoData.mapUrl}
                            allowFullScreen
                          />
                        )}
                      </div>
                      <div className="relative p-8 h-full flex flex-col z-10">
                        {geoData ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                                <MapPin className="text-blue-500" size={32} />
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold">{geoData.error || geoData.country || "Analyzing..."}</h3>
                                <p className="text-white/40 font-mono text-sm">{geoData.format || "Metadata pending"}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <p className="text-[10px] uppercase text-white/20 font-bold mb-1">Carrier / Operator</p>
                                <p className="text-sm font-semibold">{geoData.carrier || "Inquiry Sent"}</p>
                              </div>
                              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <p className="text-[10px] uppercase text-white/20 font-bold mb-1">Signal Mode</p>
                                <p className={`text-sm font-semibold ${isTracking ? 'text-blue-400' : ''}`}>
                                  {isTracking ? 'ACTIVE PURSUIT' : 'STATIONARY'}
                                </p>
                              </div>
                              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <p className="text-[10px] uppercase text-white/20 font-bold mb-1">Timezone</p>
                                <p className="text-sm font-semibold">{geoData.timezone}</p>
                              </div>
                              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                <p className="text-[10px] uppercase text-white/20 font-bold mb-1">Signal Strength</p>
                                <div className="flex items-center gap-2">
                                  <div className="flex-grow h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${signalStrength}%` }}
                                      className="h-full bg-blue-500"
                                    />
                                  </div>
                                  <span className="text-[10px] font-mono">{signalStrength}%</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-4">
                              <button
                                onClick={() => window.open(`https://www.google.com/maps?q=${geoData.lat},${geoData.lng}`, '_blank')}
                                className="flex-grow py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/10 transition-all"
                              >
                                <MapPin size={18} className="text-red-500" />
                                Open in Google Maps
                              </button>
                              <button className="px-6 py-3 bg-blue-500/20 text-blue-500 rounded-xl font-bold text-xs uppercase tracking-widest border border-blue-500/20">
                                Refresh Ping
                              </button>
                            </div>

                            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-3">
                              <ShieldCheck className="text-blue-500" />
                              <p className="text-xs text-blue-200/60 leading-tight">
                                Note: Real-time GPS triangulation is restricted to authorized operators. This data represents the HLR registration point.
                              </p>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="flex-grow flex flex-col items-center justify-center text-center">
                            <Globe size={48} className="text-white/10 mb-4 animate-pulse" />
                            <p className="text-white/20 max-w-xs">Enter a global number to begin geospatial signal triangulation.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'create' ? (
              <motion.div
                key="create"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/80">System Ready</span>
                    </div>
                    <h1 className="text-4xl font-black mb-2">New Creation</h1>
                    <p className="text-white/40">Crafting the perfect post for your audience.</p>
                  </div>

                  <div className="glass-card p-6 space-y-4">
                    <label className="block text-sm font-medium text-white/60 mb-2">Upload Image</label>
                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className={`h-64 border-2 border-dashed border-white/10 rounded-2xl flex flex-row items-center justify-center transition-all ${image ? 'border-none' : 'group-hover:border-white/20'}`}>
                        {image ? (
                          <img src={image} alt="Preview" className="w-full h-full object-cover rounded-2xl shadow-2xl" />
                        ) : (
                          <div className="text-center">
                            <ImageIcon size={48} className="mx-auto mb-4 text-white/20" />
                            <p className="text-white/40">Drop your masterpiece here</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-white/60">Caption</label>
                        <button className="text-[10px] font-bold uppercase border border-white/10 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/60">Generate with AI</button>
                      </div>
                      <textarea
                        rows={4}
                        placeholder="Write something captivating..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full resize-none font-sans"
                      />
                    </div>

                    <button
                      disabled={!image || !caption || isPosting}
                      onClick={handlePost}
                      className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg transition-all ${!image || !caption
                        ? 'bg-white/5 text-white/20 cursor-not-allowed'
                        : 'insta-gradient text-white hover:shadow-purple-500/20'
                        }`}
                    >
                      {isPosting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={20} />
                          Publish Post
                        </>
                      )}
                    </button>
                    {status && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-sm font-medium insta-text-gradient animate-pulse"
                      >
                        {status}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Preview Card */}
                <div className="hidden lg:block">
                  <h3 className="text-white/40 font-medium mb-6 uppercase tracking-widest text-xs">Live Preview</h3>
                  <div className="glass-card overflow-hidden shadow-2xl scale-95 origin-top">
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[1px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                          <User size={14} className="text-white/30" />
                        </div>
                      </div>
                      <span className="text-sm font-bold">your_account</span>
                    </div>
                    <div className="aspect-square bg-white/5 flex items-center justify-center">
                      {image ? (
                        <img src={image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={40} className="text-white/10" />
                      )}
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex gap-4">
                        <Heart size={24} />
                        <MessageCircle size={24} />
                        <Share2 size={24} />
                      </div>
                      <div className="font-bold text-sm">0 likes</div>
                      <div className="text-sm">
                        <span className="font-bold mr-2">your_account</span>
                        <span className="text-white/80">{caption || "Your caption will appear here..."}</span>
                      </div>
                      <div className="text-[10px] text-white/30 uppercase">Just now</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-[60vh] text-center"
              >
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                  <LayoutDashboard className="text-white/20" size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Module Loading...</h2>
                <p className="text-white/40">This section is currently under development.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default InstagramAgent;
