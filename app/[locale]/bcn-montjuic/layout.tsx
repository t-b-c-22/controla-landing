export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Override the default navbar/footer from parent layout:
          We hide them via CSS and render our own minimal header */}
      <style>{`
        body > div > nav,
        body > div > footer,
        body > div > div[class*="WhatsApp"],
        body > div > button[class*="scroll"] {
          display: none !important;
        }
      `}</style>

      {/* Minimal proposal header — just the logo */}
      <nav className="fixed top-0 w-full bg-white/96 backdrop-blur-[12px] border-b border-gris z-50 px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-start h-[68px]">
          <img src="/logo.svg" alt="Controlá" className="h-[32px] w-auto" />
        </div>
      </nav>

      {children}
    </>
  );
}
