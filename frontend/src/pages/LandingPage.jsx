import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronRight, Moon, Sun, CheckCircle, Users, Zap, Shield, Clock, Star, ArrowRight, Download, BookOpen, HelpCircle, Newspaper, Mail, Building2, Globe, Code, Smartphone } from 'lucide-react';
import { AppContext } from "../context/AppContext";


const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useContext(AppContext);
    const { handleGoogle } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        setIsMenuOpen(false); // Close mobile menu after clicking
    };

    // Navigation items with organized structure
    const navigationItems = [
        { name: "About", id: "about", type: "scroll" },
        { name: "Features", id: "features", type: "scroll" },
        { name: "Solutions", id: "solutions", type: "scroll" },
        { name: "Integrations", id: "integrations", type: "scroll" },
        { name: "Resources", id: "resources", type: "scroll" },
        { name: "Pricing", id: "pricing", type: "scroll" },
        { name: "Blog", id: "blog", type: "scroll" },
        { name: "Contact", id: "contact", type: "scroll" }
    ];

    const handleNavigation = (item) => {
        if (item.type === "scroll") {
            scrollToSection(item.id);
        } else if (item.type === "external") {
            window.open(item.url, '_blank');
        }
    };

    return (
        <div className="bg-gradient-to-br min-h-screen from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300">
            <nav className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <a className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                TaskMaster
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-6">
                                {navigationItems.slice(0, 6).map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavigation(item)}
                                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium"
                                    >
                                        {item.name}
                                    </button>
                                ))}

                                {/* More dropdown for additional items */}
                                <div className="relative group">
                                    <button className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium flex items-center">
                                        More
                                        <ChevronRight className="ml-1 w-4 h-4 transform group-hover:rotate-90 transition-transform duration-200" />
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        {navigationItems.slice(6).map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => handleNavigation(item)}
                                                className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={async () => {
                                        try {
                                            setLoading(true)
                                            const user = await handleGoogle();
                                            if (user) {
                                                setIsModalOpen(true);
                                            }
                                        } catch (error) {
                                            console.error(error);
                                        } finally {
                                            setLoading(false)
                                            setIsMenuOpen(false);
                                        }
                                    }}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
                                >
                                    {loading ? (<div className="flex items-center gap-1"><span className="loading loading-spinner loading-sm"></span> Getting Started...</div>) : "Get Started"}
                                </button>
                                <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300">
                                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 max-h-96 overflow-y-auto">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigation(item)}
                                    className="block w-full text-left px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium"
                                >
                                    {item.name}
                                </button>
                            ))}
                            <button
                                onClick={async () => {
                                    try {
                                        setLoading(true)
                                        const user = await handleGoogle();
                                        if (user) {
                                            setIsModalOpen(true);
                                        }
                                    } catch (error) {
                                        console.error(error);
                                    } finally {
                                        setIsMenuOpen(false);
                                        setLoading(false)
                                    }
                                }}
                                className="block w-full text-left px-3 py-2 text-indigo-600 dark:text-indigo-400 font-medium"
                            >
                                {loading ? (<div className="flex items-center gap-1"><span className="loading loading-spinner loading-xs"></span> Getting Started...</div>) : "Get Started"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </nav>

            <motion.div
                initial="initial"
                animate="animate"
                variants={stagger}
                className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32 overflow-hidden"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                        <motion.div
                            variants={fadeInUp}
                            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
                        >
                            <h1>
                                <span className="block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                                    <span className="block text-gray-900 dark:text-white">Revolutionize Your</span>
                                    <span className="block text-indigo-600 dark:text-indigo-400 mt-1">Task Management</span>
                                </span>
                            </h1>
                            <motion.p
                                variants={fadeInUp}
                                className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                            >
                                Seamlessly organize your life and boost productivity with TaskMaster. Experience the power of
                                intelligent task management, team collaboration, and AI-driven insights.
                            </motion.p>
                            <motion.div variants={fadeInUp} className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
                                >
                                    Start Your Journey <ChevronRight className="ml-2" size={20} />
                                </button>
                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                    Join over 1 million users transforming their productivity
                                </p>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
                        >
                            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                                <div className="relative block w-full bg-white dark:bg-gray-800 overflow-hidden rounded-lg transform transition-all hover:scale-105 duration-300">
                                    <img src="https://ouch-cdn2.icons8.com/hCslXW3zoGo4eh0xl_HlSU6m6RTERHgkRGF4O8-vsUQ/rs:fit:622:456/extend:false/wm:1:re:0:0:0.8/wmid:ouch2/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMjg3/LzA4OTMwMGE2LTY0/NTktNDhmZS1hZjRl/LWNkNjFiMzhmOWJh/MS5zdmc.png" alt="TaskMaster app interface" className="w-full" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 mix-blend-multiply opacity-20"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* About Section */}
            <section id="about" className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                                About TaskMaster
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                TaskMaster was born from the need to simplify complex project management while maintaining powerful functionality. Our mission is to help individuals and teams achieve more by providing intuitive tools that adapt to any workflow.
                            </p>
                            <div className="mt-8 space-y-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full">
                                            <Users className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">1M+ Users</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Trusted by professionals worldwide</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full">
                                            <Globe className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">50+ Countries</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Global reach and accessibility</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full">
                                            <Star className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">4.9/5 Rating</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Highly rated by our community</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mt-12 lg:mt-0"
                        >
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Team collaboration"
                                    className="rounded-lg shadow-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 mix-blend-multiply opacity-20 rounded-lg"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Powerful Features
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                            Everything you need to manage tasks efficiently
                        </p>
                    </motion.div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: CheckCircle,
                                title: "Task Management",
                                description: "Create, organize, and track tasks with intuitive drag-and-drop functionality."
                            },
                            {
                                icon: Users,
                                title: "Team Collaboration",
                                description: "Work together seamlessly with real-time updates and shared workspaces."
                            },
                            {
                                icon: Zap,
                                title: "Real-time Sync",
                                description: "Stay updated instantly with live synchronization across all devices."
                            },
                            {
                                icon: Shield,
                                title: "Secure & Private",
                                description: "Your data is protected with enterprise-grade security and privacy."
                            },
                            {
                                icon: Clock,
                                title: "Time Tracking",
                                description: "Monitor time spent on tasks and improve productivity insights."
                            },
                            {
                                icon: Star,
                                title: "Smart Insights",
                                description: "Get AI-powered recommendations to optimize your workflow."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-lg mb-4">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solutions Section */}
            <section id="solutions" className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Solutions for Every Team
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                            Tailored approaches for different use cases
                        </p>
                    </motion.div>

                    <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {[
                            {
                                title: "For Individuals",
                                description: "Perfect for personal productivity and goal tracking",
                                features: ["Personal task management", "Goal setting & tracking", "Time management", "Progress analytics"],
                                color: "bg-blue-600"
                            },
                            {
                                title: "For Teams",
                                description: "Collaborate effectively with your team members",
                                features: ["Team workspaces", "Real-time collaboration", "Task assignment", "Team analytics"],
                                color: "bg-purple-600"
                            },
                            {
                                title: "For Businesses",
                                description: "Scale your operations with enterprise features",
                                features: ["Advanced reporting", "Custom workflows", "Integration support", "Priority support"],
                                color: "bg-green-600"
                            },
                            {
                                title: "For Agencies",
                                description: "Manage multiple clients and projects efficiently",
                                features: ["Client management", "Project templates", "Time billing", "Client portals"],
                                color: "bg-orange-600"
                            }
                        ].map((solution, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 ${solution.color} rounded-lg mb-4`}>
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {solution.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {solution.description}
                                </p>
                                <ul className="space-y-2">
                                    {solution.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
            <section id="integrations" className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Powerful Integrations
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                            Connect TaskMaster with your favorite tools and services
                        </p>
                    </motion.div>

                    <div className="mt-16">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
                            {[
                                { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" },
                                { name: "Google Drive", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
                                { name: "Trello", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg" },
                                { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
                                { name: "Zoom", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center" },
                                { name: "Dropbox", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dropbox/dropbox-original.svg" },
                                { name: "Microsoft", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
                                { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
                                { name: "Notion", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center" },
                                { name: "Jira", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
                                { name: "Discord", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center" },
                                { name: "Zapier", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center" }
                            ].map((integration, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="w-12 h-12 mb-3 flex items-center justify-center bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <img
                                            src={integration.logo}
                                            alt={integration.name}
                                            className="w-8 h-8 object-contain"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/32x32/6366f1/ffffff?text=" + integration.name.charAt(0);
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                                        {integration.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="mt-12 text-center"
                        >
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Can't find your tool? We support 500+ integrations through our API.
                            </p>
                            <button className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-colors duration-200">
                                <Code className="w-5 h-5 mr-2" />
                                View API Documentation
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section id="resources" className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Resources & Support
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                            Everything you need to get started and succeed
                        </p>
                    </motion.div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: BookOpen,
                                title: "Documentation",
                                description: "Comprehensive guides and tutorials to help you master TaskMaster.",
                                link: "#",
                                linkText: "Read Docs"
                            },
                            {
                                icon: Download,
                                title: "Templates",
                                description: "Pre-built project templates to jumpstart your productivity.",
                                link: "#",
                                linkText: "Download"
                            },
                            {
                                icon: HelpCircle,
                                title: "Support Center",
                                description: "Get help from our support team and community forums.",
                                link: "#",
                                linkText: "Get Help"
                            },
                            {
                                icon: Users,
                                title: "Community",
                                description: "Join thousands of users sharing tips and best practices.",
                                link: "#",
                                linkText: "Join Community"
                            },
                            {
                                icon: Star,
                                title: "Best Practices",
                                description: "Learn proven strategies for effective task management.",
                                link: "#",
                                linkText: "Learn More"
                            },
                            {
                                icon: Zap,
                                title: "API Reference",
                                description: "Integrate TaskMaster with your existing tools and workflows.",
                                link: "#",
                                linkText: "View API"
                            }
                        ].map((resource, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-lg mb-4 group-hover:bg-indigo-700 transition-colors">
                                    <resource.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    {resource.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {resource.description}
                                </p>
                                <a
                                    href={resource.link}
                                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                                >
                                    {resource.linkText}
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                            Choose the plan that fits your needs
                        </p>
                    </motion.div>

                    <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {[
                            {
                                name: "Free",
                                price: "$0",
                                period: "forever",
                                description: "Perfect for individuals getting started",
                                features: [
                                    "Up to 10 tasks",
                                    "Basic task management",
                                    "Mobile app access",
                                    "Email support"
                                ],
                                popular: false,
                                buttonText: "Get Started Free"
                            },
                            {
                                name: "Pro",
                                price: "$9",
                                period: "per month",
                                description: "Best for professionals and small teams",
                                features: [
                                    "Unlimited tasks",
                                    "Team collaboration",
                                    "Advanced analytics",
                                    "Priority support",
                                    "Custom workflows",
                                    "Time tracking"
                                ],
                                popular: true,
                                buttonText: "Start Pro Trial"
                            },
                            {
                                name: "Enterprise",
                                price: "$29",
                                period: "per month",
                                description: "For large teams and organizations",
                                features: [
                                    "Everything in Pro",
                                    "Advanced security",
                                    "Custom integrations",
                                    "Dedicated support",
                                    "SLA guarantee",
                                    "Custom training"
                                ],
                                popular: false,
                                buttonText: "Contact Sales"
                            }
                        ].map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                                    plan.popular ? 'ring-2 ring-indigo-600 scale-105' : ''
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {plan.name}
                                    </h3>
                                    <div className="mt-4">
                                        <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                                            {plan.price}
                                        </span>
                                        <span className="text-gray-600 dark:text-gray-300">
                                            /{plan.period}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                                        {plan.description}
                                    </p>
                                </div>
                                <ul className="mt-8 space-y-4">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                                            plan.popular
                                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {plan.buttonText}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Latest from Our Blog
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                            Stay updated with productivity tips, feature updates, and industry insights
                        </p>
                    </motion.div>

                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "10 Productivity Hacks for Remote Teams",
                                excerpt: "Discover proven strategies to boost your team's productivity while working remotely.",
                                date: "Dec 15, 2024",
                                readTime: "5 min read",
                                category: "Productivity",
                                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            },
                            {
                                title: "New Feature: Advanced Task Dependencies",
                                excerpt: "Learn how to use our new task dependency feature to create more efficient workflows.",
                                date: "Dec 12, 2024",
                                readTime: "3 min read",
                                category: "Features",
                                image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            },
                            {
                                title: "The Future of Task Management",
                                excerpt: "Exploring how AI and automation are reshaping the way we manage projects and tasks.",
                                date: "Dec 10, 2024",
                                readTime: "7 min read",
                                category: "Industry",
                                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                            }
                        ].map((post, index) => (
                            <motion.article
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        <span>{post.date}</span>
                                        <span className="mx-2">•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                                        Read more
                                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <button className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-colors duration-200">
                            <Newspaper className="w-5 h-5 mr-2" />
                            View All Posts
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Get in Touch
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                            Have questions? We would love to hear from you.
                        </p>
                    </motion.div>

                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email Us</h3>
                                        <p className="text-gray-600 dark:text-gray-300">support@taskmaster.com</p>
                                        <p className="text-gray-600 dark:text-gray-300">sales@taskmaster.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
                                            <Building2 className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Office</h3>
                                        <p className="text-gray-600 dark:text-gray-300">123 Innovation Drive</p>
                                        <p className="text-gray-600 dark:text-gray-300">San Francisco, CA 94107</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
                                            <Smartphone className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h3>
                                        <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                                        <p className="text-gray-600 dark:text-gray-300">Mon-Fri 9am-6pm PST</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
                        >
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                >
                                    Send Message
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-2xl font-bold text-white mb-4">TaskMaster</h3>
                            <p className="text-gray-400 mb-4">
                                Revolutionize your task management with intelligent features,
                                real-time collaboration, and AI-driven insights.
                            </p>
                            <div className="flex space-x-4">
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </button>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <span className="sr-only">GitHub</span>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-white transition-colors">Features</button></li>
                                <li><button onClick={() => scrollToSection('solutions')} className="text-gray-400 hover:text-white transition-colors">Solutions</button></li>
                                <li><button onClick={() => scrollToSection('pricing')} className="text-gray-400 hover:text-white transition-colors">Pricing</button></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Updates</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Support</h4>
                            <ul className="space-y-2">
                                <li><button onClick={() => scrollToSection('resources')} className="text-gray-400 hover:text-white transition-colors">Resources</button></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800">
                        <p className="text-gray-400 text-center">
                            © 2024 TaskMaster. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {isModalOpen && (
                <div className="fixed z-50 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <div className="relative inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <button
                                className="absolute cursor-pointer top-2 right-4 text-red-700 hover:text-red-600 dark:text-red-300 dark:hover:text-red-500"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ✕
                            </button>

                            <div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                        Get Started with TaskMaster
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Sign in with Google to access your account or create a new one.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                    onClick={async () => {
                                        try {
                                            setLoading(true)
                                            const user = await handleGoogle();
                                            if (user) {
                                                setIsModalOpen(true);
                                            }
                                        } catch (error) {
                                            console.error(error);
                                        } finally {
                                            setIsMenuOpen(false);
                                            setLoading(false)
                                        }
                                    }}
                                >
                                    {loading ? (<div className="flex items-center gap-1"><span className="loading loading-spinner loading-sm"></span> Signing In......</div>) : "Sign In with Google"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default LandingPage;