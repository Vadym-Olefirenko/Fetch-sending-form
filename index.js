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


    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };


    function sendForm (form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('statusMessage');
            statusMessage.textContent = mess.loading;
            form.append(statusMessage);

            const formData = new FormData(form);

            // if we need JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('server.php', json)
            .then(data => {
                    console.log(data);
                    statusMessage.textContent = mess.success;
            })
            .catch(() => {
                statusMessage.textContent = mess.error;
                console.log(json)
            }).finally(() => {
                form.reset();
                setTimeout(()=> {
                    statusMessage.remove();
                }, 1500);
            })

            
        });
    };

    
});

