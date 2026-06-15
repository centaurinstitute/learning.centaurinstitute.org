import React, { Suspense } from "react";

const LazyVideoSearch = React.lazy(() => import("./VideoSearch"));

const VideoSearchLazy = (props: Record<string, unknown>) => (
  <Suspense fallback={null}>
    <LazyVideoSearch {...props} />
  </Suspense>
);

export default VideoSearchLazy;
