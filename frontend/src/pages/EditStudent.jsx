import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { useToast } from "../contexts/ToastContext";

export default function EditStudent() {
  const push = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const emailIsValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneIsValid = (phone) => /^\d{10}$/.test(phone);

  const loadStudent = async () => {
    try {
      const res = await api.get(`/students/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error(err);
      push("Error loading student", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudent();
  }, [id]);

  useEffect(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!emailIsValid(form.email)) e.email = "Invalid email";
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
    if (!canSubmit) return push("Fix errors first", "error");

    setSubmitting(true);
    try {
      await api.put(`/students/${id}`, form);
      push("Student updated", "success");
      navigate("/");
    } catch (err) {
      console.error(err);
      push("Update failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div className="card fade-in" style={{ width: "100%", maxWidth: 520 }}>
        <h2 className="text-lg font-medium mb-3">Edit Student</h2>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="hint">Name</label>
            <input
              className="form-input"
              name="name"
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
              value={form.course}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="hint">Phone</label>
            <input
              className="form-input"
              name="phone"
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
              {submitting ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
