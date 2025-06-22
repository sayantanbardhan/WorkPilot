import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Users,
  MessageSquare,
  FileText,
  Settings,
  Menu,
  X,
  ChevronRight,
  Play,
  CheckCircle,
  Clock,
  Star,
  Upload,
  Mic,
  Bot,
  Zap,
  Target,
  BookOpen,
  Slack,
  Home
} from 'lucide-react';

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Automation', path: '/automation', icon: Bot },
    { name: 'Features', path: '/features', icon: Zap },
    { name: 'About', path: '/about', icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-neutral-200">
      <div className="container-custom px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <Link to="/" className="text-xl font-serif font-semibold text-primary-600">WorkPilot</Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${isActive
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-neutral-600 hover:text-primary-500 hover:bg-primary-50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
            <Link
              to="/automation"
              className="btn-primary"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-neutral-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${isActive
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-neutral-600 hover:text-primary-500'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              <Link
                to="/automation"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary w-full"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Home Page Component
const HomePage = () => {
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Meeting Scheduling",
      description: "AI-powered scheduling that adapts to your team's availability and preferences."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Real-time Collaboration",
      description: "Seamless integration with Slack, Teams, and other communication platforms."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Automated Documentation",
      description: "Generate meeting summaries, action items, and follow-ups automatically."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Insights",
      description: "Track meeting effectiveness and team productivity with detailed analytics."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechFlow",
      content: "WorkPilot transformed how we handle meetings. The automated follow-ups save us hours every week.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Engineering Lead",
      company: "InnovateCorp",
      content: "The integration with our existing tools is seamless. It feels like it was built specifically for our workflow.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Operations Director",
      company: "GrowthStart",
      content: "Finally, a meeting tool that actually makes meetings better instead of just scheduling them.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif font-bold text-neutral-900 mb-6"
            >
              Meetings that
              <span className="text-gradient block">bloom into</span>
              productivity
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              We create intelligent meeting experiences that transform space into productivity —
              felt deeply, remembered clearly, and never quite forgotten.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/automation" className="btn-primary flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Start Your Journey</span>
              </Link>
              <Link to="/features" className="btn-secondary flex items-center space-x-2">
                <span>Learn More</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
              Let's make the moment
              <span className="text-gradient block">blossom</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              What fades in form can still remain in feeling. Our features reflect your workflow —
              its rhythm, its purpose, its soul — and let it echo gently, even after the meeting ends.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg card-hover border border-neutral-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
              Teams say about
              <span className="text-gradient block">WorkPilot</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg card-hover"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-500">{testimonial.role}, {testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-500 to-accent-500">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Let's Create Something
              <span className="block">Unforgettable</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Planning a meeting, workshop, or team event? Have a vision, a feeling,
              a moment you want to mark? You imagine it. We bring it into bloom.
            </p>
            <Link to="/automation" className="bg-white text-primary-500 hover:bg-neutral-100 font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block">
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Automation Page Component
const AutomationPage = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    meetingTitle: '',
    projectKey: '',
    notionPageId: '',
    transcript: ''
  });
  const [audioFile, setAudioFile] = useState(null);
  const [autonomousMode, setAutonomousMode] = useState(true);

  // Use relative path for Docker deployment
  const API_BASE = '/api';

  const handleMeetingProcess = async (formData, endpoint = 'meetings/process') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || 'Failed to process meeting');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });

    if (audioFile) {
      data.append('audio', audioFile);
    }

    const endpoint = autonomousMode ? 'meetings/process-autonomous' : 'meetings/process';
    handleMeetingProcess(data, endpoint);
  };

  const testIntegrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/integrations/test`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Network error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-24">
      <div className="container-custom px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 mb-6">
            AI Meeting
            <span className="text-gradient block">Automation</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Transform your meetings into actionable tasks automatically. Upload audio, paste transcripts,
            and watch as AI creates Jira tickets, Notion pages, and Slack notifications.
          </p>
        </motion.div>

        {/* Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <X className="w-5 h-5 text-red-500" />
              <span className="text-red-700">{error}</span>
            </div>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              {/* Autonomous Mode Toggle */}
              <div className="mb-8 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Autonomous Mode</h3>
                    <p className="text-neutral-600">AI determines optimal task destinations automatically</p>
                  </div>
                  <button
                    onClick={() => setAutonomousMode(!autonomousMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autonomousMode ? 'bg-primary-500' : 'bg-neutral-300'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autonomousMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Meeting Title */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Meeting Title
                  </label>
                  <input
                    type="text"
                    value={formData.meetingTitle}
                    onChange={(e) => setFormData({ ...formData, meetingTitle: e.target.value })}
                    placeholder="Enter your meeting title..."
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Audio Upload */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Audio File
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setAudioFile(e.target.files[0])}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label
                    htmlFor="audio-upload"
                    className="block border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add('border-primary-500', 'bg-primary-50');
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-primary-500', 'bg-primary-50');
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-primary-500', 'bg-primary-50');
                      const files = e.dataTransfer.files;
                      if (files.length > 0 && files[0].type.startsWith('audio/')) {
                        setAudioFile(files[0]);
                      }
                    }}
                  >
                    <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    {audioFile ? (
                      <div>
                        <p className="text-primary-600 font-medium mb-2">{audioFile.name}</p>
                        <p className="text-sm text-neutral-500">Click to change file</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-neutral-600 mb-2 font-medium">Drop your audio file here or click to browse</p>
                        <p className="text-sm text-neutral-500">Supports MP3, WAV, M4A, and other audio formats</p>
                      </div>
                    )}
                  </label>
                </div>

                {/* Transcript */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Or Paste Transcript
                  </label>
                  <textarea
                    value={formData.transcript}
                    onChange={(e) => setFormData({ ...formData, transcript: e.target.value })}
                    placeholder="Paste your meeting transcript here..."
                    rows="6"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Manual Configuration (when autonomous mode is off) */}
                {!autonomousMode && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Jira Project Key
                      </label>
                      <input
                        type="text"
                        value={formData.projectKey}
                        onChange={(e) => setFormData({ ...formData, projectKey: e.target.value })}
                        placeholder="e.g., WORK"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Notion Page ID
                      </label>
                      <input
                        type="text"
                        value={formData.notionPageId}
                        onChange={(e) => setFormData({ ...formData, notionPageId: e.target.value })}
                        placeholder="Notion page ID"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || (!audioFile && !formData.transcript)}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-5 h-5" />
                      <span>{autonomousMode ? 'Process Autonomously' : 'Process Meeting'}</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={testIntegrations}
                  disabled={loading}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-50"
                >
                  <Settings className="w-5 h-5 text-neutral-600" />
                  <span>Test Integrations</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <Target className="w-5 h-5 text-neutral-600" />
                  <span>Open Jira</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <BookOpen className="w-5 h-5 text-neutral-600" />
                  <span>Open Notion</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <Slack className="w-5 h-5 text-neutral-600" />
                  <span>Open Slack</span>
                </button>
              </div>
            </motion.div>

            {/* AI Features */}
            {autonomousMode && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl shadow-xl p-6 text-white"
              >
                <h3 className="text-lg font-semibold mb-4">🤖 AI-Powered Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5" />
                    <span>Smart Jira project selection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5" />
                    <span>Automatic Notion organization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Slack className="w-5 h-5" />
                    <span>Instant Slack notifications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5" />
                    <span>Zero manual configuration</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Results Display */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8 bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span>Processing Results</span>
              </h3>
              <button
                onClick={() => setResults(null)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {results.summary && (
                <div className="p-6 bg-neutral-50 rounded-xl">
                  <h4 className="font-semibold text-neutral-900 mb-3">📝 Meeting Summary</h4>
                  <p className="text-neutral-700 leading-relaxed">{results.summary}</p>
                </div>
              )}

              {results.actionItems && results.actionItems.length > 0 && (
                <div className="p-6 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-neutral-900 mb-4">✅ Action Items ({results.actionItems.length})</h4>
                  <div className="space-y-3">
                    {results.actionItems.map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium text-neutral-900">{item.task}</p>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${item.priority === 'High' ? 'bg-red-100 text-red-700' :
                            item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                            {item.priority}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-neutral-600">
                          <span>👤 {item.assignee || 'Unassigned'}</span>
                          <span>📅 {item.dueDate || 'No due date'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.jiraTasks && results.jiraTasks.length > 0 && (
                <div className="p-6 bg-green-50 rounded-xl">
                  <h4 className="font-semibold text-neutral-900 mb-4">🎯 Jira Tasks Created ({results.jiraTasks.length})</h4>
                  <div className="space-y-2">
                    {results.jiraTasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                        <span className="font-medium text-green-700">{task.key}</span>
                        <a
                          href={task.self}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800 flex items-center space-x-1"
                        >
                          <span>View in Jira</span>
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.notionPage && (
                <div className="p-6 bg-purple-50 rounded-xl">
                  <h4 className="font-semibold text-neutral-900 mb-3">📋 Notion Page Created</h4>
                  <a
                    href={results.notionPage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800"
                  >
                    <span>Open in Notion</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Features Page
const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container-custom px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 mb-6">
            Powerful
            <span className="text-gradient block">Features</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover all the ways WorkPilot can transform your meeting workflow.
          </p>
        </motion.div>
        {/* Add more features content here */}
      </div>
    </div>
  );
};

// About Page
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container-custom px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 mb-6">
            About
            <span className="text-gradient block">WorkPilot</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Learn more about our mission to transform meetings into productive experiences.
          </p>
        </motion.div>
        {/* Add more about content here */}
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container-custom px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-serif font-semibold">WorkPilot</span>
            </div>
            <p className="text-neutral-400">
              Creating moments of productivity that change everything.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/automation" className="hover:text-white transition-colors">Automation</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
          <p>&copy; 2024 WorkPilot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Loading Component
const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-serif text-primary-600">WorkPilot</h2>
        <p className="text-neutral-600 mt-2">Creating moments of productivity</p>
      </motion.div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/automation" element={<AutomationPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
