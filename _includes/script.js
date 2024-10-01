document.addEventListener('DOMContentLoaded', () => {
    const element_pdf_preview = document.querySelector('#pdfPreview')
    const element_pdf_input = document.querySelector('#pdfInput')
    console.log(element_pdf_preview)
    element_pdf_input.addEventListener('change', function(event) {
        const file = event.target.files[0];  
        if (file && file.type === 'application/pdf') {
            const fileURL = URL.createObjectURL(file);
            element_pdf_preview.src = fileURL;
            M.toast({html: 'Comprovante carregado!', classes: 'green not-print'});
            setTimeout(window.print, 5000);
        }
    })
})
