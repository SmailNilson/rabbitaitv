'use client';

import { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { StyleRegistry, createStyleRegistry } from 'styled-jsx';

// Without this registry, App Router pages ship with none of the styled-jsx CSS:
// it only appears once JavaScript runs, so on a phone the menu first renders
// unstyled and the whole page jumps about 3 s later. Collecting the styles
// during server rendering puts them in the HTML.
export default function StyledJsxRegistry({ children }: { children: React.ReactNode }) {
    const [registry] = useState(() => createStyleRegistry());

    useServerInsertedHTML(() => {
        const styles = registry.styles();
        registry.flush();
        return <>{styles}</>;
    });

    return <StyleRegistry registry={registry}>{children}</StyleRegistry>;
}
