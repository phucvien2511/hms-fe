import { memo } from "react";

export const Page404 = memo(() => {
    return (
        <div>
            <h1>404 Not Found</h1>
        </div>
    );
});

// Display name for fast refresh using memo
Page404.displayName = "Page404";
