export default function Privacy() {
  return (
    <div className="p-8 bg-gray-950 text-lime-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>Rohiverse</strong>, we are committed to protecting your
        privacy. This Privacy Policy outlines how we collect, use, share, and
        protect your personal information when you use our services or visit our
        website.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        1. Information We Collect
      </h2>
      <>
        <p className="mb-4">
          We collect information that you provide directly, such as when you
          create an account, place an order, or contact us. This may include:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Name, email address, phone number</li>
            <li>Shipping and billing address</li>
            <li>Payment details (handled via secure gateways)</li>
            <li>Login credentials (via Firebase authentication)</li>
          </ul>
        </p>
      </>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        2. How We Use Your Data
      </h2>
      <>
        <p className="mb-4">
          We use your data to:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Process and deliver orders</li>
            <li>Improve and personalize your experience</li>
            <li>Send order updates, offers, and newsletters (with opt-out)</li>
            <li>Prevent fraud and enhance security</li>
          </ul>
        </p>
      </>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        3. Cookies & Tracking
      </h2>
      <>
        <p className="mb-4">
          We use cookies to remember your preferences, keep you logged in, and
          analyze site traffic. You can control cookie preferences through your
          browser settings.
        </p>
      </>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        4. Sharing of Information
      </h2>
      <p className="mb-4">
        We do not sell your personal information. We may share it with trusted
        third parties like payment processors, shipping providers, or analytics
        services — only to the extent necessary for them to perform services on
        our behalf.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Data Security</h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your data
        from unauthorized access. However, no system is 100% secure. Please use
        strong passwords and keep your login credentials confidential.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Your Rights</h2>
      <>
        <p className="mb-4">
          You have the right to:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Access or correct your personal data</li>
            <li>Delete your account or request data removal</li>
            <li>Opt-out of marketing communications</li>
          </ul>
          To exercise any of these rights, please contact us below.
        </p>
      </>
      <h2 className="text-2xl font-semibold mt-6 mb-2">
        7. Children's Privacy
      </h2>
      <p className="mb-4">
        Our services are not directed to individuals under 13. We do not
        knowingly collect data from children. If we become aware of such data,
        we will delete it promptly.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        8. Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page, and continued use of our site means you accept the
        updated policy.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Contact Us</h2>
      <p className="mb-4">
        If you have questions about this policy or your data, feel free to reach
        out at:{" "}
        <a
          href="mailto:rohitjangir7100@gmail.com"
          className="text-lime-400 hover:underline">
          rohitjangir7100@gmail.com
        </a>
      </p>

      <p className="text-xs text-gray-500 mt-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
