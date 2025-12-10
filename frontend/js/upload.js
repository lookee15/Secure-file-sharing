const API_URL = 'http://localhost:4000/api';
const token = localStorage.getItem('token');

document.getElementById('uploadForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('file');
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  const res = await fetch(`${API_URL}/files/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });
  const data = await res.json();

  if (data.file) {
    alert('File uploaded successfully!');
    window.location.href = 'my-files.html';
  } else {
    alert(data.error || 'Upload failed');
  }
});