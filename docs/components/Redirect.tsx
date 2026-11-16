"use client";

import * as React from "react";

// Static-host redirect: the site is served from GitHub Pages, so Vocs's
// server-side `redirects` config never runs. Stub pages render this instead.
export default function Redirect({ to }: { to: string }) {
  React.useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return (
    <p>
      This page has moved to <a href={to}>{to}</a>.
    </p>
  );
}
