import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [ripples, setRipples] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    teamname: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const newRipple = {
      id: `${Date.now()}-${Math.random()}`,
      x: clientX,
      y: clientY,
    };

    setRipples((prev) => [...prev.slice(-2), newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const usernameRegex = /^[a-zA-Z0-9_]{8,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!formData.username || !usernameRegex.test(formData.username)) {
      newErrors.username =
        "Username must be at least 8 characters long and alphanumeric.";
    }

    if (!formData.teamname || formData.teamname.length < 3) {
      newErrors.teamname = "Team name must be at least 3 characters long.";
    }

    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.success) {
        toast.success(data.message || "Registration successful!");
        setTimeout(() => navigate("/"), 1500); // Delay to let toast appear
      } else if (data.message === "User already exists") {
        toast.error("Username already exists");
      } else if (data.message === "Team name already exists") {
        toast.error("Team name already exists");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    return {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="flex justify-between items-center h-screen bg-white">
      {/* Left Panel */}
      <div
        className="relative flex flex-col justify-center items-center gap-10 bg-gradient-to-b from-[#000f0e]/95 via-[#011d1d]/95 to-[#06b7b4]/95 rounded-tr-[50px] w-1/2 h-screen overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute w-[180px] h-[180px] rounded-full bg-[#06b7b4]/20 blur-3xl animate-ripple pointer-events-none"
            style={{ top: ripple.y - 90, left: ripple.x - 90 }}
          />
        ))}
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-5xl text-white font-bold font-poppins">
            Welcome Back!
          </h1>
          <p className="text-white font-poppins text-lg w-[320px] text-center">
            To keep connected with us please login with your personal info
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-transparent w-fit font-poppins font-semibold border-white border-[2px] text-white py-3 px-10 rounded-[50px] hover:bg-green-100 hover:text-black transition-all duration-300"
        >
          Sign In
        </button>
      </div>

      {/* Right Panel (Sign Up Form) */}
      <div className="flex flex-col justify-center items-center gap-10 bg-white w-1/2 h-screen">
        <div className="flex flex-col gap-5">
          <h1 className="text-center text-3xl text-[#4A4A4A] font-bold font-poppins">
            Create an account
          </h1>

          <div className="flex flex-col gap-8 w-[400px]">
            {/* Username */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                className="border-2 border-[#494949] rounded-xl pr-28 pl-5 focus:border-green-500 focus:outline-none focus:ring-0"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username}</span>
              )}
            </div>

            {/* Team Name */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Team Name"
                name="teamname"
                onChange={handleChange}
                className="border-2 border-[#494949] rounded-xl pr-28 pl-5 focus:border-green-500 focus:outline-none focus:ring-0"
              />
              {errors.teamname && (
                <span className="text-red-500 text-sm">{errors.teamname}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    className="w-full border-2 border-[#494949] rounded-xl pr-10 pl-5 focus:border-green-500 focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {passwordVisible ? (
                      <FaEyeSlash className="w-6 h-6" />
                    ) : (
                      <FaEye className="w-6 h-6" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password}</span>
                )}
              </div>

              {/* Password Strength */}
              <div className="text-sm text-gray-500">
                <div
                  className={`flex items-center gap-2 ${
                    passwordStrength.lowercase ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {passwordStrength.lowercase ? "✅" : "❌"} Lowercase letter
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    passwordStrength.uppercase ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {passwordStrength.uppercase ? "✅" : "❌"} Uppercase letter
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    passwordStrength.specialChar ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {passwordStrength.specialChar ? "✅" : "❌"} Special character
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    passwordStrength.length ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {passwordStrength.length ? "✅" : "❌"} At least 8 characters
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={handleChange}
                  className="w-full border-2 border-[#494949] rounded-xl pr-10 pl-5 focus:border-green-500 focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {confirmPasswordVisible ? (
                    <FaEyeSlash className="w-6 h-6" />
                  ) : (
                    <FaEye className="w-6 h-6" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>

          {/* Terms */}
          <label className="flex justify-center items-center gap-2">
            <input type="checkbox" className="rounded-full" />
            <p>
              I Agree to the{" "}
              <span className="text-orange-500">Terms and Conditions</span>
            </p>
          </label>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#06B7B4] font-poppins font-semibold border-white border-[2px] text-white py-3 px-10 rounded-xl hover:bg-[#069694] w-full transition-all duration-300"
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
