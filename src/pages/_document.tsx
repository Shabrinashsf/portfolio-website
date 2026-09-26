import { Html, Head, Main, NextScript } from "next/document";

const darkVars = `
  .dark {
    --bg-page: #131317;
    --bg-card: #1b1b1f;
    --bg-card-rgb: 27, 27, 31;
    --bg-card-hover: #1f1f23;
    --bg-nav: rgba(19, 19, 23, 0.85);
    --bg-inner: #131317;
    --text-primary: #FDF8F2;
    --text-secondary: #c4c5d9;
    --text-muted: #8e90a2;
    --border-color: #2a2a2e;
    --grid-color: rgba(253, 248, 242, 0.07);
    --accent: #1E56CD;
    --accent-light: #a8c7fa;
  }
`;

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#131317" />
        <link rel="icon" type="image/png" href="/img/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: darkVars }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = 'dark';
                    localStorage.setItem('theme', 'dark');
                  }
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                  document.documentElement.style.backgroundColor = theme === 'dark' ? '#131317' : '#FDF8F2';
                } catch (e) {}
              })();
            `,
          }}
        />
      </Head>
      <body className="antialiased min-h-screen flex flex-col relative">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
