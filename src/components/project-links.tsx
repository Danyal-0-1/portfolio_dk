import type { ComponentType } from "react";

export type ProjectLinkMap = {
  github?: string;
  paper?: string;
  acceptance?: string;
  demo?: string;
  video?: string;
};

type ProjectLinksVariant = "detail" | "card";

type ProjectLinksProps = {
  links?: ProjectLinkMap;
  variant?: ProjectLinksVariant;
  className?: string;
};

type IconProps = {
  className?: string;
};

type IconComponent = ComponentType<IconProps>;

const linkDefinitions: Array<{
  key: keyof ProjectLinkMap;
  label: string;
  Icon: IconComponent;
}> = [
  { key: "github", label: "GitHub", Icon: GitHubIcon },
  { key: "paper", label: "Paper", Icon: FileTextIcon },
  { key: "acceptance", label: "Acceptance", Icon: BadgeCheckIcon },
  { key: "demo", label: "Demo", Icon: ExternalLinkIcon },
  { key: "video", label: "Video", Icon: PlayIcon },
];

const focusRingClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950";

export function ProjectLinks({
  links,
  variant = "detail",
  className,
}: ProjectLinksProps) {
  if (!links) {
    return null;
  }

  const visibleKeys =
    variant === "card" ? new Set<keyof ProjectLinkMap>(["github"]) : null;

  const entries = linkDefinitions.filter(({ key }) => {
    if (visibleKeys && !visibleKeys.has(key)) {
      return false;
    }
    return Boolean(links[key]);
  });

  if (entries.length === 0) {
    return null;
  }

  const containerClasses = [
    "flex items-center gap-2",
    variant === "detail" ? "flex-wrap" : "relative z-20",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const linkClasses =
    variant === "detail"
      ? [
          "inline-flex items-center gap-1 rounded-full border border-slate-200 no-underline",
          "bg-white/70 px-2.5 py-1 text-[0.65rem] font-medium text-slate-700",
          "transition hover:border-accent/70 hover:bg-accent/10 hover:text-slate-900",
          "dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200",
          "dark:hover:text-white",
          focusRingClasses,
        ].join(" ")
      : [
          "inline-flex items-center justify-center rounded-full border border-slate-200 no-underline",
          "bg-white/80 p-1.5 text-slate-600 transition",
          "hover:border-accent/70 hover:bg-accent/10 hover:text-slate-900",
          "dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300",
          "dark:hover:text-white",
          focusRingClasses,
        ].join(" ");

  return (
    <div className={containerClasses}>
      {entries.map(({ key, label, Icon }) => {
        const href = links[key];
        if (!href) {
          return null;
        }
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
            aria-label={variant === "card" ? label : undefined}
            title={label}
          >
            <Icon
              className={
                variant === "detail" ? "h-3.5 w-3.5" : "h-4 w-4"
              }
            />
            {variant === "detail" ? <span>{label}</span> : null}
            {variant === "card" ? (
              <span className="sr-only">{label}</span>
            ) : null}
          </a>
        );
      })}
    </div>
  );
}

function GitHubIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 0.6C5.73 0.6 0.6 5.83 0.6 12.28c0 5.2 3.34 9.61 7.97 11.17 0.58 0.11 0.79-0.26 0.79-0.57 0-0.28-0.01-1.02-0.02-2-3.24 0.72-3.92-1.6-3.92-1.6-0.53-1.38-1.29-1.75-1.29-1.75-1.05-0.74 0.08-0.73 0.08-0.73 1.16 0.09 1.77 1.23 1.77 1.23 1.04 1.82 2.73 1.29 3.4 0.99 0.11-0.77 0.41-1.29 0.74-1.59-2.59-0.3-5.32-1.32-5.32-5.87 0-1.3 0.45-2.36 1.18-3.2-0.12-0.3-0.51-1.52 0.11-3.16 0 0 0.97-0.32 3.18 1.22 0.92-0.27 1.91-0.4 2.9-0.41 0.98 0.01 1.97 0.14 2.9 0.41 2.21-1.54 3.17-1.22 3.17-1.22 0.62 1.64 0.23 2.86 0.11 3.16 0.74 0.84 1.18 1.9 1.18 3.2 0 4.56-2.74 5.56-5.35 5.86 0.42 0.37 0.8 1.11 0.8 2.25 0 1.62-0.02 2.93-0.02 3.33 0 0.32 0.21 0.69 0.8 0.57 4.62-1.57 7.96-5.98 7.96-11.17C23.4 5.83 18.27 0.6 12 0.6z" />
    </svg>
  );
}

function FileTextIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
}

function BadgeCheckIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3h7v7" />
      <path d="M10 14L21 3" />
      <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" />
    </svg>
  );
}

function PlayIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4z" />
    </svg>
  );
}
