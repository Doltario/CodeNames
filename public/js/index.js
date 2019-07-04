document.addEventListener('DOMContentLoaded', () => {

    var socket = io()

    const cards = document.querySelectorAll('.word-card');
    
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
            
            socket.emit('update game', {
                "id": i,
                "color": evt.target.style.backgroundColor
            })
        })
    }

    socket.on('update game', function (data) {
        cards[data.id].style.backgroundColor = data.color
        cards[data.id].style.color = "#FFEDED";
    })
   
});