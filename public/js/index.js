document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.word-card');

    document.querySelector('#token').textContent = token

    var socket = io()

    socket.emit('begin', token)

    if (window.location.href.includes("admin") || window.location.href.includes("spy")) {
       for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', (evt) => {
                if (evt.target.getAttribute("color") === 'blue') {
                    evt.target.style.backgroundColor = "#1147B6";    
                } else if (evt.target.getAttribute("color") === 'red') {
                    evt.target.style.backgroundColor = "#F9543E";
                } else {
                    evt.target.style.backgroundColor = evt.target.getAttribute("color") !== 'null' ? evt.target.getAttribute("color") : "#FFDC25";
                }
                evt.target.style.color = "#FFEDED";
                
                if (!window.location.href.includes("spy")) {
                    socket.emit('update game', {
                        "token": token,
                        "id": i,
                        "color": evt.target.style.backgroundColor
                    })
                }
            })
        } 
    }
    

    socket.on('update tab', function (data) {
        cards[data.id].style.backgroundColor = data.color
        cards[data.id].style.color = "#FFEDED";
    })
   
});