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
fetch('/public/scripts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName, codeContent }),
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
