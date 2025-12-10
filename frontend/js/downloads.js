const API_URL = 'http://localhost:4000/api';
const downloadsList = document.getElementById('downloadsList');

const loadDownloads = async () => {
  // For now, reuse the files endpoint (adjust later if you add public sharing)
  const res = await fetch(`${API_URL}/files`);
  const files = await res.json();

  downloadsList.innerHTML = '';
  files.forEach(file => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `${API_URL}/files/${file._id}`; // you can add a download route later
    link.textContent = file.filename;
    li.appendChild(link);
    downloadsList.appendChild(li);
  });
};

loadDownloads();