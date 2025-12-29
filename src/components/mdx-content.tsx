"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

type MDXContentProps = {
  code: string;
};

// Optionally define custom components for MDX (links, code, etc.)
const components = {
  // e.g. h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  //   <h1 className="text-2xl font-bold" {...props} />
  // ),
};

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
