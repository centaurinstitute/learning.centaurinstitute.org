import React, { Suspense } from "react";

const LazyActionButtons = React.lazy(() => import("./ActionButtons"));

const ActionButtonsLazy = (props: Record<string, unknown>) => (
  <Suspense fallback={null}>
    <LazyActionButtons {...props} />
  </Suspense>
);

export default ActionButtonsLazy;
