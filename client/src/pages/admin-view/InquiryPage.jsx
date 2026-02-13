import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InquiryPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("token"); // Admin token
        const response = await axios.get("http://localhost:5000/api/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setInquiries(response.data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        toast.error("Failed to fetch inquiries.");
        console.error("Error fetching inquiries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-[#0a373b]">Customer Inquiries</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <ClipLoader size={40} color="#0a373b" />
        </div>
      ) : (
        <>
          {/* Table View (Hidden below md) */}
          <div className="hidden md:block overflow-x-auto bg-white shadow-lg rounded-lg p-4 border border-gray-300">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-[#0a373b] text-white text-sm uppercase tracking-wider sticky top-0">
                <tr>
                  <th className="p-3 border border-gray-300 text-left">Name</th>
                  <th className="p-3 border border-gray-300 text-left">Contact</th>
                  <th className="p-3 border border-gray-300 text-left">Email</th>
                  <th className="p-3 border border-gray-300 text-left">Subject</th>
                  <th className="p-3 border border-gray-300 text-left">Message</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length > 0 ? (
                  inquiries.map((inquiry, index) => (
                    <tr
                      key={inquiry._id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200 transition-colors`}
                    >
                      <td className="p-3 border border-gray-300">{inquiry.name}</td>
                      <td className="p-3 border border-gray-300">{inquiry.contactn}</td>
                      <td className="p-3 border border-gray-300">{inquiry.email}</td>
                      <td className="p-3 border border-gray-300">{inquiry.subject}</td>
                      <td className="p-3 border border-gray-300">{inquiry.message}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-3 text-center text-gray-600">
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile View (Cards) - Hidden on md and larger */}
          <div className="block md:hidden mt-6">
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <div
                  key={inquiry._id}
                  className="bg-white shadow-md rounded-lg p-4 my-4 border border-gray-300 transition-transform hover:scale-[1.02]"
                >
                  <h3 className="text-lg font-semibold text-[#0a373b]">{inquiry.name}</h3>
                  <p className="text-sm text-gray-500">
                    {inquiry.email} | {inquiry.contactn}
                  </p>
                  <p className="text-gray-700 mt-2 font-medium">{inquiry.subject}</p>
                  <p className="text-gray-600 mt-1">{inquiry.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center mt-4">No inquiries found.</p>
            )}
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default InquiryPage;
