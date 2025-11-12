"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react";

export function Footer() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const links = {
    shop: [
      { href: "/occasions", label: t("footer.about") },
      { href: "#", label: t("footer.shipping") },
      { href: "#", label: t("footer.contact") },
    ],
    support: [
      { href: "#", label: t("footer.faq") },
      { href: "#", label: t("footer.returns") },
      { href: "#", label: t("footer.privacy") },
    ],
  };

  const socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer
      className="relative"
      style={{
        backgroundColor: "rgb(var(--footer-background))",
        color: "rgb(var(--footer-foreground))",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 lg:py-20">
        {/* Main Content - Single Row */}
        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - Brand */}
          <div className="lg:col-span-2">
            <h2
              className={`mb-4 text-3xl font-bold tracking-tight ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
              style={{ color: "rgb(var(--footer-foreground))" }}
            >
              ROSISTA
            </h2>
            <p
              className={`mb-6 max-w-sm text-sm leading-relaxed ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
              style={{ color: "rgb(var(--footer-foreground) / 0.7)" }}
            >
              {t("footer.aboutText")}
            </p>

            {/* Newsletter */}
            <div>
              <h3
                className={`mb-3 text-sm font-semibold uppercase tracking-wider ${
                  isRtl ? "font-sans-ar" : "font-sans-en"
                }`}
                style={{ color: "rgb(var(--footer-foreground))" }}
              >
                {isRtl ? "النشرة الإخبارية" : "Newsletter"}
              </h3>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder={isRtl ? "البريد الإلكتروني" : "Email address"}
                  className={`flex-1 rounded-lg border px-4 py-2.5 text-sm outline-none transition-all duration-300 ${
                    isRtl ? "font-sans-ar" : "font-sans-en"
                  }`}
                  style={{
                    backgroundColor: "rgb(var(--footer-background))",
                    borderColor: "rgb(var(--footer-foreground) / 0.2)",
                    color: "rgb(var(--footer-foreground))",
                  }}
                />
                <button
                  type="submit"
                  className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isRtl ? "font-sans-ar" : "font-sans-en"
                  }`}
                  style={{
                    backgroundColor: "rgb(var(--primary-500))",
                    color: "rgb(var(--white))",
                  }}
                >
                  {isRtl ? "اشترك" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3
              className={`mb-4 text-sm font-semibold uppercase tracking-wider ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
              style={{ color: "rgb(var(--footer-foreground))" }}
            >
              {isRtl ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              {links.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    }`}
                    style={{
                      color: "rgb(var(--footer-foreground) / 0.7)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color =
                        "rgb(var(--footer-foreground))")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "rgb(var(--footer-foreground) / 0.7)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div>
            <h3
              className={`mb-4 text-sm font-semibold uppercase tracking-wider ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
              style={{ color: "rgb(var(--footer-foreground))" }}
            >
              {t("footer.customer")}
            </h3>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isRtl ? "font-sans-ar" : "font-sans-en"
                    }`}
                    style={{
                      color: "rgb(var(--footer-foreground) / 0.7)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color =
                        "rgb(var(--footer-foreground))")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "rgb(var(--footer-foreground) / 0.7)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Social Section */}
        <div
          className="mb-12 rounded-2xl border p-6 lg:p-8"
          style={{ borderColor: "rgb(var(--footer-foreground) / 0.2)" }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="mailto:info@rosista.com"
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isRtl ? "font-sans-ar" : "font-sans-en"
                }`}
                style={{
                  color: "rgb(var(--footer-foreground) / 0.7)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color =
                    "rgb(var(--footer-foreground))")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    "rgb(var(--footer-foreground) / 0.7)")
                }
              >
                <Mail className="h-4 w-4" />
                <span>info@rosista.com</span>
              </a>
              <a
                href="tel:+966123456789"
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isRtl ? "font-sans-ar" : "font-sans-en"
                }`}
                style={{
                  color: "rgb(var(--footer-foreground) / 0.7)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color =
                    "rgb(var(--footer-foreground))")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    "rgb(var(--footer-foreground) / 0.7)")
                }
                dir="ltr"
              >
                <Phone className="h-4 w-4" />
                <span>+966 12 345 6789</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span
                className={`text-xs ${isRtl ? "font-sans-ar" : "font-sans-en"}`}
                style={{ color: "rgb(var(--footer-foreground) / 0.5)" }}
              >
                {isRtl ? "تابعنا:" : "Follow us:"}
              </span>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="rounded-full p-2 transition-all duration-300"
                  style={{
                    backgroundColor: "rgb(var(--footer-foreground) / 0.1)",
                    color: "rgb(var(--footer-foreground) / 0.7)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgb(var(--footer-foreground) / 0.2)";
                    e.currentTarget.style.color =
                      "rgb(var(--footer-foreground))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgb(var(--footer-foreground) / 0.1)";
                    e.currentTarget.style.color =
                      "rgb(var(--footer-foreground) / 0.7)";
                  }}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: "rgb(var(--footer-foreground) / 0.2)" }}
        >
          <p
            className={`text-xs ${isRtl ? "font-sans-ar" : "font-sans-en"}`}
            style={{ color: "rgb(var(--footer-foreground) / 0.6)" }}
          >
            © {new Date().getFullYear()} ROSISTA.{" "}
            {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className={`text-xs transition-colors ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
              style={{
                color: "rgb(var(--footer-foreground) / 0.6)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgb(var(--footer-foreground))")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  "rgb(var(--footer-foreground) / 0.6)")
              }
            >
              {t("footer.privacy")}
            </Link>
            <span
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: "rgb(var(--footer-foreground) / 0.3)" }}
            ></span>
            <Link
              href="#"
              className={`text-xs transition-colors ${
                isRtl ? "font-sans-ar" : "font-sans-en"
              }`}
              style={{
                color: "rgb(var(--footer-foreground) / 0.6)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgb(var(--footer-foreground))")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  "rgb(var(--footer-foreground) / 0.6)")
              }
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
