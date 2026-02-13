import { useRef, useState, useEffect } from "react";
import React from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const logo = "https://res.cloudinary.com/doytxxdrl/image/upload/v1739795142/logo_xk1opa.jpg"

const InvoicePreview = () => {
    const invoiceRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, currentSelectedAddress, cartItems } = location.state || {};
    const orderId = location.state?.orderId; // Get orderId from the location state

    const invoiceDate = new Date().toLocaleDateString();
    const orderDate = new Date().toLocaleDateString();

    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
    });

    const downloadPDF = () => {
        html2canvas(invoiceRef.current, { scale: 2 })
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                pdf.addImage(imgData, "PNG", 10, 10, 190, (canvas.height * 190) / canvas.width);
                pdf.save("invoice.pdf");
            })
            .catch((error) => {
                console.error("PDF Generation Error:", error);
            });
    };

    const sendInvoiceByEmail = async () => {
        if (!user?.email || !invoiceRef.current) return;

        try {
            const response = await fetch("http://localhost:5000/api/send-invoice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userEmail: user.email,
                    invoiceHtml: invoiceRef.current.innerHTML,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("✅ Invoice sent successfully!", { autoClose: 3000 });
            } else {
                toast.error(`❌ Error: ${data.message}`, { autoClose: 3000 });
            }
        } catch (error) {
            toast.error("❌ Failed to send email. Try again!", { autoClose: 3000 });
        }
    };

    // Trigger sending email when the page loads OR when orderId changes (new order placed)
    useEffect(() => {
        const timer = setTimeout(() => {
            sendInvoiceByEmail();
        }, 1000); // Small delay to ensure invoiceRef content is available

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [orderId]);

    return (
        <div className="p-5 text-center font-sans">
            <ToastContainer />
            <div ref={invoiceRef} className="p-5 border border-gray-300 max-w-3xl mx-auto">
                <div className="flex justify-between items-center md:flex-row flex-col md:space-y-0 space-y-3">
                    <div className="text-left w-1/3 hidden md:block">
                        <h1 className="font-bold text-xl m-0">Kashvi Creations</h1>
                        <p className="text-sm m-0">Millenium Textile Market, Bhatena Rd, Bharat Transport Nagar, Udhna Udhyog Nagar, Bhatena, Surat, Gujarat 395002</p>
                    </div>
                    <div className="flex-1 text-center md:-mt-12 md:pr-16">
                        <p className="text-lg font-bold m-0">Tax Invoice</p>
                    </div>
                    <img src={logo} alt="Kashvi Creations" className="w-24 hidden md:block" />
                </div>

                {/* Invoice Details, Bill To & Ship To in Single Column on Mobile */}
                <div className="flex md:flex-row flex-col justify-between mt-5 text-sm space-y-4 md:space-y-0">
                    <div className="flex-1 text-left">
                        <p><strong>Order ID:</strong>{orderId} </p>
                        <p><strong>Order Date:</strong> {orderDate}</p>
                        <p><strong>Invoice Date:</strong> {invoiceDate}</p>
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-bold">Bill To</h3>
                        <p><strong>{user?.userName}</strong></p>
                        <p>{currentSelectedAddress?.address}</p>
                        <p>{currentSelectedAddress?.city}, {currentSelectedAddress?.state}, {currentSelectedAddress?.pincode}</p>
                        <p>Phone: {currentSelectedAddress?.phone}</p>
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-bold">Ship To</h3>
                        <p><strong>{currentSelectedAddress?.name}</strong></p>
                        <p>{currentSelectedAddress?.address}</p>
                        <p>{currentSelectedAddress?.city}, {currentSelectedAddress?.state}, {currentSelectedAddress?.pincode}</p>
                        <p>Phone: {currentSelectedAddress?.phone}</p>
                    </div>
                </div>

                <table className="w-full border-collapse mt-5">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2 w-1/6 text-left">Product ID</th>  {/* Smaller Width */}
                            <th className="border border-gray-300 p-2 w-3/5 text-left">Title</th>  {/* Larger Width */}
                            <th className="border border-gray-300 p-2 w-1/6 text-left">Qty</th>  {/* Smaller Width */}
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems?.items?.length > 0 ? (
                            cartItems.items.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 p-2 w-1/6">{item.productId}</td>
                                    <td className="border border-gray-300 p-2 w-3/5">{item.title}</td>
                                    <td className="border border-gray-300 p-2 w-1/6">{item.quantity}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center p-3">No items in cart</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>

            <div className="mt-5 flex flex-col items-center space-y-4 p-4 bg-white shadow-lg rounded-lg w-80 border border-gray-200 mx-auto">
                <div className="flex flex-wrap justify-center gap-4 sm:flex-col">
                    <button onClick={handlePrint} className="flex items-center justify-center bg-[#0a373b] hover:bg-[#085b60] text-white py-2 w-52 border-none cursor-pointer rounded-lg shadow-md transition duration-300">
                        <img src="/icons/print.svg" alt="Print Icon" className="w-5 h-5 mr-2" />
                        Print Invoice
                    </button>
                    <button onClick={downloadPDF} className="flex items-center justify-center bg-[#0a373b] hover:bg-[#085b60] text-white py-2 w-52 border-none cursor-pointer rounded-lg shadow-md transition duration-300">
                        <img src="/icons/download.svg" alt="Download Icon" className="w-5 h-5 mr-2" />
                        Download PDF
                    </button>
                    <button
                        onClick={() => navigate("/shop/home")}
                        className="flex items-center justify-center bg-[#0a373b] hover:bg-[#085b60] text-white py-2 w-52 border-none cursor-pointer rounded-lg shadow-md transition duration-300"
                    >
                        <img src="/icons/home.svg" alt="Home Icon" className="w-5 h-5 mr-2" />
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

const tableStyle = {
    border: "1px solid #000",
    padding: "8px",
    textAlign: "left",
};

const buttonStyle = {
    padding: "10px 20px",
    margin: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    cursor: "pointer",
};

export default InvoicePreview;