"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M7 17L17 7M10 7h7v7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NAV_ITEMS: CardNavItem[] = [
  {
    label: "Home",
    bgColor: "#f8f5f2",
    textColor: "#231f20",
    links: [
      { label: "Overview", href: "/", ariaLabel: "Go to home overview" },
      { label: "Guest Stories", href: "/trekking", ariaLabel: "Read trekking articles" },
      { label: "Plan a Safari", href: "/plan", ariaLabel: "Plan a safari" },
    ],
  },
  {
    label: "Experiences",
    bgColor: "#ba7e47",
    textColor: "#ffffff",
    links: [
      { label: "All Experiences", href: "/experiences", ariaLabel: "Explore experiences" },
      {
        label: "Travel Styles",
        href: "/experiences#TravelStyles",
        ariaLabel: "View family-friendly experiences",
      },
      { label: "Destination By Circuite", href: "/experiences#active", ariaLabel: "View active trips" },
    ],
  },
  {
    label: "Itineraries",
    bgColor: "#231f20",
    textColor: "#ffffff",
    links: [
      { label: "All Routes", href: "/itineraries", ariaLabel: "Browse itineraries" },
      { label: "Migration Focus", href: "/itineraries#migration", ariaLabel: "View migration trips" },
      { label: "Bush & Beach", href: "/itineraries#coast", ariaLabel: "View bush and beach trips" },
    ],
  },
  {
    label: "Conservation",
    bgColor: "#c3c3c3",
    textColor: "#231f20",
    links: [
      { label: "Impact Overview", href: "/conservation", ariaLabel: "See conservation page" },
      {
        label: "Community Partners",
        href: "/conservation#partners",
        ariaLabel: "View partners",
      },
      { label: "Donate or Volunteer", href: "/conservation#get-involved", ariaLabel: "Get involved" },
    ],
  },
  {
    label: "Trekking",
    bgColor: "#fdf2e4",
    textColor: "#231f20",
    links: [
      { label: "Kilimanjaro", href: "/trekking", ariaLabel: "Read Kilimanjaro trekking info" },
    ],
  },
];

const BASE_HEIGHT = 156;
const EASE = "power3.out";

export function SiteHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setNavHidden] = useState(false);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const usesTransparentHeader = pathname === "/";
  const isLightNav = isScrolled || !usesTransparentHeader;
  const navTextColor = isLightNav ? "text-[#231f20]" : "text-white";
  const logoSrc = usesTransparentHeader && !isScrolled ? "/evelogowhite.png" : "/evelogo.png";
  const ctaClasses = isLightNav
    ? "rounded-full border border-[#231f20] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#231f20] transition hover:bg-[#231f20] hover:text-white"
    : "rounded-full border border-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#231f20]";
  const menuButtonClasses = isLightNav
    ? "rounded-full border border-[#231f20] p-3 text-[#231f20] transition hover:bg-[#231f20] hover:text-white"
    : "rounded-full border border-white p-3 text-white transition hover:bg-white hover:text-[#231f20]";

  const displayedItems = isMobile
    ? isMobileMenuOpen
      ? NAV_ITEMS.slice(1)
      : []
    : activeIndex !== null && activeIndex !== 0
      ? [NAV_ITEMS[activeIndex]]
      : [];

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: BASE_HEIGHT, overflow: "visible" });
    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, y: 20 });
    }

    const tl = gsap.timeline({ paused: true });

    if (contentRef.current) {
      tl.to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: EASE,
        },
        "-=0.2",
      );
    }

    return tl;
  };

  const clearInactivity = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
      inactivityTimeoutRef.current = null;
    }
  }, []);

  const handleUserActivity = useCallback(
    (scrolled: boolean) => {
      setNavHidden(false);
      clearInactivity();
      if (scrolled) {
        inactivityTimeoutRef.current = setTimeout(() => {
          setNavHidden(true);
        }, 2000);
      }
    },
    [clearInactivity],
  );

  const openMenu = useCallback(() => {
    if (isExpanded) return;
    const tl = timelineRef.current;
    if (!tl) return;
    tl.eventCallback("onReverseComplete", null);
    setIsExpanded(true);
    tl.play(0);
  }, [isExpanded]);

  const closeMenu = useCallback(() => {
    if (!isExpanded) return;
    const tl = timelineRef.current;
    if (!tl) return;
    tl.eventCallback("onReverseComplete", () => {
      setIsExpanded(false);
      setActiveIndex(null);
      setMobileMenuOpen(false);
    });
    tl.reverse();
  }, [isExpanded]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    timelineRef.current = tl;

    return () => {
      tl?.kill();
      timelineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const updateMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    const handleScroll = () => {
      const scrolled = window.scrollY > 8;
      setIsScrolled(scrolled);
      if (!scrolled) {
        setNavHidden(false);
        clearInactivity();
      } else {
        handleUserActivity(true);
      }
    };
    const handleMouseMove = () => handleUserActivity(window.scrollY > 8);
    updateMobile();
    handleScroll();
    window.addEventListener("resize", updateMobile);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", updateMobile);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInactivity();
    };
  }, [clearInactivity, handleUserActivity]);

  useEffect(() => {
    if (isMobile) {
      setActiveIndex(null);
      if (!isMobileMenuOpen) {
        closeMenu();
      }
      return;
    }
    setMobileMenuOpen(false);
  }, [closeMenu, isMobile, isMobileMenuOpen]);

  useEffect(() => {
    if (isMobile) {
      if (isMobileMenuOpen) {
        openMenu();
      } else {
        closeMenu();
      }
      return;
    }

    if (activeIndex !== null && activeIndex !== 0) {
      openMenu();
    }
  }, [activeIndex, closeMenu, isMobile, isMobileMenuOpen, openMenu]);

  const handleDesktopNav = (index: number) => {
    if (isMobile || index === 0) return;
    setActiveIndex(index);
  };

  const handleNavLinkClick = useCallback(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
      closeMenu();
    }
  }, [closeMenu, isMobile]);

  const handleMouseLeave = () => {
    if (!isMobile) {
      closeMenu();
    }
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMenu();
    } else {
      setMobileMenuOpen(true);
    }
  };

  const showMobileBackdrop = isMobile && isMobileMenuOpen;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isNavHidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {showMobileBackdrop && (
        <div
          className="fixed inset-0 z-0 pointer-events-none bg-black/20 backdrop-blur-md transition"
          aria-hidden="true"
        />
      )}
      <div
        ref={navRef}
        className="relative z-10 w-full overflow-visible transition-colors duration-300"
        style={{ height: BASE_HEIGHT }}
        onMouseLeave={handleMouseLeave}
      >
        {isLightNav && (
          <div
            className="pointer-events-none absolute inset-0 -z-10 backdrop-blur-md"
            style={{
              backgroundColor: "rgba(229, 224, 200, 0.6)",
              clipPath:
                "polygon(0 0, 100% 0, 100% calc(100% - 6px), 96% 100%, 92% calc(100% - 3px), 88% 100%, 84% calc(100% - 5px), 80% 100%, 76% calc(100% - 4px), 72% 100%, 68% calc(100% - 6px), 64% 100%, 60% calc(100% - 4px), 56% 100%, 52% calc(100% - 5px), 48% 100%, 44% calc(100% - 3px), 40% 100%, 36% calc(100% - 6px), 32% 100%, 28% calc(100% - 4px), 24% 100%, 20% calc(100% - 5px), 16% 100%, 12% calc(100% - 3px), 8% 100%, 4% calc(100% - 4px), 0 calc(100% - 3px))",
            }}
            aria-hidden="true"
          />
        )}
        <div className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 ${navTextColor}`}>
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src={logoSrc}
              alt="Eve On Safari logo"
              width={540}
              height={132}
              priority
              className="h-28 w-auto object-contain"
            />
          </Link>
          <div className={`hidden flex-1 items-center justify-center gap-4 text-sm font-semibold lg:flex ${navTextColor}`}>
            {NAV_ITEMS.map((item, index) => (
              index === 0 ? (
                <Link
                  key={item.label}
                  href="/"
                  className="rounded-full px-4 py-2 text-xs uppercase tracking-wide transition hover:text-[#ba7e47]"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onMouseEnter={() => handleDesktopNav(index)}
                  onFocus={() => handleDesktopNav(index)}
                  onClick={() => handleDesktopNav(index)}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-wide transition ${
                    activeIndex === index ? "text-[#ba7e47]" : "hover:text-[#ba7e47]"
                  }`}
                  aria-expanded={activeIndex === index && isExpanded}
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/plan"
              className={`hidden lg:inline-flex ${ctaClasses}`}
            >
              Plan a Safari
            </Link>
            <button
              type="button"
              className={`flex flex-col items-center justify-center lg:hidden ${menuButtonClasses}`}
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="card-nav-menu"
            >
              <span className="sr-only">Toggle menu</span>
              <span className="block h-0.5 w-5 bg-current"></span>
              <span className="my-1 block h-0.5 w-5 bg-current"></span>
              <span className="block h-0.5 w-5 bg-current"></span>
            </button>
          </div>
        </div>
        <div
        ref={contentRef}
        id="card-nav-menu"
        style={{ top: `${BASE_HEIGHT}px` }}
        className={`card-nav-content absolute left-0 right-0 mx-auto max-w-6xl px-6 pb-4 ${isExpanded ? "pointer-events-auto z-20" : "pointer-events-none"}`}
        >
          {displayedItems.length > 0 && (
            <div
              className={
                isMobile
                  ? "flex flex-col gap-4"
                  : "flex justify-center gap-4"
              }
            >
              {displayedItems.map((item) => (
                <div
                  key={item.label}
                  className="w-full max-w-xl rounded-[24px] p-5"
                  style={{ backgroundColor: item.bgColor, color: item.textColor }}
                >
                  <p className="text-sm uppercase tracking-[0.3em]">{item.label}</p>
                  <div className="mt-3 flex flex-col gap-2 text-sm">
                    {item.links.map((link) => (
                      <Link
                        key={link.href + link.label}
                        href={link.href}
                        aria-label={link.ariaLabel}
                        onClick={handleNavLinkClick}
                        className="inline-flex items-center gap-2 font-semibold transition hover:opacity-75"
                      >
                        <ArrowIcon />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {!displayedItems.length && (
            <div className="hidden" aria-hidden />
          )}
        </div>
      </div>
    </header>
  );
}
