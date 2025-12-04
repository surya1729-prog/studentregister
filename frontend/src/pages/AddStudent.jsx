import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useToast } from "../contexts/ToastContext";

export default function AddStudent() {
  const push = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const emailIsValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const phoneIsValid = (phone) => /^\d{10}$/.test(phone);

  useEffect(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!emailIsValid(form.email)) e.email = "Enter a valid email";
    if (form.phone && !phoneIsValid(form.phone))
      e.phone = "Phone must be 10 digits";
    setErrors(e);
  }, [form]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "phone") value = value.replace(/\D/g, "");
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const canSubmit =
    Object.keys(errors).length === 0 &&
    form.name.trim() &&
    emailIsValid(form.email);

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return push("Fix errors before saving", "error");

    setSubmitting(true);
    try {
      await api.post("/students", form);
      push("Student added successfully", "success");
      navigate("/");
    } catch (err) {
      console.error(err);
      push("Error adding student", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div className="card fade-in" style={{ width: "100%", maxWidth: 520 }}>
        <h2 className="text-lg font-medium mb-3">Add Student</h2>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="hint">Name</label>
            <input
              className="form-input"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div style={{ color: "#dc2626", marginTop: 6 }}>{errors.name}</div>
            )}
          </div>

          <div>
            <label className="hint">Email</label>
            <input
              className="form-input"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div style={{ color: "#dc2626", marginTop: 6 }}>{errors.email}</div>
            )}
          </div>

          <div>
            <label className="hint">Course</label>
            <input
              className="form-input"
              name="course"
              placeholder="CSE, ECE, etc."
              value={form.course}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="hint">Phone (10 digits)</label>
            <input
              className="form-input"
              name="phone"
              placeholder="9876543210"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <div style={{ color: "#dc2626", marginTop: 6 }}>{errors.phone}</div>
            )}
          </div>

          <div className="form-actions" style={{ marginTop: 10 }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={!canSubmit || submitting}
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
