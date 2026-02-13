import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

const EmailForm = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/send-email', {
        subject,
        message,
      });

      if (response.status === 200) {
        toast.success('Emails sent successfully!');
      } else {
        toast.error('Failed to send emails.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Error sending emails.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Send Email</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <Button type="submit" className="mt-5 w-full bg-[#0a373b] hover:bg-[#085b60]" disabled={isLoading}>
          {isLoading ? <ClipLoader size={24} color="#fff" /> : 'Send Email'}
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmailForm;