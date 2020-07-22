import '../scss/app.scss';


window.addEventListener('DOMContentLoaded', () => {
    
    const forms = document.querySelectorAll('form');

    forms.forEach(el => {
        sendForm(el);
    });

    const mess = {
        loading: "Loading...",
        success: "The Message was sended!",
        error: "Something is wrong :("
    }


    function sendForm (form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('statusMessage');
            statusMessage.textContent = mess.loading;
            form.append(statusMessage);

            const formData = new FormData(form);

            // if we need JSON
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
            .then(data => {
                    console.log(data);
                    statusMessage.textContent = mess.success;
            })
            .catch(() => {
                statusMessage.textContent = mess.error;
            }).finally(() => {
                form.reset();
                setTimeout(()=> {
                    statusMessage.remove();
                }, 1500);
            })

            
        });
    };

    
});

