import { ArrowRight } from "lucide-react";
import  { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import API from "../../api/axios";

const AdminLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async(e)=>{
        e.preventDefault();
        
        try {
            const {data} = await API.post("/auth/admin/login", {email, password});

            if(data.success){
                toast.success(data.message);
                dispatch(setUser(data.data));

                setTimeout(() => {
                navigate("/admin/dashboard");
                }, 100);

            }else{
                toast.error("Invalid Credientials");
            }
        } catch (error) {
            toast.error(error.response?.data.message);
        }

    }

  return (
    <div>
      <main className=" bg-sage-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-8">
            <h1 className="text-2xl font-semibold text-sage-900 mb-2 text-center">
              Welcome Back
            </h1>
            <p className="text-center text-sage-700 mb-8 text-sm">
              Login to your GreenLand account
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-sage-900"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-sage-50 text-sage-900 placeholder-sage-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-sage-900"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-sage-200 bg-sage-50 text-sage-900 placeholder-sage-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-sage-700 hover:text-sage-900"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>


              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                Login <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          </div>

          <p className="text-center text-xs text-sage-700 mt-6">
            By logging in, you agree to our Terms & Conditions and Privacy
            Policy
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
