const Footer = () => {
  return (
    <footer className="bg-primary text-white px-6 md:px-12 py-12">
      <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto text-sm">

        <div>
          <h4 className="font-bold mb-4">ProcureGuard</h4>
          <p className="opacity-80">
            AI-powered anomaly detection system for public procurement.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Platform</h4>
          <ul className="space-y-2 opacity-80">
            <li>Analytics</li>
            <li>Audit</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Resources</h4>
          <ul className="space-y-2 opacity-80">
            <li>Docs</li>
            <li>Support</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 opacity-80">
            <li>Privacy</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 text-xs opacity-70">
        © 2026 ProcureGuard
      </div>
    </footer>
  );
};

export default Footer;