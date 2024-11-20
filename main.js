async function readletter(id) {
    let element = document.getElementById(id);
    fetch(`/letters/${id}.txt`)
    .then((response) => {
        response.text().then((text) => {
            text = text.replaceAll("\n", "<br>");
            element.innerHTML = text;
        }
    )});
}

function rotateletters() {
    let letters = document.getElementsByClassName('letter');
    var rotns = [];
    var dxs = [];
    var dys = [];
    for (let i = 0; i < letters.length; i++) {
        rotns.push(4*(Math.random()-0.5));
        dxs.push(2*(Math.random()-0.5));
        dys.push(2*(Math.random()-0.5));
    }
    var rotnavg = 0;
    var dxavg = 0;
    var dyavg = 0;
    for (let i = 0; i < letters.length; i++) {
        rotnavg += rotns[i];
        dxavg += dxs[i];
        dyavg += dys[i];
    }
    rotnavg /= letters.length;
    dxavg /= letters.length;
    dyavg /= letters.length;
    for (let i = 0; i < letters.length; i++) {
        const letter = letters.item(i);
        letter.style.transform = `rotate(${rotns[i]-rotnavg}deg) translate(${dxs[i]-dxavg}vw, ${dys[i]-dyavg}vh)`;
    }
}

function shift_letters_behind() {
    let letters = document.getElementsByClassName('letter');
    for (let i = 0; i < letters.length; i++) {
        const letter = letters.item(i);
        letter.style.zIndex++;
        if (letter.style.zIndex>letters.length) letter.style.zIndex = 1;
    }
}

function make_letters_shiftable() {
    let letters = document.getElementsByClassName('letter');
    for (let i = 0; i < letters.length; i++) {
        const letter = letters.item(i);
        letter.onclick = shift_letters_behind;
    }
}

function set_cont_comm_logos_height() {
    document.getElementById("cont_comm_logos").height = document.getElementById("cont_letters").height;
}

window.addEventListener("DOMContentLoaded", async () => {
    readletter("letter_sg_1");
    readletter("letter_sg_2");
    readletter("letter_dg");
    readletter("letter_fa");
    rotateletters();
    make_letters_shiftable();
    set_cont_comm_logos_height();
});