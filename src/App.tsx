import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, Mail, Linkedin, Sun, Moon, Code, Terminal } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: isDarkMode ? "rgba(96, 165, 250, 0.2)" : "rgba(59, 130, 246, 0.2)"
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: isDarkMode ? "rgba(96, 165, 250, 0.1)" : "rgba(59, 130, 246, 0.1)",
      mixBlendMode: "difference"
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const projects = [
    {
      title: 'component hub',
      description: 'A platform where you can easily copy and paste commonly used UI components like sliders, navbars, buttons, and more for quick integration into your projects.',
      link: 'https://youtu.be/pDpubyhGK8M',
      github: 'https://github.com/lakshaymeghlan/component-hub'
    },
    {
      title: 'Price Scout',
      description: 'This website allows users to effortlessly compare product prices across multiple e-commerce platforms like Amazon, Flipkart, and others. By entering a product name, users can view a comparison table displaying prices, store names, and direct purchase links. The site ensures up-to-date pricing information and offers filters for refining searches based on price range, brand, and customer ratings, making it easier to find the best deals.',
      link: 'https://price-scout-seven.vercel.app/',
      github: 'https://github.com/lakshaymeghlan/price-scout'
    },
    {
      title: 'AI Resume Analyzer',
      description: 'This website allows helps job seekers optimize their resumes. Users can upload their resume and input a job description, and the AI will analyze the match, providing a compatibility score along with suggestions on key improvements to enhance their chances of getting hired.',
      link: 'https://youtu.be/63rTAkU9mdY',
      github: 'https://github.com/lakshaymeghlan/frontend'
    }
  ];

  const experiences = [
    {
      company: 'TechChefz',
      role: 'Backend Developer',
      duration: 'Nov 2022 - Present',
      projects: [
        {
          name: 'Club Mahindra',
          points: [
            'Created and optimized API endpoints using Node.js and Express',
            'Integrated third-party payment gateway',
            'Collaborated with frontend team for seamless integration'
          ]
        },
        {
          name: 'Google DV360',
          points: [
            'Designed and implemented customized dashboard',
            'Implemented Swagger for API documentation',
            'Developed standalone service for task management'
          ]
        },
        {
          name: 'Stride Learning Hub',
          points: [
            'Created APIs for learning pages with review and comment functionality',
            'Integrated Learnosity API',
            'Wrote comprehensive unit test cases'
          ]
        }
      ]
    }
  ];

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-3 rounded-full z-40 ${
          isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-900 shadow-lg'
        }`}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>

      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{
            background: isDarkMode
              ? [
                  "linear-gradient(45deg, #1a1a1a 0%, #2d3748 50%, #1a1a1a 100%)",
                  "linear-gradient(45deg, #2d3748 0%, #1a1a1a 50%, #2d3748 100%)"
                ]
              : [
                  "linear-gradient(45deg, #f7fafc 0%, #edf2f7 50%, #f7fafc 100%)",
                  "linear-gradient(45deg, #edf2f7 0%, #f7fafc 50%, #edf2f7 100%)"
                ]
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
      </div>

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, x: Math.random() * window.innerWidth }}
            animate={{
              y: [Math.random() * window.innerHeight, -100],
              rotate: [0, 360],
              opacity: [0.1, 0, 0.1]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute ${isDarkMode ? 'text-blue-500' : 'text-blue-400'}`}
          >
            {i % 2 === 0 ? <Code size={24} /> : <Terminal size={24} />}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen flex flex-col justify-center items-center relative px-4"
          onMouseEnter={() => setCursorVariant("text")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          <motion.div
            animate={floatingAnimation}
            className="text-center"
          >
            <motion.h1 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-5xl md:text-7xl font-bold mb-4 text-center bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-600'
                  : 'bg-gradient-to-r from-blue-600 to-purple-800'
              }`}
            >
              Full Stack Developer
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-xl md:text-2xl mb-8 text-center max-w-2xl ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Specializing in building exceptional web applications.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-6"
          >
            {[
              { icon: <Github size={28} />, href: "https://github.com/lakshaymeghlan" },
              { icon: <Linkedin size={28} />, href: "https://www.linkedin.com/in/lakshay-meghlan-77512321b/" },
              { icon: <Mail size={28} />, href: "https://mail.google.com/mail/u/0/#inbox" }
            ].map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360,
                  backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.2)'
                }}
                transition={{ duration: 0.3 }}
                href={social.href}
                className={`p-3 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10"
          >
            <ChevronDown size={32} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
          </motion.div>
        </motion.section>

        <section className={`py-20 px-4 relative overflow-hidden ${
          isDarkMode ? '' : 'bg-white'
        }`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <h2 className={`text-3xl font-bold mb-12 text-center bg-clip-text text-transparent ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-400 to-purple-600'
                : 'bg-gradient-to-r from-blue-600 to-purple-800'
            }`}>
              Experience
            </h2>
            {experiences.map((exp, index) => (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                key={index}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold mb-2">{exp.company}</h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{exp.duration}</p>
                {exp.projects.map((project, pIndex) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    key={pIndex}
                    className={`mb-8 p-6 rounded-lg transition-all ${
                      isDarkMode
                        ? 'bg-gray-800 hover:bg-gray-700'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <h4 className={`text-xl font-semibold mb-4 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {project.name}
                    </h4>
                    <ul className={`list-disc list-inside space-y-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {project.points.map((point, pointIndex) => (
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: pointIndex * 0.1 }}
                          viewport={{ once: true }}
                          key={pointIndex}
                        >
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className={`py-20 px-4 relative overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <h2 className={`text-3xl font-bold mb-12 text-center bg-clip-text text-transparent ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-400 to-purple-600'
                : 'bg-gradient-to-r from-blue-600 to-purple-800'
            }`}>
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: isDarkMode 
                      ? "0 10px 30px -15px rgba(0, 0, 0, 0.5)"
                      : "0 10px 30px -15px rgba(0, 0, 0, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  key={index}
                  className={`p-6 rounded-lg border transition-all ${
                    isDarkMode
                      ? 'bg-gray-900 border-gray-700 hover:border-blue-400'
                      : 'bg-white border-gray-200 hover:border-blue-500'
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {project.description}
                  </p>
                  <div className="flex gap-4 mt-4">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                        isDarkMode
                          ? 'bg-gray-800 text-blue-400 hover:text-blue-300'
                          : 'bg-gray-100 text-blue-600 hover:text-blue-500'
                      }`}
                    >
                      <Github size={20} />
                      <span>Code</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.link}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                        isDarkMode
                          ? 'bg-gray-800 text-blue-400 hover:text-blue-300'
                          : 'bg-gray-100 text-blue-600 hover:text-blue-500'
                      }`}
                    >
                      <ExternalLink size={20} />
                      <span>Demo</span>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className={`py-20 px-4 ${isDarkMode ? '' : 'bg-white'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className={`text-3xl font-bold mb-12 text-center bg-clip-text text-transparent ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-400 to-purple-600'
                : 'bg-gradient-to-r from-blue-600 to-purple-800'
            }`}>
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Languages",
                  skills: ['Python', 'JavaScript', 'HTML/CSS']
                },
                {
                  title: "Frameworks",
                  skills: ['React.js', 'Node.js', 'Next.js', 'Bootstrap']
                },
                {
                  title: "Databases",
                  skills: ['MongoDB', 'Firebase', 'SQL']
                }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-lg transition-all ${
                    isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-700'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-4 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {category.title}
                  </h3>
                  <ul className={`space-y-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <span className={`w-2 h-2 rounded-full ${
                          isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                        }`}></span>
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className={`py-20 px-4 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className={`text-3xl font-bold mb-12 text-center bg-clip-text text-transparent ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-400 to-purple-600'
                : 'bg-gradient-to-r from-blue-600 to-purple-800'
            }`}>
              Education
            </h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className={`p-8 rounded-lg border transition-all ${
                isDarkMode
                  ? 'bg-gray-900 border-gray-700 hover:border-blue-400'
                  : 'bg-white border-gray-200 hover:border-blue-500'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">
                Manav Rachna International Institute of Research and Studies
              </h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                B.Tech in Computer Science (Oct 2018 – Jul 2022)
              </p>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                CGPA: 7.0
              </p>
              <h4 className={`text-xl font-semibold my-4 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Key Coursework
              </h4>
              <ul className="grid grid-cols-2 gap-4">
                {[
                  'Data Structures',
                  'Algorithms',
                  'Databases',
                  'Computer Systems',
                  'Machine Learning',
                  'Web Development'
                ].map((course, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                    }`}></span>
                    {course}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </section>

        <footer className={`py-8 text-center ${
          isDarkMode 
            ? 'bg-gray-900 text-gray-400'
            : 'bg-white text-gray-600'
        }`}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            © Lakshay Meghlan
          </motion.p>
        </footer>
      </div>
    </div>
  );
}

export default App;