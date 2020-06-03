let arr = [];
let arr_charges = [];
var size = 5;
var cellsInRow = 4;
let charges = 0;
let k = 9000000000

function getE(x, y) {
    let E = 0;
    let Ex = 0;
    let Ey = 0;
    for (let i = 0; i < charges; i++) {
        let local_arr = arr_charges[i];
        let dx = local_arr[0] - x;
        let dy = local_arr[1] - y;
        let dr = Math.sqrt(dx * dx + dy * dy);
        let q = local_arr[2];
        let sin = Math.abs(dy / dr);
        let cos = Math.abs(dx / dr);
        E = k * q / dr/dr;
        Ex += E * cos;
        Ey += E * sin;
    }
    E = Math.sqrt(Ex * Ex + Ey * Ey);
    return E;
}

function getPhi(x, y) {
    let phi = 0;
    let phix = 0;
    let phiy = 0;
    for (let i = 0; i < charges; i++) {
        let local_arr = arr_charges[i];
        let dx = local_arr[0] - x;
        let dy = local_arr[1] - y;
        let dr = Math.sqrt(dx * dx + dy * dy);
        let q = local_arr[2];
        let sin = Math.abs(dy / dr);
        let cos = Math.abs(dx / dr);
        phi = k * q / dr;
        phix += phi * cos;
        phiy += phi * sin;
    }
    phi = Math.sqrt(phix * phix + phiy * phiy);
    return phi;
}

function drawCharge() {

    var q = document.getElementById("Q").value;
    var x = document.getElementById("X").value;
    var y = document.getElementById("Y").value;
    array = [x, y, q];
    x = x * 20 + 20;
    y = (20 - y) * 20 + 20;
    let ctx = document.getElementById('graph').getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.closePath();
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "18px Times New Roman";
    ctx.fillText(q, x - 5, y + 5);
    arr_charges.push(array);
    charges++;
}

function draw(canv, r) {
    let ctx = document.getElementById(canv).getContext("2d");

    ctx.clearRect(0, 0, 640, 440);

    //прямоугольник
    ctx.beginPath();
    ctx.rect(20, 20, 600, 400);
    ctx.closePath();
    ctx.strokeStyle = "dodgerblue";
    ctx.fillStyle = "dodgerblue";
    ctx.fill();
    ctx.stroke();

    //ось ОУ
    ctx.beginPath();
    ctx.moveTo(20, 420);
    ctx.lineTo(20, 15);
    ctx.lineTo(25, 20);
    ctx.lineTo(15, 20);
    ctx.lineTo(20, 15);

    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
    //ось ОХ
    ctx.beginPath();
    ctx.moveTo(20, 420);
    ctx.lineTo(625, 420);
    ctx.lineTo(620, 415);
    ctx.lineTo(620, 425);
    ctx.lineTo(625, 420);
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
    // куча прямых параллельных ОХ
    for (let i = 0; i < 9; i++) {
        ctx.font = "18px Times New Roman";
        ctx.fillText(2 + 2 * i, 0, 380 - 40 * i + 5);
        ctx.beginPath();
        ctx.moveTo(20, 380 - 40 * i);
        ctx.lineTo(620, 380 - 40 * i);
        ctx.closePath();
        ctx.strokeStyle = "gray";
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();
    }
    // куча прямых параллельных ОY
    for (let i = 0; i < 14; i++) {
        ctx.font = "18px Times New Roman";
        ctx.fillText(2 * i + 2, 60 + 40 * i - 5, 440);
        ctx.beginPath();
        ctx.moveTo(60 + 40 * i, 20);
        ctx.lineTo(60 + i * 40, 420);
        ctx.closePath();
        ctx.strokeStyle = "gray";
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();
    }
    ctx.font = "18px Times New Roman";
    ctx.fillText(0, 0, 440);
}
function drawPoint(canv, x, y) {
    let ctx = document.getElementById(canv).getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.closePath();
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function interract() {
    let canvas = document.getElementById("graph");
    let event = window.event;
    let pos = getMousePos(canvas, event);
    let x = pos.x;
    let y = pos.y;
    drawPoint('graph', x, y);
    x = (x - 20) / 20;
    y = (20 - (y - 20) / 20) ;
    let E = getE(x, y);
    let phi = getPhi(x, y);
    small_arr = [x, y, E, phi];
    arr.push(small_arr);
    drawRow(x, y, E, phi);
}
function drawRow(x, y, E, phi) {
    // creates a <table> element
    var tbl = document.getElementById('tb1')

    // creating rows
    var row = document.createElement("tr");
    // create cells in row
    var cell = document.createElement("td");
    var cellText = document.createTextNode(x);
    cell.appendChild(cellText);
    row.appendChild(cell);
    var cell = document.createElement("td");
    var cellText = document.createTextNode(y);
    cell.appendChild(cellText);
    row.appendChild(cell);
    var cell = document.createElement("td");
    var cellText = document.createTextNode(E);
    cell.appendChild(cellText);
    row.appendChild(cell);
    var cell = document.createElement("td");
    var cellText = document.createTextNode(phi);
    cell.appendChild(cellText);
    row.appendChild(cell);
    tbl.appendChild(row); // add the row to the end of the table body
}