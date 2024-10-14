document.getElementById('encryptButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const password = document.getElementById('password').value;

    // Check if file is selected and password is provided
    if (fileInput.files.length === 0 || password === '') {
        alert('Please select a file and enter a password.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const fileData = event.target.result;

        // Encrypt the file data using AES with the user-provided password
        const encryptedData = CryptoJS.AES.encrypt(fileData, password).toString();

        // Create a Blob with the encrypted data
        const blob = new Blob([encryptedData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Create a link to download the encrypted file
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name + '.encrypted'; // Append .encrypted to the original file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    reader.readAsText(file); // Read the file as text
});
