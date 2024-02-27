document.addEventListener("DOMContentLoaded", function () {
    function generateRandomFileName() {
        const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    document.getElementById("saveButton").addEventListener("click", function () {
        const codeInput = document.getElementById("codeInput");
        const codeContent = codeInput.value;

        if (codeContent.trim() !== "") {
            const fileName = generateRandomFileName();

            fetch('/scripts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify({ fileName, codeContent }), // Send both filename and code content
            })
            .then(response => response.text())
            .then(extractedFileName => {
                alert(`File created successfully. Filename: ${extractedFileName}`);
                // Redirect to the newly created page without the ".html" extension
                window.location.href = `/scripts/${extractedFileName}`;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error saving file.');
            });
        } else {
            alert("Please enter code before saving.");
        }
    });
});
