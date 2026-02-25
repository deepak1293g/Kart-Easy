import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginSuccess } from "../store/userSlice";
import authService from "../utils/authService";
import "react-toastify/dist/ReactToastify.css";
import { LoaderIcon, EyeClosed, Eye, ShoppingBag, User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoader(true);
    try {
      const response = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password
      });

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        const { session, data: userData } = response.data;

        if (session) {
          // Sync state and storage
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("access Token", session.access_token);
          localStorage.setItem("refresh Token", session.refresh_token);

          dispatch(loginSuccess(userData));
          toast.success("Welcome! Your account has been created successfully.");

          // Clear form and navigate
          navigate("/", { replace: true });
        } else {
          // This happens if Email Confirmation is ON in Supabase
          toast.info("Account created! Please check your email to verify your account.");
          navigate("/login");
        }
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-68px)] lg:h-[calc(100vh-80px)] flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden font-outfit">
      {/* Radiant Backgrounds */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/10 blur-[120px] rounded-full translate-y-1/2 translate-x-1/2"></div>

      <div className="w-full max-w-5xl flex flex-col lg:flex-row bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl m-4 animate-in fade-in zoom-in duration-500">

        {/* Left Side - Cinematic Branding */}
        <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-black via-zinc-900 to-neutral-800 p-12 flex-col justify-between relative overflow-hidden border-r border-white/5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

          <div className="relative z-10">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <ShoppingBag className="text-black" size={22} />
                </div>
                <span className="text-2xl font-black tracking-tighter">KART EASY</span>
              </div>
            </Link>
          </div>

          <div className="relative z-10 mt-20 lg:mt-0">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Begin Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">Elite Dynasty</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              Forge your legacy within the Kart Easy registry and access superior procurement protocols.
            </p>
          </div>

          <div className="relative z-10 pt-10">
            <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">
              <div className="w-12 h-[1px] bg-zinc-800"></div>
              <span>Protocol Initialization v1.4</span>
            </div>
          </div>
        </div>

        {/* Right Side - Premium Form */}
        <div className="lg:w-7/12 p-8 lg:p-12 flex flex-col justify-center bg-transparent overflow-y-auto max-h-full">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8 text-left">
              <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Profile</h3>
              <p className="text-zinc-500 text-sm">Input your credentials for nexus authorization.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="group space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] ml-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-600 group-focus-within:text-white transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      className="block w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all text-sm"
                      placeholder="John Wick"
                      required
                    />
                  </div>
                </div>

                <div className="group space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] ml-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-600 group-focus-within:text-white transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="block w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all text-sm"
                      placeholder="nexus@id.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] ml-1">Create Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-600 group-focus-within:text-white transition-colors">
                        <Lock size={18} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-11 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all text-sm"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="group space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] ml-1">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-600 group-focus-within:text-white transition-colors">
                        <ShieldCheck size={18} />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-11 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all text-sm"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loader}
                className="w-full relative group bg-white text-black py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all active:scale-[0.98] overflow-hidden disabled:opacity-70 mt-4 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-45 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                {loader ? (
                  <LoaderIcon className="animate-spin h-5 w-5 mx-auto" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Create Account <ArrowRight size={16} />
                  </div>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                Already have an account?{" "}
                <Link to="/login" className="text-white font-bold hover:text-pink-400 transition-colors ml-1 underline underline-offset-4">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
