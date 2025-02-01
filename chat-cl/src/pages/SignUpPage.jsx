import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessagesSquare,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import AuthImagePattern from "../components/Authentication/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";

function SignUpPage() {
  const { signUp, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const { email, fullName, password } = formData;

    if (!fullName.trim()) return toast.error("Full Name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");

    if (password.length < 6)
      return toast.error("Password must be atleast 6 characters.");

    if (!/\S+@\S+\.\S+/.test(email))
      return toast.error("Invalid email address");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid !== true) return;

    try {
      await signUp(formData);
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="mb-8 text-center">
            <div className="group flex flex-col items-center gap-2">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <MessagesSquare className="size-8 text-primary" />
              </div>
              <h1 className="mt-2 text-2xl font-bold">Create Account</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="size-5 text-base-content/40" />
                </div>

                <input
                  type="text"
                  placeholder="Jessica Davins"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      fullName: e.target.value,
                    }))
                  }
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="size-5 text-base-content/40" />
                </div>

                <input
                  type="email"
                  placeholder="jdavins@myMail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      email: e.target.value,
                    }))
                  }
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="size-5 text-base-content/40" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      password: e.target.value,
                    }))
                  }
                  className="input input-bordered w-full pl-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((show) => !show)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  {" "}
                  <Loader2 className="size-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?
              <Link to="/login" className="link link-primary">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
}

export default SignUpPage;
