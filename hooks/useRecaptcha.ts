import { useEffect, useState } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
      reset: () => void;
    };
  }
}

interface UseRecaptchaOptions {
  siteKey: string;
  action: string;
}

export const useRecaptcha = ({ siteKey, action }: UseRecaptchaOptions) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if reCAPTCHA is already loaded
    if (window.grecaptcha) {
      setIsLoaded(true);
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.id = "recaptcha-script";

    script.onload = () => {
      window.grecaptcha.ready(() => {
        setIsLoaded(true);
      });
    };

    script.onerror = () => {
      console.error("Failed to load reCAPTCHA script");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      try {
        const existingScript = document.getElementById("recaptcha-script");
        if (existingScript) {
          document.head.removeChild(existingScript);
        }

        // Remove reCAPTCHA elements from DOM
        const recaptchaElements = document.querySelectorAll(
          '[id^="___grecaptcha"]'
        );
        recaptchaElements.forEach((element) => {
          element.remove();
        });

        const recaptchaBadge = document.querySelector(".grecaptcha-badge");
        if (recaptchaBadge) {
          recaptchaBadge.remove();
        }

        const recaptchaIframes = document.querySelectorAll(
          'iframe[src*="recaptcha"]'
        );
        recaptchaIframes.forEach((iframe) => {
          iframe.remove();
        });

        if (window.grecaptcha) {
          try {
            window.grecaptcha.reset();
          } catch {
            // Ignore reset errors
          }
        }

        setIsLoaded(false);
      } catch (error) {
        console.warn("Error during reCAPTCHA cleanup:", error);
      }
    };
  }, [siteKey]);

  const executeRecaptcha = async (): Promise<string> => {
    if (!isLoaded || !window.grecaptcha) {
      throw new Error(
        "reCAPTCHA not loaded yet. Please wait a moment and try again."
      );
    }

    setIsLoading(true);
    try {
      const token = await window.grecaptcha.execute(siteKey, { action });
      setIsLoading(false);
      return token;
    } catch (error) {
      console.error("reCAPTCHA execution failed:", error);
      setIsLoading(false);
      throw new Error("Failed to verify reCAPTCHA. Please try again.");
    }
  };

  return {
    isLoaded,
    isLoading,
    executeRecaptcha,
  };
};
