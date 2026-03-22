import React, { useState } from "react";
import Button from "./Button";
import Input_Field from "./Input_Field";

/**
 * Add_Review_Modal Component
 *
 * @param {boolean} isOpen        - Controls visibility
 * @param {function} onClose      - Callback to close modal
 * @param {function} onSubmit     - Callback when review is submitted, receives { title, body }
 */
const Add_Review_Modal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allFieldsFilled = title.trim() !== "" && body.trim() !== "";

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await onSubmit({ title, body });
      // clear fields on success
      setTitle("");
      setBody("");
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setBody("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        z-50 bg-background rounded-2xl p-8 drop_shadow
        flex flex-col gap-5
        w-11/12 sm:w-96
      ">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-primary text-h3 font-bold">
            Add a Review
          </h2>
          <button
            onClick={handleClose}
            className="text-primary hover:text-pink-600 transition-colors duration-150 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Review Title */}
        <div className="flex flex-col gap-1">
          <label className="font-display text-sm text-primary font-medium">
            Review Title:
          </label>
          <Input_Field
            placeholder="Summarise your experience..."
            value={title}
            onChange={setTitle}
            type="text"
            className="!w-full placeholder-secondary_1 placeholder-opacity-75"
          />
        </div>

        {/* Review Body */}
        <div className="flex flex-col gap-1">
          <label className="font-display text-sm text-primary font-medium">
            Review:
          </label>
          <textarea
            placeholder="Tell us about your experience..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            className="
              w-full px-4 py-3 rounded-lg
              bg-background outline-none
              border-2 border-transparent
              focus:border-secondary_1
              text-sm text-secondary_1
              drop_shadow
              resize-none
              transition-all duration-150
              placeholder-secondary_1
              placeholder-opacity-75
            "
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-secondary_1 text-sm font-display">
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="outlined"
            onClick={handleClose}
            className="px-6 py-2 rounded-xl text-sm"
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            onClick={handleSubmit}
            disabled={!allFieldsFilled || loading}
            className="px-6 py-2 rounded-xl text-sm"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>

      </div>
    </>
  );
};

export default Add_Review_Modal;