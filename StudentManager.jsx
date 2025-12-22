import React, { useEffect, useState } from "react";
 import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [options, setOptions] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    option_code: "",
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    fathers_names: "",
    mothers_names: "",
    district: "",
  });
 

const BASE_URL = "http://localhost:9000/api";

// READ
 const getStudents = () => axios.get(`${BASE_URL}/students`);
const getOptions = () => axios.get(`${BASE_URL}/options`);

// CREATE
 const addStudent = () =>
  axios.post(`${BASE_URL}/students`, form);

// UPDATE
 const updateStudent = (id) =>
  axios.put(`${BASE_URL}/students/${id}`, form);

// DELETE
 const deleteStudent = (id) =>
  axios.delete(`${BASE_URL}/students/${id}`);

 

  useEffect(() => {
      const fetchStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };
    const fetchOptions = async () => {
    const res = await getOptions();
    setOptions(res.data);

 
  };   fetchStudents();
   fetchOptions();
   
  }, []);

 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateStudent(editId, form);
      setEditId(null);
    } else {
      await addStudent(form);
    }

    setForm({
      option_code: "",
      first_name: "",
      last_name: "",
      gender: "",
      dob: "",
      fathers_names: "",
      mothers_names: "",
      district: "",
    });

    setStudents(students.filter((st) => st.s_id !== form.s_id).concat([form]));
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditId(student.s_id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete?")) {
      await deleteStudent(id);
      setStudents(students.filter((st) => st.s_id !== form.s_id).concat([form]));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Students Management</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-white p-6 rounded shadow"
      >
        <select
          name="option_code"
          value={form.option_code}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Option</option>
          {options.map((op) => (
            <option key={op.option_code} value={op.option_code}>
              {op.option_code}-{op.option_name}
            </option>
          ))}
        </select>

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} className="border p-2 rounded" required/>
        <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="dob" value={form.dob} onChange={handleChange} className="border p-2 rounded" required/>
        <input name="fathers_names" placeholder="Father's Names" value={form.fathers_names} onChange={handleChange} className="border p-2 rounded" required/>
        <input name="mothers_names" placeholder="Mother's Names" value={form.mothers_names} onChange={handleChange} className="border p-2 rounded" required/>
        <input name="district" placeholder="District" value={form.district} onChange={handleChange} className="border p-2 rounded" required/>
        <div className="grid grid-cols-2 gap-4 rounded shadow">   
        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
          {editId ? "Update Student" : "Add Student"}
        </button>
         <button className=" bg-blue-600 text-white py-2 rounded hover:bg-red-500">
         Clear
        </button>
        </div>
 
      </form>

      {/* TABLE DISPLAYING ALL COLUMNS */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Option Code</th>
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Gender</th>
              <th className="p-2">DOB</th>
              <th className="p-2">Father</th>
              <th className="p-2">Mother</th>
              <th className="p-2">District</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((st) => (
              <tr key={st.s_id} className="border-t">
                <td className="p-2">{st.s_id}</td>
                <td className="p-2">{st.option_code}</td>
                <td className="p-2">{st.first_name}</td>
                <td className="p-2">{st.last_name}</td>
                <td className="p-2">{st.gender}</td>
                <td className="p-2">{st.dob}</td>
                <td className="p-2">{st.fathers_names}</td>
                <td className="p-2">{st.mothers_names}</td>
                <td className="p-2">{st.district}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(st)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(st.s_id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
