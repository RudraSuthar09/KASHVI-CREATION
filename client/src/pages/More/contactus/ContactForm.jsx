"use client"
import { useState } from "react"
import { X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Footer from '../../../components/common/Footer';
import Head from "../../../components/shopping-view/header";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Chatbot from "../../../components/chatbot/chatbot";
const ContactForm = ({ onClose }) => {
  const { toast } = useToast(); // ✅ Moved inside the component

  const [formData, setFormData] = useState({
    name: "",
    contactn: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // ✅ Parse JSON response
      const responseData = await response.json();  
  
      if (response.ok) {
        toast({
          title: "Success",
          description: responseData.message || "Thank you! You will be contacted shortly.",
          variant: "default",
        });
        console.log(responseData);
       
      } else {
        toast({
          title: "Error",
          description: responseData.message || "Failed to submit. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission Error:", error); // Log the actual error
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      <Head/>
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-6xl bg-white rounded-lg overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px] mx-4">
          {/* Left Section with Background Image */}
          <div
            className="w-full md:w-1/2 h-48 md:h-auto bg-gray-100 p-6 md:p-12 flex flex-col justify-center relative"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/1446161/pexels-photo-1446161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="space-y-4 text-white text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-semibold">Introducing Kashvi</h2>
              <p>Discover the elegance of traditional Indian wear with our exclusive collection of sarees.</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 bg-[#f8f4f0] p-6 md:p-12">
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-[#0a373b]">Contact us</h2>
              <p className="text-sm text-gray-800">Interested in our collection? Use the form below to get in touch.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full p-2 rounded border-none"
                  onChange={handleChange}
                />
                <input
                  type="tel"
                  name="contactn"
                  placeholder="Contact No"
                  pattern="[0-9]*"  // Allows only numbers
                  inputMode="numeric"  // Helps mobile users
                  maxLength="10"
                  required
                  className="w-full p-2 rounded border-none"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full p-2 rounded border-none"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="w-full p-2 rounded border-none"
                  onChange={handleChange}
                />
              </div>
              <textarea
                name="message"
                placeholder="Message"
                required
                rows="4"
                className="w-full p-2 rounded border-none resize-none"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full bg-[#0a373b] text-white py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
      <Chatbot/>
    <WhatsAppButton/>
      <Footer />
    </div>
  )
}

export default ContactForm
