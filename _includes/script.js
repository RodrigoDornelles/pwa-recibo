document.addEventListener('DOMContentLoaded', () => {
    const element_pdf_preview = document.querySelector('#output-pdf')
    const element_pdf_input = document.querySelector('#input-pdf')
    const elements_inputs = document.querySelectorAll('input[type="text"]');
    const formats = {
        brl: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }),
        date: new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        })
    }

    element_pdf_input.addEventListener('change', function(event) {
        const file = event.target.files[0];  

        Array.from(elements_inputs).filter(input => input.id).forEach(input => {
            console.log(input.id)
            document.querySelectorAll(`.${input.id}`.replace('input', 'output')).forEach(el_output => {
                const conversor = el_output.dataset.format? formats[el_output.dataset.format]: {format: (v) => v};
                el_output.textContent = conversor.format(input.value || undefined);
            });
        });

        if (file && file.type === 'application/pdf') {
            const fileURL = URL.createObjectURL(file);
            element_pdf_preview.src = fileURL;
            M.toast({html: 'Comprovante carregado!', classes: 'green not-print'});
            setTimeout(window.print, 4000);
        } else {
            M.toast({html: 'Você deve enviar um PDF!', classes: 'red not-print'});
        }
    })
})
