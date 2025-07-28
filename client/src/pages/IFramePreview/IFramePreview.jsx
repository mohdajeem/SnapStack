import { useEffect, useRef } from 'react';

const IframePreview = ({ jsxCode, cssCode }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const document = iframe.contentDocument || iframe.contentWindow.document;
    document.open();
    document.write(`
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${jsxToHtml(jsxCode)}
        </body>
      </html>
    `);
    document.close();
  }, [jsxCode, cssCode]);

  // Converts className and htmlFor to class and for
  const jsxToHtml = (jsx) => {
    return jsx
      .replace(/className=/g, 'class=')
      .replace(/htmlFor=/g, 'for=');
  };

  return (
    <iframe
      ref={iframeRef}
      title="Preview"
      style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}
    />
  );
};

export default IframePreview;
