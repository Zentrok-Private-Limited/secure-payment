"use client";

import { useState } from "react";

import {
  FiMail,
  FiUser,
  FiPhone,
  FiCreditCard,
  FiLock,
  FiMapPin,
} from "react-icons/fi";

export default function PaymentPage() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholdername, setCardholdername] = useState("");
  const [addressone, setAddressone] = useState("");
  const [addresstwo, setAddresstwo] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCardNumber = (value : string) => {
  return value
    .replace(/\s/g, "") 
    .replace(/\D/g, "") 
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ") 
    .trim();
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const formData = {
      amount,
      email,
      name,
      phone,
      cardNumber,
      expiry,
      cvv,
      cardholdername,
      addressone,
      addresstwo,
      city,
      zipCode,
      state,
      firstName,
      lastName,
    };

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);

        setAmount("");
        setEmail("");
        setName("");
        setPhone("");
        setCardNumber("");
        setExpiry("");
        setCvv("");
        setCardholdername("");
        setAddressone("");
        setAddresstwo("");
        setCity("");
        setZipCode("");
        setState("");
        setFirstName("");
        setLastName("");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] px-4 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* LEFT SIDE */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <p className="text-2xl font-semibold tracking-tight text-[#30313d] pb-8">
              Payment for IP Private Licence Key <br />
              (Dedicated Secured Server)
            </p>
            <div className="border border-gray-300 rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-center text-3xl font-light tracking-tight text-[#30313d]">
                <span className="mr-2">US$</span>

                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent outline-none border-none text-3xl font-light tracking-tight text-[#30313d] placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center">
          <div className="w-full max-w-107.5 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
            {/* CONTACT INFO */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#30313d] mb-3">
                Contact information
              </h2>

              <p className="text-sm text-[#30313d] mb-1">Contact details</p>

              <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
                {/* EMAIL */}
                <div className="flex items-center border-b border-gray-300 px-3 h-10">
                  <FiMail className="text-gray-500 mr-3 text-[18px]" />

                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none text-sm"
                  />
                </div>

                {/* NAME */}
                <div className="flex items-center border-b border-gray-300 px-3 h-10">
                  <FiUser className="text-gray-500 mr-3 text-sm" />

                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full outline-none text-sm"
                  />
                </div>

                {/* PHONE */}
                <div className="flex items-center px-3 h-10">
                  <FiPhone className="text-gray-500 mr-3 text-sm" />

                  <input
                    type="tel"
                    placeholder="(201) 555-0123"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="py-4 px-5">
              <h2 className="text-xl font-semibold text-[#30313d] mb-3">
                Payment method
              </h2>

              {/* CARD OPTION */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-5 rounded-full border-[6px] border-black"></div>

                <div className="flex items-center gap-2 text-sm font-medium text-[#30313d]">
                  <FiCreditCard />
                  Card
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <p className="text-sm text-[#30313d] mb-1">Card information</p>

                {/* CARD BOX */}
                <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
                  {/* CARD NUMBER */}
                  <div className="flex items-center justify-between border-b border-gray-300 px-3 h-10">
                    <div className="flex items-center flex-1">
                      <FiCreditCard className="text-gray-500 mr-3 text-[18px]" />

                      <input
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        maxLength={19}
                        className="w-full outline-none text-sm"
                      />
                    </div>

                    {/* CARD LOGOS */}
                    <div className="flex items-center gap-1 ml-3">
                      {/* VISA */}
                      <div className="bg-[#1434CB] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                        VISA
                      </div>

                      {/* MASTERCARD */}
                      <div className="relative w-8 h-4.5">
                        <div className="absolute left-0 top-0 w-4.5 h-4.5 bg-[#EB001B] rounded-full opacity-90"></div>

                        <div className="absolute right-0 top-0 w-4.5 h-4.5 bg-[#F79E1B] rounded-full opacity-90"></div>
                      </div>

                      {/* AMERICAN EXPRESS */}
                      <div className="bg-[#2E77BC] text-white text-[8px] font-bold px-1 py-1.5 rounded leading-none text-center">
                        AMEX
                      </div>
                    </div>
                  </div>

                  {/* DATE + CVV */}
                  <div className="grid grid-cols-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="h-10 border-r border-gray-300 px-4 outline-none text-sm"
                    />

                    <div className="flex items-center px-3">
                      <input
                        type="text"
                        placeholder="CVC"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full outline-none text-sm"
                      />

                      <FiLock className="text-gray-500" />
                    </div>
                  </div>
                </div>

                {/* CARD HOLDER */}
                <div className="mt-5">
                  <p className="text-[14px] text-[#30313d] mb-1">
                    Cardholder name
                  </p>

                  <div className="flex items-center border border-gray-300 rounded-md px-3 h-10">
                    <FiUser className="text-gray-500 mr-3 text-sm" />

                    <input
                      type="text"
                      placeholder="Full name on card"
                      value={cardholdername}
                      onChange={(e) => setCardholdername(e.target.value)}
                      className="w-full outline-none text-sm"
                    />
                  </div>
                </div>

                {/* BILLING ADDRESS */}
                <div className="mt-5">
                  <p className="text-[14px] text-[#30313d] mb-1">
                    Billing address
                  </p>

                  <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
                    {/* COUNTRY */}
                    <div className="flex items-center border-b border-gray-300 px-3 h-10">
                      <FiMapPin className="text-gray-500 mr-3 text-[18px]" />

                      <select className="w-full outline-none bg-white text-sm">
                        <option>United States</option>
                        <option>Canada</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      placeholder="Address line 1"
                      value={addressone}
                      onChange={(e) => setAddressone(e.target.value)}
                      className="w-full h-10 border-b border-gray-300 px-4 outline-none text-sm"
                    />

                    <input
                      type="text"
                      placeholder="Address line 2"
                      value={addresstwo}
                      onChange={(e) => setAddresstwo(e.target.value)}
                      className="w-full h-10 border-b border-gray-300 px-4 outline-none text-sm"
                    />

                    <div className="grid grid-cols-2">
                      <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="h-10 border-r border-b border-gray-300 px-4 outline-none text-sm"
                      />

                      <input
                        type="text"
                        placeholder="ZIP"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="h-10 border-b border-gray-300 px-4 outline-none text-sm"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full h-10 px-4 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* EXTRA FIELDS */}
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-10 border border-gray-300 rounded-md px-4 outline-none text-sm"
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-10 border border-gray-300 rounded-md px-4 outline-none text-sm"
                  />
                </div>

                {/* AMOUNT */}
                {/* <div className="mt-5">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md px-4 outline-none text-sm"
                  />
                </div> */}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full h-10 bg-[#635bff] text-white rounded-md mt-5 text-sm font-medium hover:bg-[#5248ff] transition"
                >
                  Submit
                </button>

                {/* LOADING */}
                {loading && (
                  <div className="mt-5">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#635bff] animate-pulse w-full"></div>
                    </div>

                    <p className="text-[13px] text-gray-500 mt-2">
                      Processing details...
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {success && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl text-green-600">✓</span>
            </div>

            <h2 className="text-[28px] font-semibold text-[#30313d] mb-3">
              Details Received Successfully
            </h2>

            <p className="text-gray-600 leading-7 text-[15px]">
              Billing department will reach out to you shortly for payment
              confirmation.
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="w-full mt-6 h-12 bg-[#635bff] text-white rounded-md hover:bg-[#5248ff]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
