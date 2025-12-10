const API_URL = 'http://localhost:4000/api';

document.addEventListener('DOMContentLoaded', () => {
  const fileList = document.getElementById('fileList');

  async function loadFiles() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        fileList.innerHTML = '<p>Please log in to see your files.</p>';
        return;
      }

      const res = await fetch(`${API_URL}/files`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await res.json();

      if (!res.ok) {
        fileList.innerHTML = `<p>Error: ${data.error || res.statusText}</p>`;
        return;
      }

      if (data.length === 0) {
        fileList.innerHTML = '<p>No files uploaded yet.</p>';
        return;
      }

      fileList.innerHTML = '';
      data.forEach(file => {
        const li = document.createElement('li');
        li.textContent = `${file.filename} (${Math.round(file.size / 1024)} KB) `;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', async () => {
          try {
            const res = await fetch(`${API_URL}/files/${file._id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await res.json();
            if (!res.ok) {
              alert(`Delete failed: ${result.error || res.statusText}`);
            } else {
              alert('File deleted successfully');
              loadFiles(); // refresh list
            }
          } catch (err) {
            console.error("Error deleting file:", err);
            alert("Something went wrong. Check console for details.");
          }
        });

        li.appendChild(deleteBtn);
        fileList.appendChild(li);
      });
    } catch (err) {
      console.error("Error loading files:", err);
      fileList.innerHTML = '<p>Something went wrong. Check console for details.</p>';
    }
  }

  loadFiles();
});