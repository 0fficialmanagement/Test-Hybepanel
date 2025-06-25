import React, { useState } from "react";

export default function Onboarding() {
  const [subscriptionId, setSubscriptionId] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [buttonText, setButtonText] = useState("Next");
  const [showModal, setShowModal] = useState(false);
  const [finalStep, setFinalStep] = useState(false);

  // Simulate backend validation
  const validateSubscriptionId = async () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValid(true);
      setShowPassword(true);
      setIsValidating(false);
    }, 1200); // Simulate network delay
  };

  const handleSubscriptionChange = (e) => {
    setSubscriptionId(e.target.value);
    setIsValid(false);
    setShowPassword(false);
    setPassword("");
    setButtonText("Next");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length > 0) {
      setButtonText("Create Account");
    } else {
      setButtonText("Next");
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (!isValid) {
      validateSubscriptionId();
    } else if (buttonText === "Create Account") {
      setShowModal(true);
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    setFinalStep(true);
    // Final validation/submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6" aria-label="HYBE Onboarding">
        <h1 className="text-2xl font-bold text-center mb-2">HYBE Panel Onboarding</h1>
        <div className="relative">
          <label htmlFor="subscriptionId" className="block text-sm font-medium mb-1">
            Subscription ID
          </label>
          <input
            id="subscriptionId"
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            value={subscriptionId}
            onChange={handleSubscriptionChange}
            disabled={isValidating || finalStep}
            aria-describedby="subscription-desc"
            aria-invalid={!isValid && subscriptionId.length > 0}
            autoComplete="off"
          />
          {isValidating && (
            <span className="absolute right-3 top-9 animate-spin">
              <svg className="h-5 w-5 text-pink-400" fill="none" viewBox="0 0 24 24">
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
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </span>
          )}
        </div>
        {showPassword && (
          <div className="transition-all duration-500 ease-in-out">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Choose HYBE Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={password}
              onChange={handlePasswordChange}
              disabled={finalStep}
              autoComplete="new-password"
            />
          </div>
        )}
        <button
          type="submit"
          className={`w-full py-2 rounded text-white font-semibold transition-all duration-300 ${
            buttonText === "Create Account"
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-pink-500 hover:bg-pink-600"
          } ${finalStep ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleButtonClick}
          disabled={isValidating || finalStep || (showPassword && !password)}
        >
          {buttonText}
        </button>
        {finalStep && (
          <div className="text-green-600 text-center font-medium mt-4 animate-fade-in">
            Account created successfully!
          </div>
        )}
      </form>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in">
            <h2 className="text-xl font-bold mb-2">Create Official HYBE CORP Profile</h2>
            <p className="mb-2">
              You are creating an official HYBE CORP profile to gain premium access, privileges, and be added to the verified fan database.
            </p>
            <div className="text-xs text-gray-600 mb-4 space-y-1">
              <p>This is an official digital registration process in compliance with South Korean law and K-pop fan community standards.</p>
              <p>By continuing, you agree not to misuse, sell, or exploit the services, privileges, or internal communications provided to verified HYBE supporters.</p>
              <p>Impersonation or abuse may result in permanent suspension and legal action if necessary.</p>
              <p>Please participate respectfully within the fandom ecosystem.</p>
            </div>
            <button
              className="w-full py-2 rounded bg-pink-500 hover:bg-pink-600 text-white font-semibold transition-all duration-300"
              onClick={handleContinue}
              autoFocus
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
