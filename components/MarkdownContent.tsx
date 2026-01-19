import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={className ?? ""}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-[#231f20]">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-[#231f20]">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-base text-[#231f20]/80">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc space-y-2 pl-5 text-base text-[#231f20]/80">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 pl-5 text-base text-[#231f20]/80">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href ?? "#"}
              className="font-semibold text-[#ba7e47] underline decoration-[#ba7e47]/40 underline-offset-4"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#ba7e47] pl-4 text-base text-[#231f20]/80">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#231f20]">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
