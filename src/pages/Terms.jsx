export default function Terms() {
  return (
    <div className="p-8 bg-gray-950 text-lime-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to <strong>Rohiverse</strong>. By accessing or using our
        website, services, or purchasing products, you agree to be bound by the
        following terms and conditions. Please read them carefully.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Use of Website</h2>
      <p className="mb-4">
        You agree to use this website only for lawful purposes and in a manner
        that does not infringe the rights of others or restrict their use and
        enjoyment. Any unauthorized use of the site may result in termination of
        access.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        2. Account Responsibilities
      </h2>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your account
        and password. You agree to accept responsibility for all activities that
        occur under your account.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        3. Product Information
      </h2>
      <p className="mb-4">
        We strive to display product information accurately, including pricing,
        stock, and images. However, errors may occur and we reserve the right to
        correct any inaccuracies or cancel orders if needed.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Payments</h2>
      <p className="mb-4">
        All payments are processed securely. We use third-party payment gateways
        (e.g., Razorpay) and do not store your card or bank details. By placing
        an order, you agree to pay the total amount.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        5. Shipping & Delivery
      </h2>
      <p className="mb-4">
        Delivery timelines may vary based on location and availability. Delays
        caused by logistics or natural events are not our responsibility.
        Tracking details will be provided whenever possible.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Returns & Refunds</h2>
      <p className="mb-4">
        We accept returns for damaged or incorrect items within 7 days of
        delivery. Refunds will be initiated once the returned item is inspected.
        Shipping charges are non-refundable unless the error was ours.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        7. Warranties & Guarantees
      </h2>
      <p className="mb-4">
        Products may come with manufacturer warranties where applicable.
        Rohiverse does not offer separate warranties unless explicitly stated.
        Please retain proof of purchase for warranty claims.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. User Conduct</h2>
      <p className="mb-4">
        Users must not upload harmful or illegal content, attempt to breach
        security, or disrupt services. Any such action may lead to account
        suspension or legal action.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        9. Limitation of Liability
      </h2>
      <p className="mb-4">
        Rohiverse is not liable for any indirect or consequential damages
        arising out of your use of the site or products. Our liability is
        limited to the amount paid for the specific product or service.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        10. Intellectual Property
      </h2>
      <p className="mb-4">
        All content on this site including logos, graphics, and text is the
        property of Rohiverse and protected by copyright laws. You may not
        reproduce or reuse content without written permission.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">11. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms from time to time. Changes will be reflected
        on this page. Continued use of the site after changes implies
        acceptance.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">12. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these terms, please contact us at{" "}
        <a
          href="mailto:rohitjangir7100@gmail.com"
          className="text-lime-400 underline">
          rohitjangir7100@gmail.com
        </a>
      </p>

      <p className="text-xs text-gray-500 mt-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
