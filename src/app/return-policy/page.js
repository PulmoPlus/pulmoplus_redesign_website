import PageHero from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Return and Refund Policy",
  description:
    "PulmoPlus Dubai return and refund policy: how to request a return, which items can't be returned, and how refunds work.",
  path: "/return-policy",
});

export default function PolicyPage() {
  return (
    <>
      <PageHero crumbs={[["Return policy", "/return-policy"]]} title="Return and Refund Policy" />
      <section className="sec">
        <div className="wrap prose">
          <p>
            <strong>Last updated:</strong> November 11, 2025
          </p>

          <p>
            Thank you for shopping at <strong>PulmoPlus Dubai</strong>. We are dedicated to providing high-quality
            respiratory-related products and customer satisfaction. If for any reason you are not satisfied with your
            purchase, we are here to help.
          </p>

          <h2>Returns</h2>
          <p>
            We have a <strong>30-day return policy</strong>, which means you have 30 days after receiving your item to
            request a return.
          </p>
          <p>
            To be eligible for a return, your item must be in the same condition that you received it — unworn or
            unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
          </p>

          <p>
            To start a return, you can contact us at&nbsp;
            <a href="mailto:pulmoplus11@gmail.com">pulmoplus11@gmail.com</a>. Please note that returns will need to be
            sent to the following address:
          </p>

          <p>Port Saeed, Deira, Dubai, United Arab Emirates, Dubai, DU, 0000</p>

          <p>
            If your return is accepted, we&apos;ll send you a return shipping label and detailed instructions on how and
            where to send your package. Items sent back to us without first requesting a return will not be accepted.
          </p>

          <p>
            Please note that if your country of residence is not the United Arab Emirates, shipping your goods may take
            longer than expected.
          </p>

          <p>
            You can always contact us for any return questions at&nbsp;
            <a href="mailto:pulmoplus11@gmail.com">pulmoplus11@gmail.com</a>.
          </p>

          <h2>Damages and Issues</h2>
          <p>
            Please inspect your order upon receipt and contact us immediately if the item is defective, damaged, or if
            you receive the wrong item, so that we can evaluate the issue and make it right.
          </p>

          <h3>Non-Returnable Items</h3>
          <p>Certain types of items cannot be returned, such as:</p>
          <ul>
            <li>Perishable goods (such as food, flowers, or plants)</li>
            <li>Custom or personalized products (such as special orders)</li>
            <li>Personal care goods (such as beauty or hygiene products)</li>
            <li>Hazardous materials, flammable liquids, or gases</li>
          </ul>

          <p>Please contact us if you have questions or concerns about your specific item.</p>

          <p>
            Unfortunately, we cannot accept returns on <strong>sale items</strong> or&nbsp;
            <strong>gift cards</strong>.
          </p>

          <h2>Exchanges</h2>
          <p>
            The fastest way to ensure you get what you want is to return the item you have. Once the return is accepted,
            make a separate purchase for the new item.
          </p>

          <h2>European Union 3-Day Cooling-Off Period</h2>
          <p>
            If merchandise is being shipped into the European Union, you have the right to cancel or return your order
            within <strong>3 days</strong> for any reason and without justification.
          </p>
          <p>
            As above, your item must be in the same condition that you received it — unworn or unused, with tags, and in
            its original packaging. You&apos;ll also need the receipt or proof of purchase.
          </p>

          <h2>Refunds</h2>
          <p>
            We will notify you once we’ve received and inspected your return to let you know if the refund has been
            approved or not. If approved, you’ll be automatically refunded on your original payment method within{" "}
            <strong>10 business days</strong>.
          </p>

          <p>
            Please remember that it can take some time for your bank or credit card company to process and post the
            refund.
          </p>

          <p>
            If more than <strong>15 business days</strong> have passed since we approved your return, please contact us
            at&nbsp;
            <a href="mailto:pulmoplus11@gmail.com">pulmoplus11@gmail.com</a>.
          </p>

          <h2>Contact Us</h2>
          <p>If you have any questions about our Returns and Refunds Policy, please reach out to us:&nbsp;</p>
          <ul>
            <li>
              Email:&nbsp;
              <a href="mailto:pulmoplus11@gmail.com">pulmoplus11@gmail.com</a>
            </li>
            <li>
              Phone:&nbsp;
              <a href="tel:+971544479123">+971 54 447 9123</a>
            </li>
            <li>Address: Port Saeed, Deira, Dubai, United Arab Emirates</li>
          </ul>
        </div>
      </section>
    </>
  );
}
