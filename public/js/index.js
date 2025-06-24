document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
        const response = await fetch('/api/files', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Upload failed');
        alert('File uploaded successfully');
        e.target.reset();
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('getFiles').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/files');
        if (!response.ok) throw new Error('Failed to fetch files');
        const files = await response.json();

        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        files.forEach(file => {
            const li = document.createElement('li');
            li.textContent = `${file.name}: ${file.description}`;
            fileList.appendChild(li);
        });
    } catch (error) {
        alert(error.message);
    }
});