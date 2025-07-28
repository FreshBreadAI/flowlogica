"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue, useAnimation } from "framer-motion";
import { Star, Award, TrendingUp, Target, Mail, Bot, Calendar, ArrowRight, Check, X, UploadCloud } from "lucide-react";
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
        backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`
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

// Free Scan Modal Component
interface FreeScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FreeScanModal = ({ isOpen, onClose }: FreeScanModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a file.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvData = event.target?.result;
      try {
        const response = await fetch('https://hook.eu2.make.com/q8a1b43dlyx66fo5rqgvvxcchxy31x7m', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: csvData,
            fileName: file.name,
            form: 'Free Scan'
          }),
        });

        if (response.ok) {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            onClose();
            setFile(null);
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
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-background rounded-xl shadow-xl w-full max-w-lg relative overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Run a Free Scan</h2>
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
              <h3 className="text-xl font-bold mb-2">Upload Successful!</h3>
              <p className="text-muted-foreground">We'll analyze your list and send you a free report within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-md text-sm">
                  <p className="font-semibold mb-2">Instructions:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Upload a CSV file with up to 200 contacts.</li>
                    <li>The file must contain the headers: <code className="bg-gray-200 p-1 rounded">name</code>, <code className="bg-gray-200 p-1 rounded">email</code>, <code className="bg-gray-200 p-1 rounded">linkedinURL</code>.</li>
                    <li>The email should be a work email address.</li>
                  </ul>
                </div>

                <label
                  htmlFor="file-upload"
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                    dragging ? "border-primary bg-primary/10" : "border-border"
                  )}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">CSV (MAX. 200 contacts)</p>
                  </div>
                  <input id="file-upload" name="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".csv" />
                </label>

                {file && (
                  <div className="text-sm text-muted-foreground">
                    Selected file: {file.name}
                  </div>
                )}
                
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                    {error}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground" 
                  disabled={isSubmitting || !file}
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Free Report'}
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
  const [freeScanModalOpen, setFreeScanModalOpen] = useState(false);

  const features = [
    {
      icon: Target,
      title: "Upload Contacts",
      description: "Send us 100–1,000+ past buyers or users. No setup, no CRM integration."
    },
    {
      icon: Mail,
      title: "We Monitor",
      description: "We track job changes across LinkedIn and enrich new roles, titles, and companies."
    },
    {
      icon: Bot,
      title: "You Get Alerts",
      description: "Receive weekly updates on champions who switch to ICP-fit companies—ready for outreach."
    }
  ];

  const openFreeScanModal = () => {
    setFreeScanModalOpen(true);
  };

  const closeFreeScanModal = () => {
    setFreeScanModalOpen(false);
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <FreeScanModal 
        isOpen={freeScanModalOpen} 
        onClose={closeFreeScanModal} 
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
              <div>Champion Signals</div>
            </div>
            <div className="hidden md:block">Champion Signals</div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-primary transition-colors">How It Works</a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
          </div>
          <Button 
            size="sm" 
            className="bg-primary text-primary-foreground"
            onClick={openFreeScanModal}
          >
            Run a Free Scan
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
              Turn Past Customers Into Your Next Pipeline
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Track when your closed-won buyers change jobs—reconnect at the perfect time and close faster. No CRM required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground"
                onClick={openFreeScanModal}
              >
                Run a Free Scan
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('pricing')}
              >
                See Pricing
              </Button>
            </div>
            <ul className="flex flex-col sm:flex-row gap-4 justify-center text-muted-foreground">
                <li>Upload a contact list in seconds</li>
                <li>Get alerts when champions switch companies</li>
            </ul>
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
              Why You're Missing Pipeline
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground mb-12"
            >
               Your old buyers are changing jobs every day—and you're not following them. Up to 20% of B2B contacts switch roles every year, many to new companies in your ICP. Most teams lose that signal entirely. We turn those job changes into warm leads—so you're not starting from scratch every time.
            </motion.p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
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
                How It Works
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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

      {/* Why It Works Section */}
      <section id="why-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Why It Works
            </motion.h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-1 gap-8">
              {[
                {
                  title: "They Already Know You",
                  description: "Your old buyers trust your brand—outreach hits warmer, converts faster."
                },
                {
                  title: "Buyers in Motion = Buyers With Budget",
                  description: "New hires are 3x more likely to buy in their first 90 days."
                },
                {
                  title: "No More Missed Timing",
                  description: "Be the first to reach out—before competitors do."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
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
                Pricing
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 items-stretch"> {/* Added items-stretch for equal height */}
              {/* Starter Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 flex flex-col h-full"> {/* Added flex flex-col h-full */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Starter</h3>
                    <div className="text-4xl font-bold mb-2">$30<span className="text-lg text-muted-foreground">/month</span></div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow"> {/* Added flex-grow */}
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Track up to 200 contacts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Monthly job change alerts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>ICP-fit lead filtering</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Email report</span>
                    </li>
                  </ul>

                  <Button 
                    className="w-full mt-auto" 
                    variant="outline" 
                    size="lg"
                    onClick={() => {}}
                  > 
                    Start Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </motion.div>

              {/* Pro Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-2 border-primary relative flex flex-col h-full"> {/* Added flex flex-col h-full */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Pro</h3>
                    <div className="text-4xl font-bold mb-2">$99<span className="text-lg text-muted-foreground">/month</span></div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow"> {/* Added flex-grow */}
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Track up to 1,000 contacts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Bi-weekly alerts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Slack + CSV export</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Lead scoring & filters</span>
                    </li>
                     <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Support + reactivation templates</span>
                    </li>
                  </ul>

                  <Button 
                    className="w-full bg-primary text-primary-foreground mt-auto" 
                    size="lg"
                    onClick={() => {}}
                  > 
                    Upgrade Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </motion.div>
            </div>
            <div className="text-center">
                <p>Need to track thousands of contacts or sync with Salesforce?</p>
                <Button variant="link" onClick={() => {}}>Talk to Sales</Button>
            </div>
          </div>
        </div>
      </section>
        {/* Free Scan Section */}
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
                    Run a Free Scan
                    </motion.h2>
                    <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-xl text-muted-foreground mb-12"
                    >
                    Upload 200 contacts. We’ll find job changes from the past 6 months. Get a free report—no signup, no strings.
                    </motion.p>
                    <Button 
                        size="lg" 
                        className="bg-primary text-primary-foreground"
                        onClick={openFreeScanModal}
                    >
                        Get My Free Report
                    </Button>
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
              No Risk Guarantee
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground mb-12"
            >
              No results? No charge. If we don’t find any job changes in your list, you don’t pay a cent.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">Champion Signals</div>
          <p className="text-muted-foreground mb-6">
            Job change alerts that turn forgotten contacts into warm pipeline.
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <a href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-foreground transition-colors">Terms</a>
            <button 
              onClick={() => {}} 
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
