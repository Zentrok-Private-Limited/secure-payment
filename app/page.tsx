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
  const [country, setCountry] = useState("US");
  const [addressone, setAddressone] = useState("");
  const [addresstwo, setAddresstwo] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleZipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    setZipCode(value);

    try {
      if (country === "US") {
        const zip = value.replace(/\D/g, "");

        if (zip.length === 5) {
          const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
          const data = await res.json();

          if (data.places?.length > 0) {
            setCity(data.places[0]["place name"]);
            setState(data.places[0]["state"]);
          }
        }
      }

      if (country === "CA") {
        const postalCode = value.replace(/\s/g, "").toUpperCase();
        console.log("POSTAL:", postalCode);
        const regex = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;

        if (regex.test(postalCode)) {
          const res = await fetch(
            `https://geocoder.ca/?postal=${postalCode}&json=1`,
          );

          console.log("STATUS:", res.status);

          const data = await res.json();

          if (data.standard) {
            setCity(data.standard.city);
            setState(data.standard.prov);
          }
        }
      }
    } catch (error) {
      console.log("ZIP ERROR:", error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const newErrors: any = {};

      if (!amount.trim()) newErrors.amount = "Amount is required";
      if (!email.trim()) newErrors.email = "Email is required";
      if (!name.trim()) newErrors.name = "Name is required";
      if (!phone.trim()) newErrors.phone = "Phone is required";
      if (!cardNumber.trim()) newErrors.cardNumber = "Card number is required";
      if (!expiry.trim()) newErrors.expiry = "Expiry is required";
      if (!cvv.trim()) newErrors.cvv = "CVV is required";
      if (!cardholdername.trim())
        newErrors.cardholdername = "Cardholder name is required";
      if (!addressone.trim()) newErrors.addressone = "Address is required";
      if (!city.trim()) newErrors.city = "City is required";
      if (!zipCode.trim()) newErrors.zipCode = "ZIP Code is required";
      if (!state.trim()) newErrors.state = "State is required";
      if (!firstName.trim()) newErrors.firstName = "First name is required";
      if (!lastName.trim()) newErrors.lastName = "Last name is required";

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        setLoading(false);
        return;
      }

      const formData = {
        amount,
        email,
        name,
        phone,
        cardNumber,
        expiry,
        cvv,
        cardholdername,
        country,
        addressone,
        addresstwo,
        city,
        zipCode,
        state,
        firstName,
        lastName,
      };

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("STATUS:", response.status);

      // SAFE JSON PARSE
      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error("Invalid JSON response from server");
      }

      console.log("SERVER RESPONSE:", result);

      // HANDLE FAILED RESPONSES
      if (!response.ok) {
        throw new Error(
          result?.error ||
            result?.message ||
            `Request failed with status ${response.status}`,
        );
      }

      // SUCCESS
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
        setCountry("US");
        setAddressone("");
        setAddresstwo("");
        setCity("");
        setZipCode("");
        setState("");
        setFirstName("");
        setLastName("");
      }
    } catch (error: any) {
      console.error("PAYMENT ERROR:", error);

      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
                  onChange={(e) => {
                    setAmount(e.target.value);

                    setErrors((prev: any) => ({
                      ...prev,
                      amount: "",
                    }));
                  }}
                  className={`w-full bg-transparent outline-none border-none text-3xl font-light tracking-tight placeholder:text-gray-400 ${
                    errors.amount ? "text-red-500" : "text-[#30313d]"
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-2">{errors.amount}</p>
              )}
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
                    onChange={(e) => {
                      setEmail(e.target.value);

                      setErrors((prev: any) => ({
                        ...prev,
                        email: "",
                      }));
                    }}
                    className={`w-full outline-none text-sm ${
                      errors.email ? "text-red-500" : "text-[#30313d]"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-3">
                    {errors.email}
                  </p>
                )}

                {/* NAME */}
                <div className="flex items-center border-b border-gray-300 px-3 h-10">
                  <FiUser className="text-gray-500 mr-3 text-sm" />

                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);

                      setErrors((prev: any) => ({
                        ...prev,
                        name: "",
                      }));
                    }}
                    className={`w-full outline-none text-sm ${
                      errors.name ? "text-red-500" : "text-[#30313d]"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 ml-3">
                    {errors.name}
                  </p>
                )}

                {/* PHONE */}
                <div className="flex items-center px-3 h-10">
                  <FiPhone className="text-gray-500 mr-3 text-sm" />

                  <input
                    type="tel"
                    placeholder="(201) 555-0123"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);

                      setErrors((prev: any) => ({
                        ...prev,
                        name: "",
                      }));
                    }}
                    className={`w-full outline-none text-sm ${
                      errors.phone ? "text-red-500" : "text-[#30313d]"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 ml-2">
                    {errors.phone}
                  </p>
                )}
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
                {/* CARD LOGOS */}
                <div className="flex items-center justify-end gap-1 ml-3 mb-2">
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
                  {/* DISCOVER */}
                  <div className="bg-white border border-gray-300 text-[8px] font-bold px-1.5 py-1 rounded leading-none flex items-center">
                    <span className="text-black">DISC</span>

                    <div className="w-3 h-3 bg-[#FF6000] rounded-full ml-1"></div>
                  </div>
                </div>
                <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
                  {/* CARD NUMBER */}
                  <div className="border-b border-gray-300 px-3 py-2">
                    <div className="flex items-center">
                      <FiCreditCard className="text-gray-500 mr-3 text-[18px]" />

                      <input
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        value={cardNumber}
                        onChange={(e) => {
                          setCardNumber(e.target.value);

                          setErrors((prev: any) => ({
                            ...prev,
                            cardNumber: "",
                          }));
                        }}
                        className={`w-full outline-none text-sm placeholder:text-gray-400 ${
                          errors.cardNumber ? "text-red-500" : "text-[#30313d]"
                        }`}
                      />
                    </div>

                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs mt-1 ml-7">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  {/* EXPIRY + CVV */}
                  <div className="grid grid-cols-2">
                    {/* EXPIRY */}
                    <div className="border-r border-gray-300 px-3 py-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={expiry}
                        onChange={(e) => {
                          setExpiry(e.target.value);

                          setErrors((prev: any) => ({
                            ...prev,
                            expiry: "",
                          }));
                        }}
                        className={`w-full outline-none text-sm placeholder:text-gray-400 ${
                          errors.expiry ? "text-red-500" : "text-[#30313d]"
                        }`}
                      />

                      {errors.expiry && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.expiry}
                        </p>
                      )}
                    </div>

                    {/* CVV */}
                    <div className="px-3 py-2">
                      <div className="flex items-center">
                        <input
                          type="text"
                          placeholder="CVC"
                          value={cvv}
                          onChange={(e) => {
                            setCvv(e.target.value);

                            setErrors((prev: any) => ({
                              ...prev,
                              cvv: "",
                            }));
                          }}
                          className={`w-full outline-none text-sm placeholder:text-gray-400 ${
                            errors.cvv ? "text-red-500" : "text-[#30313d]"
                          }`}
                        />

                        <FiLock className="text-gray-500 ml-2" />
                      </div>

                      {errors.cvv && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* CARD HOLDER */}
                <div className="mt-5">
                  <p className="text-[14px] text-[#30313d] mb-1">
                    Cardholder name
                  </p>

                  <div className="border border-gray-300 rounded-md px-3 py-2 bg-white">
                    <div className="flex items-center">
                      <FiUser className="text-gray-500 mr-3 text-sm" />

                      <input
                        type="text"
                        placeholder="Full name on card"
                        value={cardholdername}
                        onChange={(e) => {
                          setCardholdername(e.target.value);

                          setErrors((prev: any) => ({
                            ...prev,
                            cardholdername: "",
                          }));
                        }}
                        className={`w-full outline-none text-sm placeholder:text-gray-400 ${
                          errors.cardholdername
                            ? "text-red-500"
                            : "text-[#30313d]"
                        }`}
                      />
                    </div>

                    {errors.cardholdername && (
                      <p className="text-red-500 text-xs mt-1 ml-6">
                        {errors.cardholdername}
                      </p>
                    )}
                  </div>
                </div>

                {/* BILLING ADDRESS */}
                <div className="mt-5">
                  <p className="text-[14px] text-[#30313d] mb-1">
                    Billing address
                  </p>

                  <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
                    {/* COUNTRY */}
                    <div className="border-b border-gray-300 px-3 py-2">
                      <div className="flex items-center">
                        <FiMapPin className="text-gray-500 mr-3 text-[18px]" />

                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full outline-none text-sm bg-white text-[#30313d]"
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                        </select>
                      </div>
                    </div>

                    {/* ADDRESS 1 */}
                    <div className="border-b border-gray-300 px-3 py-2">
                      <input
                        type="text"
                        placeholder="Address line 1"
                        value={addressone}
                        onChange={(e) => {
                          setAddressone(e.target.value);

                          setErrors((prev: any) => ({
                            ...prev,
                            addressone: "",
                          }));
                        }}
                        className={`w-full outline-none text-sm placeholder:text-gray-400 ${
                          errors.addressone ? "text-red-500" : "text-[#30313d]"
                        }`}
                      />

                      {errors.addressone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.addressone}
                        </p>
                      )}
                    </div>

                    {/* ADDRESS 2 */}
                    <div className="border-b border-gray-300 px-3 py-2">
                      <input
                        type="text"
                        placeholder="Address line 2 (optional)"
                        value={addresstwo}
                        onChange={(e) => setAddresstwo(e.target.value)}
                        className="w-full outline-none text-sm placeholder:text-gray-400 text-[#30313d]"
                      />
                    </div>

                    {/* CITY + ZIP */}
                    <div className="grid grid-cols-2 border-b border-gray-300">
                      {/* CITY */}
                      <div className="border-r border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          placeholder="City"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);

                            setErrors((prev: any) => ({
                              ...prev,
                              city: "",
                            }));
                          }}
                          className={`w-full outline-none text-sm placeholder:text-gray-400 ${
                            errors.city ? "text-red-500" : "text-[#30313d]"
                          }`}
                        />

                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      {/* ZIP */}
                      <div className="px-3 py-2">
                        <input
                          type="text"
                          placeholder={
                            country === "US" ? "ZIP Code" : "Postal Code"
                          }
                          value={zipCode}
                          onChange={(e) => {
                            handleZipChange(e);

                            setErrors((prev: any) => ({
                              ...prev,
                              zipCode: "",
                            }));
                          }}
                          maxLength={country === "US" ? 5 : 7}
                          className={`w-full outline-none text-sm placeholder:text-gray-400 ${
                            errors.zipCode ? "text-red-500" : "text-[#30313d]"
                          }`}
                        />

                        {errors.zipCode && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.zipCode}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* STATE */}
                    <div className="px-3 py-2">
                      <input
                        type="text"
                        placeholder={country === "US" ? "State" : "Province"}
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);

                          setErrors((prev: any) => ({
                            ...prev,
                            state: "",
                          }));
                        }}
                        className={`w-full outline-none text-sm placeholder:text-gray-400 ${
                          errors.state ? "text-red-500" : "text-[#30313d]"
                        }`}
                      />

                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

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
