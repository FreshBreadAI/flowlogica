"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue, useAnimation } from "framer-motion";
import { Star, Award, TrendingUp, Target, Mail, Bot, Calendar, ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility for tailwind-merge

const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <CardComponent rotate={rotate} translate={translate} scale={scale}>
          {children}
        </CardComponent>
      </div>
    </div>
  );
};

const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: string | React.ReactNode }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

const CardComponent = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-border p-2 md:p-6 bg-background rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-muted md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};

const TextShimmer = ({
  children,
  className = "",
  duration = 2,
}: {
  children: string;
  className?: string;
  duration?: number;
}) => {
  return (
    <motion.span
      className={`relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000] [--bg:linear-gradient(90deg,#0000_calc(50%-20px),var(--base-gradient-color),#0000_calc(50%+20px))] [background-repeat:no-repeat,padding-box] dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff] ${className}`}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear",
      }}
      style={{
        backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
      }}
    >
      {children}
    </motion.span>
  );
};

const Particles = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
};

// Custom component for Background Paths
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
          380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
          152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
          684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      color: `rgba(15,23,42,${0.1 + i * 0.03})`,
      width: (0.5 + i * 0.03) * 0.5, // 50% thinner
  }));

  return (
      <div className="absolute inset-0 pointer-events-none">
          <svg
              className="w-full h-full text-slate-950 dark:text-white"
              viewBox="0 0 696 316"
              fill="none"
          >
              <title>Background Paths</title>
              {paths.map((path) => (
                  <motion.path
                      key={path.id}
                      d={path.d}
                      stroke="currentColor"
                      strokeWidth={path.width}
                      strokeOpacity={(0.1 + path.id * 0.03) * 0.75} // 25% less opacity
                      initial={{ pathLength: 0.3, opacity: 0.6 }}
                      animate={{
                          pathLength: 1,
                          opacity: [0.3, 0.6, 0.3],
                          pathOffset: [0, 1, 0],
                      }}
                      transition={{
                          duration: 20 + Math.random() * 10,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                      }}
                  />
              ))}
          </svg>
      </div>
  );
}

// Custom component for Lamp effect (removed as per request)
// export const LampContainer = ... (removed)


// Contact Form Modal Component
interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: string;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
}

const ContactFormModal = ({ isOpen, onClose, formType }: ContactFormModalProps) => {
  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://hook.eu2.make.com/q8a1b43dlyx66fo5rqgvvxcchxy31x7m', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          URL: 'https://www.flowlogica.com',
          form: formType
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          setFormState({
            firstName: '',
            lastName: '',
            email: ''
          });
        }, 3000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-background rounded-xl shadow-xl w-full max-w-md relative overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{formType}</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thank you!</h3>
              <p className="text-muted-foreground">Our team will be in touch with you shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formState.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formState.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                    {error}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const AISDRLandingPage = () => {
  const [meetings, setMeetings] = useState([5]);
  const [dealSize, setDealSize] = useState([25000]);
  const [closeRate, setCloseRate] = useState([20]);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [formType, setFormType] = useState('Get Started');

  const calculateROI = () => {
    const currentMeetings = meetings[0];
    const newMeetings = currentMeetings * 3;
    const additionalMeetings = newMeetings - currentMeetings;
    const additionalRevenue = additionalMeetings * dealSize[0] * (closeRate[0] / 100) * 12;
    return Math.round(additionalRevenue);
  };

  const features = [
    {
      icon: Target,
      title: "AI-Powered Prospect Research",
      description: "We identify your ideal customers using 47+ data points and behavioral triggers"
    },
    {
      icon: Mail,
      title: "Hyper-Personalized Outreach",
      description: "Custom messaging that speaks directly to each prospect's pain points and goals"
    },
    {
      icon: Bot,
      title: "Automated Follow-Up Sequences",
      description: "Multi-channel campaigns that nurture prospects until they're ready to buy"
    },
    {
      icon: Calendar,
      title: "Qualified Meeting Delivery",
      description: "Pre-qualified prospects show up to your calendar ready to discuss their needs"
    }
  ];

  const openContactForm = (type: string) => {
    setFormType(type);
    setContactFormOpen(true);
  };

  const closeContactForm = () => {
    setContactFormOpen(false);
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ContactFormModal 
        isOpen={contactFormOpen} 
        onClose={closeContactForm} 
        formType={formType} 
      />
      {/* Navigation */}
            <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-background/80 backdrop-blur-sm border border-border rounded-full"
      >
                <div className="flex items-center gap-4 md:gap-8"> {/* Responsive gap */}
          <div className="font-bold text-lg md:text-xl text-center md:whitespace-nowrap">
            <div className="md:hidden">
              <div>FlowLogica</div>
              <div className="text-sm">AI SDRs</div>
            </div>
            <div className="hidden md:block">FlowLogica - AI SDRs</div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
            <a href="#results" className="text-sm hover:text-primary transition-colors">Results</a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
          </div>
          <Button 
            size="sm" 
            className="bg-primary text-primary-foreground"
            onClick={() => openContactForm('Book Free Audit')}
          >
            Book Free Audit
          </Button>
        </div>
      </motion.nav>

            {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-0 lg:pt-32 xl:pt-40 2xl:pt-[18px]"> {/* Adjusted pt for larger screens, reduced for 1500px+ */}
        <div className="absolute inset-0 opacity-20">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
                        initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto mt-8 md:mt-0"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Generate{" "}
              <TextShimmer className="text-5xl md:text-7xl font-bold">
                3x More Qualified
              </TextShimmer>{" "}
              Meetings in 30 Days
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Our AI-powered outbound engine books qualified sales meetings while you focus on closing deals. 
              No SDR management, no hiring headaches, no complex software to learn.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground"
                onClick={() => scrollToSection('roi-calculator')}
              >
                Calculate Your ROI
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('results')}
              >
                See Client Results
              </Button>
            </div>

            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm font-medium text-destructive">
                🔥 Limited capacity: Only accepting 2 new clients this month
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              Your Sales Team Is Drowning in Manual Outreach
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground mb-12"
            >
              While your competitors book 10-15 qualified meetings per month, your team struggles with 
              inconsistent pipeline and expensive SDR turnover.
            </motion.p>

                        <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {[{
                value: "$120k+",
                description: "Average cost to hire, train, and retain just ONE SDR for a year"
              }, {
                value: "3-6 months",
                description: "Time wasted ramping up new SDRs before they start producing results"
              }, {
                value: "68%",
                description: "Of B2B companies miss their revenue targets due to inconsistent pipeline"
              }].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex"
                >
                  <Card className="p-6 text-center flex flex-col justify-center w-full">
                    <div className="text-4xl font-bold text-destructive mb-2">{item.value}</div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Real Results From Companies Like Yours
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-muted-foreground"
              >
                See how we've helped companies generate predictable pipeline and achieve remarkable growth.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Card className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">AdTech Company Success Story</h3>
                  <p className="text-muted-foreground">Scaled from €20M to €38M revenue, leading to successful private equity exit</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">€8M</div>
                    <div className="text-sm text-muted-foreground">New ARR Added in 12 Months</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">23</div>
                    <div className="text-sm text-muted-foreground">High-Quality Meetings/Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">€20M → €38M</div>
                    <div className="text-sm text-muted-foreground">Revenue Growth</div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium">
                    🏆 Recognized in the Financial Times Top 1,000 fastest-growing companies in Europe
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                How We 3x Your Qualified Meetings
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-muted-foreground"
              >
                Our proven 4-step system runs your entire outbound engine while you focus on what matters most - closing deals.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="roi-calculator" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Calculate Your ROI
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-muted-foreground"
              >
                See how much revenue you could generate with our outbound system
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Monthly Meetings</label>
                    <Slider
                      value={meetings}
                      onValueChange={setMeetings}
                      max={50}
                      min={1}
                      step={1}
                      className="mb-2"
                    />
                    <div className="text-center text-2xl font-bold text-primary">{meetings[0]}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Average Deal Size</label>
                    <Slider
                      value={dealSize}
                      onValueChange={setDealSize}
                      max={100000}
                      min={1000}
                      step={1000}
                      className="mb-2"
                    />
                    <div className="text-center text-2xl font-bold text-primary">${dealSize[0].toLocaleString()}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Close Rate (%)</label>
                    <Slider
                      value={closeRate}
                      onValueChange={setCloseRate}
                      max={50}
                      min={5}
                      step={1}
                      className="mb-2"
                    />
                    <div className="text-center text-2xl font-bold text-primary">{closeRate[0]}%</div>
                  </div>
                </div>

                <div className="text-center p-6 bg-primary/10 rounded-lg">
                  <p className="text-lg mb-2">With our system, you could generate:</p>
                  <div className="text-4xl font-bold text-primary mb-4">
                    ${calculateROI().toLocaleString()}
                  </div>
                  <p className="text-muted-foreground">additional revenue per year</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground"
                    onClick={() => scrollToSection('pricing')}
                  >
                    See Pricing Plans
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => openContactForm('Book Free Audit')}
                  >
                    Book Free Audit
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-muted/30 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              100% Risk-Free Guarantee
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground mb-12"
            >
              We're so confident in our system that we guarantee results or your money back.
            </motion.p>

                        <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {[{
                icon: "💥",
                title: "Pipeline Promise",
                description: "We guarantee qualified leads in your pipeline within the first 30 days—or we’ll refund your first month."
              }, {
                icon: "📋",
                title: "No Long-Term Contracts",
                description: "Month-to-month agreements. Cancel anytime with 30 days notice"
              }, {
                icon: "🏗️",
                title: "You Own The Data",
                description: "All data in the system belongs to you—no vendor lock-in"
              }].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="flex"
                >
                  <Card className="p-6 text-center flex flex-col h-full w-full">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground flex-grow">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Subscription Options
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-muted-foreground"
              >
                Choose the package that fits your growth goals. All plans include setup, management, and optimization.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12 items-stretch"> {/* Added items-stretch for equal height */}
              {/* Standard Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 flex flex-col h-full"> {/* Added flex flex-col h-full */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Standard</h3>
                    <div className="text-4xl font-bold mb-2">$3,000<span className="text-lg text-muted-foreground">/mo</span></div>
                    <p className="text-sm text-muted-foreground">For scaling and segmentation</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-lg font-semibold mb-2">500 contacts/mo</div>
                    <div className="text-lg font-semibold mb-2">10–20 replies/mo</div>
                    <div className="text-sm text-muted-foreground mb-4">Est. CPL: $150–300</div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow"> {/* Added flex-grow */}
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Full-funnel setup with messaging & assets</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>AI-powered outreach sequences</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Basic analytics & reporting</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Email & LinkedIn integration</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Advanced messaging strategy</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Custom sales assets</span>
                    </li>
                  </ul>

                  <Button 
                    className="w-full mt-auto" 
                    variant="outline" 
                    size="lg"
                    onClick={() => openContactForm('Get Started')}
                  > 
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </motion.div>

              {/* Growth Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-2 border-primary relative flex flex-col h-full"> {/* Added flex flex-col h-full */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">🚀 MOST POPULAR</Badge>
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Growth</h3>
                    <div className="text-4xl font-bold mb-2">$5,000<span className="text-lg text-muted-foreground">/mo</span></div>
                    <p className="text-sm text-muted-foreground">For scaling and segmentation</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-lg font-semibold mb-2">1,500 contacts/mo</div>
                    <div className="text-lg font-semibold mb-2">30–60 replies/mo</div>
                    <div className="text-sm text-muted-foreground mb-4">Est. CPL: $83–166</div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow"> {/* Added flex-grow */}
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Everything in Standard</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Advanced audience segmentation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Multi-variant messaging tests</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Dedicated success manager</span>
                    </li>
                  </ul>

                  <Button 
                    className="w-full bg-primary text-primary-foreground mt-auto" 
                    size="lg"
                    onClick={() => openContactForm('Get Started')}
                  > 
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </motion.div>

              {/* Enterprise Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 flex flex-col h-full"> {/* Added flex flex-col h-full */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                    <div className="text-4xl font-bold mb-2">$10,000+<span className="text-lg text-muted-foreground">/mo</span></div>
                    <p className="text-sm text-muted-foreground">For org-wide enablement</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-lg font-semibold mb-2">Custom contacts</div>
                    <div className="text-lg font-semibold mb-2">100+ replies/mo</div>
                    <div className="text-sm text-muted-foreground mb-4">Custom CPL</div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow"> {/* Added flex-grow */}
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Everything in Growth</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Full CRM integration</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Team enablement & training</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Custom workflows</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Strategic consulting</span>
                    </li>
                  </ul>

                  <Button 
                    className="w-full mt-auto" 
                    variant="outline" 
                    size="lg"
                    onClick={() => openContactForm('Contact Sales')}
                  > 
                    Contact Sales
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-muted/50 rounded-lg"
            >
              <p className="text-sm text-muted-foreground">
                💡 <strong>Benchmark:</strong> $100–200 per qualified reply vs $150–350 per meeting from cold outreach agencies or $200–600 CAC from paid ads.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">FlowLogica - AI SDRs</div>
          <p className="text-muted-foreground mb-6">
            Trusted by B2B SaaS companies to generate $50M+ in pipeline
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <a href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</a>
            <button 
              onClick={() => openContactForm('Contact')} 
              className="hover:text-foreground transition-colors text-sm text-muted-foreground"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AISDRLandingPage;
