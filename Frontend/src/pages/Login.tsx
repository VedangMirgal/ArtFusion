import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Eye, EyeOff, CheckCircle2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

// UI Components
// Note: You'd need to create these components or install a UI library like shadcn/ui
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...props }: InputProps) => (
  <input
    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const Label = ({ className, ...props }: LabelProps) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ className, ...props }: ButtonProps) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Social login icons components
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path fill="#FFFFFF" d="M-3.264 51.509c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#FFFFFF" d="M-14.754 63.239c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z" />
      <path fill="#FFFFFF" d="M-21.484 53.529c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z" />
      <path fill="#FFFFFF" d="M-14.754 43.989c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.07-1.94-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </g>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.377 19.409C17.6769 20.1392 16.966 20.8662 15.87 20.8792C14.774 20.8922 14.442 20.392 13.202 20.392C11.962 20.392 11.6 20.866 10.566 20.892C9.50699 20.918 8.71999 20.1087 8.00699 19.385C6.55199 17.885 5.42199 15.103 5.42999 12.408C5.43399 11.01 5.82799 9.64003 6.58399 8.58003C7.12999 7.77503 8.08499 7.24103 9.11399 7.22503C10.166 7.20903 11.067 7.79303 11.702 7.79303C12.337 7.79303 13.459 7.09603 14.71 7.23003C15.140 7.24403 16.375 7.39103 17.171 8.4348C17.1038 8.47678 15.6038 9.34678 15.6168 11.0268C15.6308 12.9978 17.4538 13.7308 17.4928 13.7478C17.4678 13.8128 17.1608 14.8428 16.3828 15.8918C15.7098 16.8048 14.9928 17.7148 13.9998 17.7278C13.0068 17.7408 12.6578 17.1208 11.6528 17.1208C10.6478 17.1208 10.262 17.7148 9.34099 17.7408C8.40899 17.7668 7.58999 16.7428 6.90899 15.8358C6.74099 15.622 5.81899 14.254 5.81899 11.863C5.81899 9.0738 7.8348 7.5898 9.01199 6.9138C9.74899 6.5168 10.851 6.2168 11.861 6.3088C12.698 6.3188 14.288 6.6948 15.362 7.5558C15.2685 7.61475 15.1807 7.6879 15.1 7.77303C14.496 8.37003 13.9994 9.23903 13.9994 10.24C13.9994 11.333 14.496 12.202 15.1 12.773C15.4 13.073 15.818 13.314 16.307 13.43C16.096 14.144 15.7 15.516 14.872 16.6C19.0454 18.0175 18.377 19.409 18.377 19.409V19.409ZM13.34 3.86303C14.019 3.06903 15.033 2.53303 15.922 2.50003C15.9715 3.41402 15.7008 4.3184 15.156 5.06403C14.611 5.81003 13.737 6.37303 12.798 6.30903C12.733 5.40803 13.059 4.33903 13.339 3.86303H13.34Z" fill="white"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="white"/>
  </svg>
);

export default function Login() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (showLoginForm) {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setSignUpData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Check if form is complete
  useEffect(() => {
    if (showLoginForm) {
      setFormComplete(loginData.email !== "" && loginData.password !== "");
    } else {
      setFormComplete(signUpData.name !== "" && signUpData.email !== "" && signUpData.password !== "");
    }
  }, [loginData, signUpData, showLoginForm]);

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/design";
      // For react-router-dom navigation:
      // navigate("/design");
    }, 800);
  };

  const handleSignUp = () => {
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/design";
      // For react-router-dom navigation:
      // navigate("/onboarding");
    }, 800);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    console.log(`Logging in with ${provider}`);
    // Implement your social login logic here
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/design";
    }, 800);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-indigo-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0.9, 1],
              opacity: [0, 0.2, 0.15, 0.1],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Brand */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white p-8 hidden md:block"
          >
            <Link to="/" className="flex items-center gap-2 mb-12">
              <Sparkles className="h-6 w-6 text-purple-300" />
              <span className="text-2xl font-bold">ArtFusion</span>
            </Link>

            <div className="space-y-6 max-w-md">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Transform your creative vision with ArtFusion
              </h1>

              <p className="text-xl text-purple-200">
                Join thousands of artists and designers using our platform to create stunning visual experiences.
              </p>

              <div className="pt-6 space-y-4">
                {[
                  "Access to cutting-edge style transfer technology",
                  "Transform images and videos with a single click",
                  "Join a community of creative professionals",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-purple-500/30 rounded-full p-1">
                      <CheckCircle2 className="h-5 w-5 text-purple-300" />
                    </div>
                    <span className="text-purple-100">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link
                  to="/"
                  className="text-purple-300 hover:text-purple-200 flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to home
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="md:hidden flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-2 text-white">
                <Sparkles className="h-5 w-5 text-purple-300" />
                <span className="font-bold">ArtFusion</span>
              </Link>

              <Link
                to="/"
                className="text-purple-300 hover:text-purple-200 flex items-center gap-1 text-sm transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                Back
              </Link>
            </div>

            <motion.div
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20"
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-4">
                  <Sparkles className="h-8 w-8 text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">{showLoginForm ? "Welcome Back" : "Create Account"}</h2>
                <p className="text-purple-200 mt-2">
                  {showLoginForm
                    ? "Sign in to continue your creative journey"
                    : "Join ArtFusion and start creating today"}
                </p>
              </motion.div>

              {errorMessage && (
                <motion.div
                  className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-lg mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errorMessage}
                </motion.div>
              )}

              <motion.div className="space-y-5" variants={containerVariants} initial="hidden" animate="visible">
                {!showLoginForm && (
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Name
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300">
                        <User className="h-5 w-5" />
                      </div>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={signUpData.name}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-purple-400 pl-10"
                      />
                    </div>
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300">
                      <Mail className="h-5 w-5" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={showLoginForm ? loginData.email : signUpData.email}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-purple-400 pl-10"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={showLoginForm ? loginData.password : signUpData.password}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-purple-400 pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2">
                  <Button
                    onClick={showLoginForm ? handleLogin : handleSignUp}
                    className={`w-full relative overflow-hidden group ${
                      formComplete
                        ? "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                        : "bg-gray-600"
                    } text-white h-12 transition-all duration-300`}
                    disabled={isLoading || !formComplete}
                  >
                    <span className="relative z-10">
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </div>
                      ) : showLoginForm ? (
                        "Sign In"
                      ) : (
                        "Create Account"
                      )}
                    </span>
                    {formComplete && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center text-white/80 mt-6">
                  {showLoginForm ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => {
                      setShowLoginForm(!showLoginForm);
                      setErrorMessage("");
                    }}
                    className="text-purple-300 hover:text-purple-200 font-medium transition-colors"
                  >
                    {showLoginForm ? "Sign up" : "Sign in"}
                  </button>
                </motion.div>

                {showLoginForm && (
                  <motion.div variants={itemVariants} className="text-center">
                    <button className="text-purple-300 hover:text-purple-200 text-sm transition-colors">
                      Forgot your password?
                    </button>
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className="relative flex items-center gap-4 pt-4 mt-6">
                  <div className="h-px bg-white/20 flex-grow"></div>
                  <span className="text-white/60 text-sm">or continue with</span>
                  <div className="h-px bg-white/20 flex-grow"></div>
                </motion.div>

                {/* Enhanced Social Login Buttons */}
                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { 
                      name: "Google", 
                      icon: <GoogleIcon />, 
                      textColor: "text-white"
                    },
                    { 
                      name: "Apple", 
                      icon: <AppleIcon />, 
                      textColor: "text-white"
                    },
                    { 
                      name: "Facebook", 
                      icon: <FacebookIcon />, 
                      textColor: "text-white"
                    }
                  ].map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => handleSocialLogin(provider.name)}
                      className="flex justify-center items-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/20 transition-colors rounded-lg border border-white/20"
                    >
                      <span className="flex items-center gap-2">
                        {provider.icon}
                        <span className={`${provider.textColor} text-sm hidden sm:inline`}>{provider.name}</span>
                      </span>
                    </button>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="text-center mt-8 text-white/60 text-sm">
              By signing up, you agree to our{" "}
              <a href="#" className="text-purple-300 hover:text-purple-200">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-300 hover:text-purple-200">
                Privacy Policy
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}