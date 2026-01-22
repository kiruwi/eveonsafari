"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { HeaderAuthStatus } from "@/components/HeaderAuthStatus";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

type CardNavSection = {
  label: string;
  links: CardNavLink[];
};

type NavLinkItem = {
  type: "link";
  label: string;
  href: string;
  ariaLabel: string;
  hideOnDesktop?: boolean;
};

type CardNavItem = {
  type: "dropdown";
  label: string;
  bgColor: string;
  textColor: string;
  links?: CardNavLink[];
  sections?: CardNavSection[];
};

type NavItem = NavLinkItem | CardNavItem;

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

const ChevronDownIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NAV_ITEMS: NavItem[] = [
  {
    type: "link",
    label: "Home",
    href: "/",
    ariaLabel: "Go to the home page",
  },
  {
    type: "dropdown",
    label: "Discover Tanzania",
    bgColor: "#fdf2e4",
    textColor: "#231f20",
    links: [
      {
        label: "National Parks",
        href: "/itineraries#safari-grid",
        ariaLabel: "Browse safari packages",
      },
      {
        label: "Islands",
        href: "/discover-tanzania/islands",
        ariaLabel: "Explore Tanzania islands",
      },
      {
        label: "Accommodations",
        href: "/discover-tanzania/accommodations",
        ariaLabel: "Explore Tanzania accommodations",
      },
      {
        label: "Activities",
        href: "/activities",
        ariaLabel: "Browse daily activities",
      },
    ],
  },
  {
    type: "dropdown",
    label: "Safaris",
    bgColor: "#231f20",
    textColor: "#ffffff",
    sections: [
      {
        label: "Safari Overview",
        links: [{ label: "All Safaris", href: "/itineraries", ariaLabel: "Browse all safaris" }],
      },
      {
        label: "By Duration",
        links: [
          {
            label: "2 Days",
            href: "/safaris/duration/2-days",
            ariaLabel: "View 2-day safaris overview",
          },
          {
            label: "3 Days",
            href: "/safaris/duration/3-days",
            ariaLabel: "View 3-day safaris overview",
          },
          {
            label: "4 Days",
            href: "/safaris/duration/4-days",
            ariaLabel: "View 4-day safaris overview",
          },
          {
            label: "5 Days",
            href: "/safaris/duration/5-days",
            ariaLabel: "View 5-day safaris overview",
          },
          {
            label: "6 Days",
            href: "/safaris/duration/6-days",
            ariaLabel: "View 6-day safaris overview",
          },
          {
            label: "7 Days",
            href: "/safaris/duration/7-days",
            ariaLabel: "View 7-day safaris overview",
          },
          {
            label: "8+ Days",
            href: "/safaris/duration/8-plus-days",
            ariaLabel: "View 8+ day safaris overview",
          },
        ],
      },
      {
        label: "By Style",
        links: [
          {
            label: "Classic Wildlife",
            href: "/safaris/style/classic-wildlife",
            ariaLabel: "View classic wildlife safaris",
          },
          {
            label: "Migration Safaris",
            href: "/safaris/style/migration-safaris",
            ariaLabel: "View migration safaris",
          },
          {
            label: "Cultural Safaris",
            href: "/safaris/style/cultural-safaris",
            ariaLabel: "View cultural safaris",
          },
          {
            label: "Family Safaris",
            href: "/safaris/style/family-safaris",
            ariaLabel: "View family safaris",
          },
        ],
      },
    ],
  },
  {
    type: "dropdown",
    label: "Kilimanjaro",
    bgColor: "#fdf2e4",
    textColor: "#231f20",
    links: [
      { label: "Kilimanjaro Overview", href: "/trekking", ariaLabel: "Compare Kilimanjaro routes" },
      { label: "Marangu Route", href: "/trekking/kilimanjaro-marangu-route", ariaLabel: "View Marangu Route details" },
      { label: "Machame Route", href: "/trekking/kilimanjaro-machame-route", ariaLabel: "View Machame Route details" },
      { label: "Lemosho Route", href: "/trekking/kilimanjaro-lemosho-route", ariaLabel: "View Lemosho Route details" },
      { label: "Rongai Route", href: "/trekking/7-day-rongai-route-kilimanjaro-trek", ariaLabel: "View Rongai Route details" },
      { label: "Northern Circuit", href: "/trekking/9-days-northern-circuit-route-kilimanjaro-trek", ariaLabel: "View Northern Circuit Route details" },
    ],
  },
  {
    type: "link",
    label: "About",
    href: "/about-us",
    ariaLabel: "Learn about Eve On Safari",
  },
  {
    type: "link",
    label: "Plan Your Trip",
    href: "/plan",
    ariaLabel: "Plan your trip",
    hideOnDesktop: true,
  },
];

const BASE_HEIGHT = 156;
const EASE = "power3.out";

const isDropdownItem = (item: NavItem): item is CardNavItem => item.type === "dropdown";

type GsapInstance = typeof import("gsap")["gsap"];
type GsapTimeline = ReturnType<GsapInstance["timeline"]>;

export function SiteHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const gsapRef = useRef<GsapInstance | null>(null);
  const timelineRef = useRef<GsapTimeline | null>(null);
  const lockedScrollYRef = useRef(0);
  const bodyLockStylesRef = useRef<{
    overflow: string;
    position: string;
    top: string;
    width: string;
    paddingRight: string;
  } | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setNavHidden] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [activeSectionLabel, setActiveSectionLabel] = useState<string | null>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const usesTransparentHeader = pathname === "/";
  const isHeroTransparent = usesTransparentHeader && !isScrolled;
  const showNavBackground = !isHeroTransparent && !(isMobile && isMobileMenuOpen);
  const navTextColor = showNavBackground ? "text-[#231f20]" : "text-white";
  const logoSrc = isHeroTransparent ? "/evelogowhite.png" : "/evelogo.png";
  const ctaClasses = showNavBackground
    ? "rounded-full border border-[#231f20] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#231f20] transition hover:bg-[#231f20] hover:text-white"
    : "rounded-full border border-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#231f20]";
  const menuButtonClasses = showNavBackground
    ? "rounded-full border border-[#231f20] p-3 text-[#231f20] transition hover:bg-[#231f20] hover:text-white"
    : "rounded-full border border-white p-3 text-white transition hover:bg-white hover:text-[#231f20]";
  const userBadgeClasses = showNavBackground
    ? "border-[#231f20]/25 bg-white/70 text-[#231f20]"
    : "border-white/35 bg-white/10 text-white";
  const userBadgeDetailClasses = showNavBackground ? "text-[#231f20]/70" : "text-white/80";
  const signOutClasses = showNavBackground
    ? "rounded-full border border-[#231f20] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#231f20] transition hover:bg-[#231f20] hover:text-white sm:px-3 sm:py-2 sm:text-[11px]"
    : "rounded-full border border-white px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#231f20] sm:px-3 sm:py-2 sm:text-[11px]";

  const displayedItems = useMemo(() => {
    if (isMobile) {
      return isMobileMenuOpen ? NAV_ITEMS.filter(isDropdownItem) : [];
    }
    if (activeIndex !== null) {
      const item = NAV_ITEMS[activeIndex];
      return item && item.type === "dropdown" ? [item] : [];
    }
    return [];
  }, [activeIndex, isMobile, isMobileMenuOpen]);

  const mobileLinkItems = useMemo(
    () => NAV_ITEMS.filter((item): item is NavLinkItem => item.type === "link"),
    [],
  );

  useEffect(() => {
    if (isMobile) {
      setActiveSectionLabel(null);
      return;
    }
    const current = displayedItems[0];
    const firstSection = current?.sections?.[0]?.label ?? null;
    setActiveSectionLabel(firstSection);
  }, [displayedItems, isMobile]);

  const createTimeline = () => {
    const gsapInstance = gsapRef.current;
    const navEl = navRef.current;
    if (!navEl || !gsapInstance) return null;

    gsapInstance.set(navEl, { height: BASE_HEIGHT, overflow: "visible" });
    if (contentRef.current) {
      gsapInstance.set(contentRef.current, { opacity: 0, y: 20 });
    }

    const tl = gsapInstance.timeline({ paused: true });

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
      if (isMobileMenuOpen || isExpanded) return;
      if (scrolled) {
        inactivityTimeoutRef.current = setTimeout(() => {
          setNavHidden(true);
        }, 2000);
      }
    },
    [clearInactivity, isExpanded, isMobileMenuOpen],
  );

  const openMenu = useCallback(() => {
    if (isExpanded) return;
    setNavHidden(false);
    clearInactivity();
    setIsExpanded(true);
    const tl = timelineRef.current;
    if (!tl) return;
    tl.eventCallback("onReverseComplete", null);
    tl.play(0);
  }, [clearInactivity, isExpanded]);

  const closeMenu = useCallback(
    (options?: { immediate?: boolean }) => {
      if (!isExpanded && !isMobileMenuOpen) return;
      const shouldCloseImmediately = options?.immediate;
      if (shouldCloseImmediately) {
        timelineRef.current?.pause(0);
        setIsExpanded(false);
        setActiveIndex(null);
        setMobileMenuOpen(false);
        return;
      }
      const tl = timelineRef.current;
      if (!tl) {
        setIsExpanded(false);
        setActiveIndex(null);
        setMobileMenuOpen(false);
        return;
      }
      tl.eventCallback("onReverseComplete", () => {
        setIsExpanded(false);
        setActiveIndex(null);
        setMobileMenuOpen(false);
      });
      tl.reverse();
    },
    [isExpanded, isMobile, isMobileMenuOpen],
  );

  useLayoutEffect(() => {
    let active = true;
    const loadGsap = async () => {
      const { gsap } = await import("gsap");
      if (!active) return;
      gsapRef.current = gsap;
      const tl = createTimeline();
      timelineRef.current = tl;
    };
    loadGsap();

    return () => {
      active = false;
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const updateMobile = () => {
      const nextIsMobile = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(nextIsMobile);
      if (nextIsMobile) {
        setActiveIndex(null);
        if (!isMobileMenuOpen) {
          closeMenu();
        }
      } else {
        setMobileMenuOpen(false);
      }
    };
    const handleScroll = () => {
      if (isMobileMenuOpen) return;
      const scrolled = window.scrollY > 8;
      setIsScrolled(scrolled);
      if (!scrolled) {
        setNavHidden(false);
        clearInactivity();
        setActiveIndex(null);
        setActiveSectionLabel(null);
        closeMenu();
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
  }, [clearInactivity, closeMenu, handleUserActivity, isMobileMenuOpen]);

  useEffect(() => {
    if (isMobile || !isExpanded) return;
    const handleMouseMove = (event: MouseEvent) => {
      const navRect = navRef.current?.getBoundingClientRect();
      const panelRect = panelRef.current?.getBoundingClientRect();
      const { clientX, clientY } = event;
      const insideRect = (rect?: DOMRect) =>
        rect &&
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (insideRect(navRect) || insideRect(panelRect)) {
        return;
      }

      closeMenu();
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [closeMenu, isExpanded, isMobile]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const body = document.body;
    const docEl = document.documentElement;

    lockedScrollYRef.current = window.scrollY;
    bodyLockStylesRef.current = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };

    const scrollbarCompensation = window.innerWidth - docEl.clientWidth;
    if (scrollbarCompensation > 0) {
      body.style.paddingRight = `${scrollbarCompensation}px`;
    }
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${lockedScrollYRef.current}px`;
    body.style.width = "100%";

    return () => {
      const prev = bodyLockStylesRef.current;
      if (prev) {
        body.style.overflow = prev.overflow;
        body.style.position = prev.position;
        body.style.top = prev.top;
        body.style.width = prev.width;
        body.style.paddingRight = prev.paddingRight;
      }
      bodyLockStylesRef.current = null;
      window.scrollTo(0, lockedScrollYRef.current);
    };
  }, [isMobileMenuOpen]);

  useLayoutEffect(() => {
    const measureHeight = () => {
      const el = contentRef.current;
      if (!el) return;
      const height = el.scrollHeight ?? 0;
      setContentHeight((prev) => (height > 0 ? height : prev));
    };
    measureHeight();

    const observer = new ResizeObserver(measureHeight);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [displayedItems]);

  useEffect(() => {
    setActiveIndex(null);
    setActiveSectionLabel(null);
    closeMenu();
  }, [pathname, closeMenu]);

  const handleDesktopNav = (index: number, item: NavItem) => {
    if (isMobile || item.type !== "dropdown") return;
    setActiveIndex(index);
    openMenu();
  };

  const handleDesktopLinkHover = () => {
    if (isMobile) return;
    setActiveIndex(null);
    closeMenu();
  };

  const handleNavLinkClick = useCallback(() => {
    if (isMobile) {
      closeMenu({ immediate: true });
    }
  }, [closeMenu, isMobile]);

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && navRef.current?.contains(nextTarget)) {
      return;
    }
    closeMenu();
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMenu({ immediate: true });
      return;
    }
    setNavHidden(false);
    clearInactivity();
    setMobileMenuOpen(true);
    openMenu();
  };

  const showMobileBackdrop = isMobile && isMobileMenuOpen;
  const navHeight = isMobile && isExpanded ? BASE_HEIGHT + Math.max(contentHeight, 0) : BASE_HEIGHT;
  const showMenuContent = isMobile ? isMobileMenuOpen : displayedItems.length > 0;
  const contentMaxHeight = isMobile ? `calc(100vh - ${BASE_HEIGHT}px)` : undefined;
  const contentOverflowY = isMobile ? "auto" : "visible";
  const contentVisible = isExpanded && showMenuContent;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isNavHidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {showMobileBackdrop && (
        <div
          className="fixed inset-0 z-0 bg-black/20 backdrop-blur-md transition"
          aria-hidden="true"
        />
      )}
      <div
        ref={navRef}
        className="relative z-10 w-full overflow-visible transition-colors duration-300"
        style={{ height: navHeight }}
        onMouseLeave={handleMouseLeave}
      >
        {showNavBackground && (
          <div
            className="pointer-events-none absolute inset-0 -z-10 backdrop-blur-md"
            style={{
              backgroundColor: "rgba(229, 224, 200, 0.6)",
              // clipPath removed to keep nav edge straight
            }}
            aria-hidden="true"
          />
        )}
        <div className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 ${navTextColor}`}>
          <Link
            href="/"
            onClick={() => closeMenu({ immediate: true })}
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
              item.type === "link" ? (
                item.hideOnDesktop ? null : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-xs uppercase tracking-wide transition hover:text-[#ba7e47]"
                    onMouseEnter={handleDesktopLinkHover}
                    onFocus={handleDesktopLinkHover}
                  >
                    {item.label}
                  </Link>
                )
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onMouseEnter={() => handleDesktopNav(index, item)}
                  onFocus={() => handleDesktopNav(index, item)}
                  onClick={() => handleDesktopNav(index, item)}
                  className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs uppercase tracking-wide transition ${
                    activeIndex === index ? "text-[#ba7e47]" : "hover:text-[#ba7e47]"
                  }`}
                  aria-expanded={activeIndex === index && isExpanded}
                >
                  {item.label}
                  <ChevronDownIcon />
                </button>
              )
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <HeaderAuthStatus
              userBadgeClasses={userBadgeClasses}
              userBadgeDetailClasses={userBadgeDetailClasses}
              signOutClasses={signOutClasses}
            />
            <Link
              href="/plan"
              className={`hidden lg:inline-flex ${ctaClasses}`}
            >
              Plan Your Trip
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
          style={{
            top: `${BASE_HEIGHT}px`,
            maxHeight: contentMaxHeight,
            overflowY: contentOverflowY,
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0px)" : "translateY(12px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
          onMouseLeave={handleMouseLeave}
          className={`card-nav-content absolute left-0 right-0 mx-auto max-w-6xl px-6 pb-4 ${isExpanded ? "pointer-events-auto z-20" : "pointer-events-none"}`}
        >
          {showMenuContent && (
            <div
              className={
                isMobile
                  ? "flex flex-col gap-4"
                  : "flex justify-center gap-4"
              }
            >
              {isMobile && (
                <div className="rounded-[20px] border border-[#c3c3c3] bg-white/90 p-4 text-sm text-[#231f20] shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#ba7e47]">Main navigation</p>
                  <div className="mt-3 flex flex-col gap-2">
                    {mobileLinkItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-label={item.ariaLabel}
                        onClick={handleNavLinkClick}
                        className={`inline-flex items-center gap-2 font-semibold transition hover:opacity-75 ${
                          item.label === "Plan Your Trip" ? "text-[#ba7e47]" : ""
                        }`}
                      >
                        <ArrowIcon />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {displayedItems.map((item) => (
                <div
                  key={item.label}
                  ref={panelRef}
                  className={`w-full rounded-[24px] p-5 ${item.sections && !isMobile ? "max-w-xl" : "max-w-xl"}`}
                  style={{ backgroundColor: item.bgColor, color: item.textColor }}
                >
                  <p className="text-sm uppercase tracking-[0.3em]">{item.label}</p>
                  {item.sections && !isMobile ? (() => {
                    const isDarkTheme = item.textColor.toLowerCase() === "#ffffff";
                    const activeSection =
                      item.sections.find((section) => section.label === activeSectionLabel) ??
                      item.sections[0];
                    const shouldShowRightColumn =
                      activeSection?.label === "Safari Overview" ? false : (activeSection?.links?.length ?? 0) > 1;
                    const sectionBaseClasses = isDarkTheme
                      ? "border border-white/20 hover:bg-white/10"
                      : "border border-[#231f20]/15 hover:bg-[#231f20]/5";
                    const activeSectionClasses = isDarkTheme ? "bg-white/15" : "bg-[#231f20]/10";
                    const arrowClasses = isDarkTheme ? "text-white/70" : "text-[#231f20]/60";
                    return (
                      <div className={`mt-4 ${shouldShowRightColumn ? "grid gap-6 text-sm md:grid-cols-[0.7fr_1fr]" : "text-sm"}`}>
                        <div className="space-y-2">
                          {item.sections.map((section) => {
                            const isActive = activeSection?.label === section.label;
                            const singleLink = section.links.length === 1 ? section.links[0] : null;
                            if (singleLink) {
                              const isSafariOverview = section.label === "Safari Overview";
                              const overviewClasses = isSafariOverview
                                ? "rounded-full px-2 py-1 font-semibold transition hover:opacity-75"
                                : `flex w-full items-center justify-between rounded-full px-3 py-2 text-left text-[11px] uppercase tracking-[0.25em] transition ${sectionBaseClasses} ${
                                    isActive ? activeSectionClasses : ""
                                  }`;
                              return (
                                <Link
                                  key={section.label}
                                  href={singleLink.href}
                                  aria-label={singleLink.ariaLabel}
                                  onMouseEnter={() => setActiveSectionLabel(section.label)}
                                  onFocus={() => setActiveSectionLabel(section.label)}
                                  onClick={handleNavLinkClick}
                                  aria-current={isActive ? "true" : undefined}
                                  className={overviewClasses}
                                >
                                  <span className={isSafariOverview ? "inline-flex items-center gap-2" : "opacity-80"}>
                                    {isSafariOverview ? <ArrowIcon /> : null}
                                    {singleLink.label}
                                  </span>
                                  {isSafariOverview ? null : <span className={`text-xs ${arrowClasses}`}>→</span>}
                                </Link>
                              );
                            }
                            return (
                              <button
                                key={section.label}
                                type="button"
                                onMouseEnter={() => setActiveSectionLabel(section.label)}
                                onFocus={() => setActiveSectionLabel(section.label)}
                                onClick={() => setActiveSectionLabel(section.label)}
                                aria-current={isActive ? "true" : undefined}
                                className={`flex w-full items-center justify-between rounded-full px-3 py-2 text-left text-[11px] uppercase tracking-[0.25em] transition ${sectionBaseClasses} ${
                                  isActive ? activeSectionClasses : ""
                                }`}
                              >
                                <span className="opacity-80">{section.label}</span>
                                <span className={`text-xs ${arrowClasses}`}>→</span>
                              </button>
                            );
                          })}
                        </div>
                        {shouldShowRightColumn && (
                          <div className="flex flex-col gap-2">
                            {activeSection?.links.map((link) => (
                              <Link
                                key={link.href + link.label}
                                href={link.href}
                                aria-label={link.ariaLabel}
                                onClick={handleNavLinkClick}
                                className="group inline-flex items-center gap-3 rounded-xl px-2 py-2 font-semibold transition hover:opacity-75"
                              >
                                <span className="inline-flex items-center gap-2">
                                  <ArrowIcon />
                                  {link.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })() : item.sections ? (
                    <div className="mt-3 space-y-4 text-sm">
                      {item.sections.map((section) => (
                        <div key={section.label}>
                          <p className="text-xs uppercase tracking-[0.25em] opacity-80">{section.label}</p>
                          <div className="mt-2 flex flex-col gap-2">
                            {section.links.map((link) => (
                              <Link
                                key={link.href + link.label}
                                href={link.href}
                                aria-label={link.ariaLabel}
                                onClick={handleNavLinkClick}
                                className="group inline-flex items-center gap-3 rounded-xl px-2 py-2 font-semibold transition hover:opacity-75"
                              >
                                <span className="inline-flex items-center gap-2">
                                  <ArrowIcon />
                                  {link.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 flex flex-col gap-1 text-sm">
                      {item.links?.map((link) => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          aria-label={link.ariaLabel}
                          onClick={handleNavLinkClick}
                          className="group inline-flex items-center gap-3 rounded-xl px-2 py-1 font-semibold transition hover:opacity-75"
                        >
                          <span className="inline-flex items-center gap-2">
                            <ArrowIcon />
                            {link.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
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
