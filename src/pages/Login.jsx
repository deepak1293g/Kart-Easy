import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../store/userSlice";
import authService from "../utils/authService";
import "react-toastify/dist/ReactToastify.css";
import { LoaderIcon, EyeClosed, Eye, ShoppingBag, Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading: loader, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(loginStart());

    try {
      const response = await authService.login({
        email: data.email,
        password: data.password
      });

      if (response.data.error) {
        dispatch(loginFailure(response.data.message));
        toast.error(response.data.message);
      } else {
        const { data: userData, accessToken, refreshToken } = response.data;

        localStorage.setItem("access Token", accessToken);
        localStorage.setItem("refresh Token", refreshToken);

        dispatch(loginSuccess(userData));
        toast.success(response.data.message || `Welcome back, ${userData.name}!`);
        navigate("/");
      }
    } catch (error) {
      dispatch(loginFailure("Login failed!"));
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="w-full h-[calc(100vh-68px)] lg:h-[calc(100vh-80px)] flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden font-outfit">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-5xl flex flex-col lg:flex-row bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl m-4 animate-in fade-in zoom-in duration-500">

        {/* Left Side - Cinematic Branding */}
        <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-zinc-900 via-neutral-900 to-black p-12 flex-col justify-between relative overflow-hidden border-r border-white/5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

          <div className="relative z-10">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <ShoppingBag className="text-black" size={22} />
                </div>
                <span className="text-2xl font-black tracking-tighter">KART EASY</span>
              </div>
            </Link>
          </div>

          <div className="relative z-10 mt-20 lg:mt-0">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Unlock the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Elite Protocol</span>
            </h2>
            <p className="text-zinc-400 text-lg">
              Access curated collections and high-performance logistics through our secure nexus.
            </p>
          </div>

          <div className="relative z-10 pt-10">
            <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">
              <div className="w-12 h-[1px] bg-zinc-800"></div>
              <span>Secure Authentication v2.0</span>
            </div>
          </div>
        </div>

        {/* Right Side - Premium Form */}
        <div className="lg:w-7/12 p-8 lg:p-16 flex flex-col justify-center bg-transparent">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-10 text-left">
              <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">System Login</h3>
              <p className="text-zinc-500">Identify yourself to access the platform.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group space-y-2">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest pl-1">Enter your Email</label>
                <div className="relative transition-all duration-300">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-zinc-600 group-focus-within:text-white transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all text-sm"
                    placeholder="nexus@id.com"
                    required
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Enter your Password</label>
                  <Link to="/forgot-password" size="sm" className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-tighter">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative transition-all duration-300">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-600 group-focus-within:text-white transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-12 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer group/eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeClosed className="h-5 w-5 text-zinc-600 group-hover/eye:text-white transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-zinc-600 group-hover/eye:text-white transition-colors" />
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loader}
                className="w-full relative group bg-white text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-[0.98] overflow-hidden disabled:opacity-70 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-45 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                {loader ? (
                  <LoaderIcon className="animate-spin h-5 w-5 mx-auto" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Login <ArrowRight size={16} />
                  </div>
                )}
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-white/5 text-center">
              <p className="text-zinc-500 text-xs">
                Not registered in the nexus?{" "}
                <Link to="/register" className="text-white font-bold hover:text-indigo-400 transition-colors ml-1 uppercase tracking-tighter">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
