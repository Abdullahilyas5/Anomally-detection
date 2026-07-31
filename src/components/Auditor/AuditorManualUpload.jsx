import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaUpload } from 'react-icons/fa';
import { createProcurement } from '../../apis/modelapi';

const AuditorManualUpload = () => {
  const [formData, setFormData] = useState({
    country: '',
    tender_year: '',
    bidder_id: '',
    buyer_id: '',
    main_cpv_2: '',
    main_cpv_3: '',
    bid_price: '',
    lot_bidscount: '',
    singleb: 0,
    bid_isconsortium: 0,
    bid_issubcontracted: 0,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = [];

    if (!formData.country.trim()) validationErrors.push('Country is required.');
    if (!formData.tender_year || Number(formData.tender_year) <= 0) validationErrors.push('Tender year must be a positive number.');
    if (!formData.bidder_id.trim()) validationErrors.push('Bidder ID is required.');
    if (!formData.buyer_id.trim()) validationErrors.push('Buyer ID is required.');
    if (!formData.main_cpv_2.trim()) validationErrors.push('Main CPV Level 2 is required.');
    if (!formData.main_cpv_3.trim()) validationErrors.push('Main CPV Level 3 is required.');
    if (!formData.bid_price || Number(formData.bid_price) <= 0) validationErrors.push('Bid price must be greater than zero.');
    if (!formData.lot_bidscount || Number(formData.lot_bidscount) <= 0) validationErrors.push('Lot bid count must be greater than zero.');

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    try {
      setLoading(true);

      const payload = {
        country: formData.country,
        tender_year: Number(formData.tender_year),
        bidder_id: formData.bidder_id,
        buyer_id: formData.buyer_id,
        main_cpv_2: formData.main_cpv_2,
        main_cpv_3: formData.main_cpv_3,
        bid_price: Number(formData.bid_price),
        lot_bidscount: Number(formData.lot_bidscount),
        singleb: Number(formData.singleb),
        bid_isconsortium: Number(formData.bid_isconsortium),
        bid_issubcontracted: Number(formData.bid_issubcontracted),
      };

      const response = await createProcurement(payload);

      // Save only prediction data
      setResult(response.data.prediction);
      alert('Prediction completed successfully!');
    } catch (error) {
      console.error(error);
      alert('Prediction failed!');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition bg-white';

  const labelClass = 'text-sm font-medium text-gray-700 mb-1';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <FaFileAlt className="text-3xl text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Procurement Risk Prediction
          </h1>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-6"
        >
          {errors.length > 0 && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
           <p className="font-semibold mb-2">Please fix the following:</p>
           <ul className="list-disc list-inside space-y-1">
             {errors.map((error, index) => (
               <li key={index}>{error}</li>
             ))}
           </ul>
            </div>
          )}

          {/* SECTION 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className={labelClass}>Country</div>
              <input
                name="country"
                placeholder="e.g. ES"
                value={formData.country}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <div className={labelClass}>Tender Year</div>
              <input
                type="number"
                name="tender_year"
                value={formData.tender_year}
                placeholder="e.g. 2010"
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <div className={labelClass}>Bidder ID</div>
              <input
                name="bidder_id"
                value={formData.bidder_id}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <div className={labelClass}>Buyer ID</div>
              <input
                name="buyer_id"
                value={formData.buyer_id}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className={labelClass}>Main CPV Level 2</div>
              <input
                name="main_cpv_2"
                value={formData.main_cpv_2}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <div className={labelClass}>Main CPV Level 3</div>
              <input
                name="main_cpv_3"
                value={formData.main_cpv_3}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* SECTION 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className={labelClass}>Bid Price</div>
              <input
                type="number"
                name="bid_price"
                value={formData.bid_price}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <div className={labelClass}>Lot Bid Count</div>
              <input
                type="number"
                name="lot_bidscount"
                value={formData.lot_bidscount}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* FLAGS */}
          <div className="bg-gray-50 border rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-gray-800">
              Bid Characteristics
            </h3>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Single Bid</span>
              <select
                name="singleb"
                value={formData.singleb}
                onChange={handleChange}
                className="border rounded-md px-2 py-1"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Consortium</span>
              <select
                name="bid_isconsortium"
                value={formData.bid_isconsortium}
                onChange={handleChange}
                className="border rounded-md px-2 py-1"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Subcontracted</span>
              <select
                name="bid_issubcontracted"
                value={formData.bid_issubcontracted}
                onChange={handleChange}
                className="border rounded-md px-2 py-1"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition"
          >
            <FaUpload />
            {loading ? 'Processing...' : 'Run Risk Prediction'}
          </button>
        </form>

        {/* RESULT */}
        {result && (
          <div className="mt-6 bg-white shadow-md rounded-xl p-5 border-l-4 border-primary">
            <h2 className="text-lg font-semibold mb-3">
              Prediction Result
            </h2>

            <p>
              <span className="font-medium">Bidder:</span>{' '}
              {result.bidder_id}
            </p>

            <p>
              <span className="font-medium">Risk Score:</span>{' '}
              {(result.risk_score * 100).toFixed(2)}%
            </p>

            <p>
              <span className="font-medium">Risk Level:</span>{' '}
              <span
                className={`font-semibold ${
                  result.risk_level === 'High'
                    ? 'text-red-600'
                    : result.risk_level === 'Medium'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}
              >
                {result.risk_level}
              </span>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AuditorManualUpload;